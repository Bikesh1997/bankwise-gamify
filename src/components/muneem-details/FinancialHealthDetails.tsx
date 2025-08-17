"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Check,
  CreditCard,
  FileText,
  Loader2,
  TrendingUp,
  Activity,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  Download,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Zap,
  Star,
  TrendingDown,
  Shield,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

/**
 * IMPLEMENTS
 * 1) AI-powered dynamic analysis mock (cash flow, revenue, expenses, benchmarking)
 * 2) Predictive cash flow for 30/60/90 days with shortfall detection + suggestions
 * 3) Risk alerts (declining sales, expense spikes, low runway, etc.)
 * 4) Pre-approved offers (worded as "credit options" to avoid loan terminology)
 * 5) Stepper UX: large dots, connecting lines, checkmarks when completed; no labels
 * 6) No GST field (per user request)
 */

const docSteps = [
  { id: "cibil", icon: CreditCard },
  { id: "itr", icon: FileText },
  { id: "bankStatement", icon: Building },
] as const;

type DocStepId = (typeof docSteps)[number]["id"];

type Analysis = {
  kpis: {
    cashFlowStatus: "Healthy" | "Tight" | "Critical";
    revenueGrowthPct: number; // MoM
    expenseOptimizationNote: string;
    benchmarkPercentile: number; // 0-100
  };
  forecast: Array<{ day: number; date: string; projectedCash: number }>;
  threshold: number; // min comfortable cash
  shortfalls: Array<{ from: number; to: number; minCash: number }>; // day indices
  risks: Array<{ id: string; title: string; detail: string; severity: "low" | "medium" | "high" }>;
  offers: Array<{ id: string; name: string; limit: string; rate: string; type: string }>;
};

const mockRunAI = (seed = 1): Analysis => {
  // deterministic-ish simple generator
  const rand = (n: number) => {
    seed = (seed * 9301 + 49297) % 233280;
    return (seed / 233280) * n;
  };

  const today = new Date();
  const days = 90;
  const threshold = 200_000; // ₹2,00,000 comfortable minimum
  const base = 450_000 + rand(100_000); // starting cash

  const forecast: Analysis["forecast"] = Array.from({ length: days }, (_, i) => {
    // simulate seasonality + trend + noise
    const trend = i * 1_200; // slow build-up
    const season = Math.sin((i / 14) * Math.PI) * 40_000; // bi-weekly swings
    const noise = rand(30_000) - 15_000;
    const outflows = 380_000 + Math.max(0, Math.sin((i / 7) * Math.PI) * 25_000);
    const inflows = 400_000 + trend + season + noise;
    const projectedCash = Math.max(0, base + inflows - outflows - i * 5_000);
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    return {
      day: i + 1,
      date: d.toLocaleDateString("en-IN", { month: "short", day: "2-digit" }),
      projectedCash,
    };
  });

  // detect shortfall windows vs threshold
  const shortfalls: Analysis["shortfalls"] = [];
  let activeStart: number | null = null;
  let minCash = Infinity;

  forecast.forEach((p, idx) => {
    if (p.projectedCash < threshold) {
      if (activeStart === null) activeStart = idx;
      if (p.projectedCash < minCash) minCash = p.projectedCash;
    } else if (activeStart !== null) {
      shortfalls.push({ from: activeStart + 1, to: idx, minCash });
      activeStart = null;
      minCash = Infinity;
    }
  });
  if (activeStart !== null) {
    shortfalls.push({ from: activeStart + 1, to: forecast.length, minCash });
  }

  const shortfallCount = shortfalls.length;

  const analysis: Analysis = {
    kpis: {
      cashFlowStatus: shortfallCount === 0 ? "Healthy" : shortfallCount < 3 ? "Tight" : "Critical",
      revenueGrowthPct: Math.round(8 + rand(10)),
      expenseOptimizationNote: "Ops, logistics, and utilities show 6–9% savings potential.",
      benchmarkPercentile: Math.round(65 + rand(20)),
    },
    forecast,
    threshold,
    shortfalls,
    risks: [
      shortfallCount
        ? {
            id: "runway",
            title: "Low cash runway",
            detail: `Projected balance dips below ₹${(threshold / 1_000).toFixed(0)}k in ${shortfallCount} window(s).`,
            severity: shortfallCount > 2 ? "high" : "medium",
          }
        : {
            id: "stable",
            title: "Stable liquidity",
            detail: "No shortfalls detected in the next 90 days.",
            severity: "low",
          },
      {
        id: "sales",
        title: "Softening revenue trend",
        detail: "Trailing 4-week momentum is below the 12-week average.",
        severity: "medium",
      },
      {
        id: "expense",
        title: "Expense spikes detected",
        detail: "Utilities and logistics volatility above peer median.",
        severity: "low",
      },
    ],
    offers: [
      { id: "wc-flex", name: "Working Capital Facility (ABCL)", limit: "Up to ₹50L", rate: "from 8.5%", type: "working-capital" },
      { id: "pl-smart", name: "Proactive Personal Credit (ABCL)", limit: "Up to ₹20L", rate: "from 10.5%", type: "personal" },
      { id: "stul-easy", name: "Short-Term Utility Credit (ABCL)", limit: "Up to ₹15L", rate: "from 9.5%", type: "stul" },
    ],
  };
  return analysis;
};

const Stepper: React.FC<{ current: number }> = ({ current }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {docSteps.map((s, i) => (
        <React.Fragment key={s.id}>
          <div
            className={`flex items-center justify-center rounded-full w-12 h-12 text-white text-lg font-bold transition-all duration-300 shadow ${
              i < current ? "bg-green-500" : i === current ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Step ${i + 1}`}
          >
            {i < current ? <Check className="w-6 h-6" /> : i + 1}
          </div>
          {i < docSteps.length - 1 && (
            <div
              className={`w-16 sm:w-20 h-1 rounded-full transition-colors duration-300 ${
                i < current ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const EnhancedKPI: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  badge?: string;
  tone?: "default" | "good" | "warn" | "bad";
  trend?: string;
  description?: string;
}> = ({ title, value, icon, badge, tone = "default", trend, description }) => (
  <Card className="hover:shadow-xl transition-all duration-500 h-full border-2 border-muted/50 hover:border-primary/40 hover:scale-105 bg-gradient-to-br from-white to-primary/5">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</CardTitle>
        <div className={`p-3 rounded-xl ${
          tone === "good" 
            ? "bg-green-100 text-green-600" 
            : tone === "bad" 
            ? "bg-red-100 text-red-600" 
            : tone === "warn" 
            ? "bg-amber-100 text-amber-600" 
            : "bg-primary/10 text-primary"
        }`}>
          {icon}
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0 space-y-3">
      <div className="flex items-end justify-between">
        <div
          className={`text-3xl font-bold ${
            tone === "good"
              ? "text-green-600"
              : tone === "bad"
              ? "text-red-600"
              : tone === "warn"
              ? "text-amber-600"
              : "text-foreground"
          }`}
        >
          {value}
        </div>
        {badge && <Badge variant="secondary" className="text-xs font-semibold">{badge}</Badge>}
      </div>
      {trend && (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        </div>
      )}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </CardContent>
  </Card>
);

const currencyShort = (v: number) => `₹${(v / 1_000).toFixed(0)}k`;
const currencyFull = (v: number) => `₹${v.toLocaleString("en-IN")}`;

const ForecastChart: React.FC<{ data: Analysis["forecast"]; threshold: number }> = ({ data, threshold }) => (
  <div className="h-72 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" minTickGap={24} />
        <YAxis tickFormatter={(v) => currencyShort(Number(v))} />
        <Tooltip formatter={(v: number) => currencyFull(v)} />
        <ReferenceLine
          y={threshold}
          stroke="#94a3b8"
          strokeDasharray="6 4"
          label={{ value: "Comfort Threshold", position: "right" }}
        />
        <Line type="monotone" dataKey="projectedCash" stroke="#2563eb" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const RiskBadge: React.FC<{ severity: "low" | "medium" | "high" }> = ({ severity }) => {
  const map = {
    low: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-800",
  } as const;
  return <span className={`px-2 py-0.5 text-xs rounded ${map[severity]}`}>{severity.toUpperCase()}</span>;
};

const FinancialHealthDetails: React.FC = () => {
  const [step, setStep] = useState(1); // 1=software, 2=docs, 3=loading, 4=report
  const [docStep, setDocStep] = useState(0);
  const [selectedSoftware, setSelectedSoftware] = useState<string>("");
  const [checked, setChecked] = useState<Record<DocStepId, boolean>>({
    cibil: false,
    itr: false,
    bankStatement: false,
  });
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleSoftwareConnect = (software: string) => {
    setSelectedSoftware(software);
    setStep(2);
  };

  const handleCheckboxChange = (id: DocStepId, value: boolean) => {
    setChecked((p) => ({ ...p, [id]: value }));
  };

  const handleNextDocStep = () => {
    if (docStep < docSteps.length - 1) {
      setDocStep((p) => p + 1);
    } else {
      setStep(3);
    }
  };

  // Simulate AI run during loading
  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => {
        const res = mockRunAI(7);
        setAnalysis(res);
        setStep(4);
      }, 1600);
      return () => clearTimeout(t);
    }
  }, [step]);

  // ---- STEP 1: Connect to Accounting Software ----
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 p-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Connect to Accounting Software</h2>
          <p className="text-muted-foreground text-lg">Use Tally or Zoho Books to sync data</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-lg mx-auto">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center gap-4 p-8 h-32 hover:bg-primary/5 transition-all border-2 border-dashed hover:border-primary/50"
            onClick={() => handleSoftwareConnect("tally")}
          >
            <FileText className="w-8 h-8 text-primary" />
            <span className="font-semibold text-lg">Tally</span>
          </Button>

          <Button
            variant="outline" 
            className="flex flex-col items-center justify-center gap-4 p-8 h-32 hover:bg-primary/5 transition-all border-2 border-dashed hover:border-primary/50"
            onClick={() => handleSoftwareConnect("zoho")}
          >
            <Building className="w-8 h-8 text-primary" />
            <span className="font-semibold text-lg">Zoho Books</span>
          </Button>
        </div>

        <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Why connect?
            </CardTitle>
            <CardDescription className="text-base">Get dynamic cash flow forecasts, risk alerts, and tailored credit options.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> <span>Faster insights with real-time data</span></li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> <span>Automated risk monitoring</span></li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> <span>Personalized credit options</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- STEP 2: Document Stepper ----
  if (step === 2) {
    const current = docStep;
    const currentDoc = docSteps[docStep];

    return (
      <div className="max-w-2xl mx-auto space-y-8 p-4">
        <Stepper current={current} />

        <Card className="border-2 border-dashed border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-xl">
              <currentDoc.icon className="w-6 h-6 text-primary" /> 
              Provide {currentDoc.id.replace(/([A-Z])/g, " $1").toUpperCase()}
            </CardTitle>
            <CardDescription className="text-base">Tick once the document is connected or uploaded.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-muted/50 min-w-48">
              <Checkbox
                id={currentDoc.id}
                checked={checked[currentDoc.id]}
                onCheckedChange={(v) => handleCheckboxChange(currentDoc.id, Boolean(v))}
                className="w-5 h-5"
              />
              <Label htmlFor={currentDoc.id} className="flex items-center gap-2 cursor-pointer text-base font-medium">
                <ShieldCheck className="w-5 h-5 text-primary" /> Confirmed
              </Label>
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full h-12 text-base font-semibold"
          disabled={!checked[currentDoc.id]}
          onClick={handleNextDocStep}
        >
          {docStep < docSteps.length - 1 ? (
            <span className="flex items-center gap-2">
              Next <ArrowRight className="w-5 h-5" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Run AI Assessment <Activity className="w-5 h-5" />
            </span>
          )}
        </Button>
      </div>
    );
  }

  // ---- STEP 3: Loading + Promo ----
  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-8 text-center p-4">
        <div className="flex items-center gap-4">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
          <p className="text-xl font-semibold">Analyzing your financial data…</p>
        </div>

        <Card className="w-full max-w-lg border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Smart Business Perks</CardTitle>
            <CardDescription className="text-base">Insights & flexible credit options tailored to you</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <p className="text-base">Unlock proactive facilities aligned to upcoming cash needs.</p>
            <div className="bg-primary/10 p-4 rounded-lg text-center border border-primary/20">
              <p className="font-bold text-primary text-lg">ABCL Advantage</p>
              <p className="text-muted-foreground">Preferential rates • Quick onboarding</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- STEP 4: AI-Powered Dashboard ----
  const tone =
    analysis?.kpis.cashFlowStatus === "Healthy"
      ? "good"
      : analysis?.kpis.cashFlowStatus === "Tight"
      ? "warn"
      : "bad";

  return (
    <div className="space-y-10 p-4 bg-gradient-to-br from-background via-background to-primary/5 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-4xl mx-auto pt-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <div className="p-2 bg-gradient-to-r from-primary to-primary/70 rounded-full">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          AI-Powered Financial Health & Risk Assessment
        </h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Advanced insights powered by {selectedSoftware ? selectedSoftware.toUpperCase() : "your financial data"} • Real-time analysis • Predictive modeling
        </p>
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Data
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-amber-500" />
            AI Powered
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-blue-500" />
            Secure
          </div>
        </div>
      </div>

      {/* Enhanced KPI Dashboard */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Financial Health Score</h3>
          <div className="flex items-center justify-center gap-4">
            <div className="text-4xl font-bold text-primary">
              {analysis ? Math.round((analysis.kpis.benchmarkPercentile + (analysis.kpis.revenueGrowthPct * 2) + (analysis.kpis.cashFlowStatus === 'Healthy' ? 30 : analysis.kpis.cashFlowStatus === 'Tight' ? 15 : 5)) / 3) : 75}
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Out of 100</div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
  <EnhancedKPI
    title="Cash Flow Status"
    value={analysis ? analysis.kpis.cashFlowStatus : "—"}
    icon={<TrendingUp className="w-6 h-6" />}
    tone={tone as any}
    badge="AI Rated"
    trend={
      analysis?.kpis.cashFlowStatus === "Healthy"
        ? "+12%"
        : analysis?.kpis.cashFlowStatus === "Tight"
        ? "-3%"
        : "-8%"
    }
    description="Based on 90-day forecast"
  />
  <EnhancedKPI
    title="Revenue Growth"
    value={`${analysis ? analysis.kpis.revenueGrowthPct : 0}%`}
    icon={<DollarSign className="w-6 h-6" />}
    tone={
      analysis && analysis.kpis.revenueGrowthPct >= 10
        ? "good"
        : "default"
    }
    badge="MoM"
    trend={
      analysis && analysis.kpis.revenueGrowthPct >= 10
        ? "+2.3%"
        : "-1.1%"
    }
    description="Month over month growth"
  />
  <EnhancedKPI
    title="Expense Efficiency"
    value="6-9%"
    icon={<Target className="w-6 h-6" />}
    tone="good"
    badge="Savings Potential"
    trend="+15%"
    description="Optimization opportunities"
  />
  <EnhancedKPI
    title="Industry Rank"
    value={`${analysis ? analysis.kpis.benchmarkPercentile : 0}th`}
    icon={<Award className="w-6 h-6" />}
    tone="good"
    badge="Percentile"
    trend="+5"
    description="Peer comparison"
  />
</div>

      </div>

      {/* Enhanced Forecast Section */}
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="hover:shadow-xl transition-all duration-500 border-2 border-muted/50 hover:border-primary/30 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <PieChart className="w-6 h-6 text-blue-600" />
                  </div>
                  Predictive Cash Flow Analysis
                </CardTitle>
                <CardDescription className="text-base">
                  AI-powered 90-day cash flow forecast with risk assessment and optimization recommendations
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  90 Days
                </Badge>
                <Badge variant="secondary">Live Data</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {analysis && (
              <>
                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">₹{((analysis.forecast[29]?.projectedCash || 0) / 1000).toFixed(0)}k</div>
                    <div className="text-sm text-green-700">30-day outlook</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">₹{((analysis.forecast[59]?.projectedCash || 0) / 1000).toFixed(0)}k</div>
                    <div className="text-sm text-blue-700">60-day outlook</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">₹{((analysis.forecast[89]?.projectedCash || 0) / 1000).toFixed(0)}k</div>
                    <div className="text-sm text-purple-700">90-day outlook</div>
                  </div>
                </div>
                
                <ForecastChart data={analysis.forecast} threshold={analysis.threshold} />
                
                {analysis.shortfalls.length > 0 ? (
                  <div className="space-y-4 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-amber-800">Cash Flow Alerts</div>
                        <div className="text-sm text-amber-700">Proactive insights to maintain healthy liquidity</div>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {analysis.shortfalls.map((w, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-white/70 rounded-lg border border-amber-200">
                          <div className="w-3 h-3 bg-amber-500 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="space-y-1">
                            <div className="font-medium text-amber-800">Days {w.from}–{w.to} Shortfall</div>
                            <div className="text-sm text-amber-700">Minimum balance: {currencyFull(w.minCash)}</div>
                            <div className="text-sm text-muted-foreground">💡 Consider ABCL working capital facility for smooth operations</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-800">Excellent Cash Position</div>
                      <div className="text-green-700">No shortfalls predicted. Your liquidity management is on track.</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Risk Management Dashboard */}
      <div className="max-w-7xl mx-auto">
        <Card className="hover:shadow-xl transition-all duration-500 border-2 border-muted/50 hover:border-red-200 bg-gradient-to-br from-white to-red-50/20">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-red-600" />
                  </div>
                  Risk Management Center
                </CardTitle>
                <CardDescription className="text-base">AI-powered risk detection and mitigation strategies</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{analysis?.risks.length || 0}</div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              {analysis?.risks.map((r, index) => (
                <div
                  key={r.id}
                  className={`relative rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                    r.severity === 'high' 
                      ? 'border-red-200 bg-gradient-to-r from-red-50 to-pink-50 hover:border-red-300' 
                      : r.severity === 'medium'
                      ? 'border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 hover:border-amber-300'
                      : 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      r.severity === 'high' ? 'bg-red-100' : r.severity === 'medium' ? 'bg-amber-100' : 'bg-green-100'
                    }`}>
                      {r.severity === 'high' ? (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      ) : r.severity === 'medium' ? (
                        <Activity className="w-6 h-6 text-amber-600" />
                      ) : (
                        <Check className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-lg flex items-center gap-3">
                            {r.title}
                            <RiskBadge severity={r.severity} />
                          </div>
                          <p className="text-muted-foreground mt-1">{r.detail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Details
                        </Button>
                        <Button variant="default" size="sm" className="text-xs">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="text-xs">
                      Alert #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Credit Solutions */}
      <div className="max-w-7xl mx-auto">
        <Card className="border-2 border-primary/30 hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-primary/10 via-primary/5 to-blue-50/30">
          <CardHeader className="pb-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="p-3 bg-primary/20 rounded-full">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <div className="p-2 bg-gradient-to-r from-primary to-blue-600 rounded-full">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Exclusive Pre-approved Offers
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-2">
                  Premium credit solutions tailored to your financial profile • Instant approval • Competitive rates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {analysis?.offers.map((o, index) => (
                <Card
                  key={o.id}
                  className="border-2 border-muted/50 hover:shadow-xl transition-all duration-500 hover:border-primary/50 bg-white hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary to-transparent opacity-20"></div>
                  <CardHeader className="pb-4 relative">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs font-semibold">
                        #{index + 1} Popular
                      </Badge>
                      <div className={`p-2 rounded-lg ${
                        o.type === 'working-capital' ? 'bg-blue-100' : 
                        o.type === 'personal' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {o.type === 'working-capital' ? <Building className="w-5 h-5 text-blue-600" /> : 
                         o.type === 'personal' ? <DollarSign className="w-5 h-5 text-green-600" /> : 
                         <Zap className="w-5 h-5 text-purple-600" />}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{o.name}</CardTitle>
                    <CardDescription className="capitalize text-base font-medium">
                      {o.type.replace(/-/g, " ")} Solution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm font-medium text-muted-foreground">Credit Limit</span>
                        <span className="font-bold text-lg text-primary">{o.limit}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm font-medium text-muted-foreground">Interest Rate</span>
                        <Badge variant="secondary" className="text-sm font-bold">{o.rate}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-sm font-medium text-green-700">Status</span>
                        <Badge className="bg-green-100 text-green-800 border-green-300">Pre-approved</Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" variant="default">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="w-full h-10 text-sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl border-2 border-primary/20">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg">ABCL Advantage Program</span>
                </div>
                <p className="text-muted-foreground">
                  Exclusive benefits: Preferential rates • Priority processing • Dedicated relationship manager
                </p>
                <div className="flex items-center justify-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>0% processing fee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>24/7 support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Flexible terms</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export & Actions */}
      <div className="max-w-7xl mx-auto">
        <Card className="border-2 border-muted/50 bg-gradient-to-r from-muted/20 to-primary/10">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left space-y-2">
                <h3 className="text-xl font-bold">Complete Financial Health Report</h3>
                <p className="text-muted-foreground">
                  Download comprehensive analysis with actionable insights and recommendations
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-3 px-6 py-3 h-12 text-base font-semibold border-2 hover:bg-muted hover:border-primary/50 transition-all duration-300"
                >
                  <FileText className="w-5 h-5" />
                  View Summary
                </Button>
                <Button 
                  className="flex items-center gap-3 px-8 py-3 h-12 text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Export Full Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer Stats */}
      <div className="max-w-7xl mx-auto pt-8 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">90+</div>
            <div className="text-xs text-muted-foreground">Data Points Analyzed</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-xs text-muted-foreground">Real-time Monitoring</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-purple-600">AI</div>
            <div className="text-xs text-muted-foreground">Powered Insights</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthDetails;

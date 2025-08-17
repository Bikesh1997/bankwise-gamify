import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GrowthAdvisorDetails from '@/components/muneem-details/GrowthAdvisorDetails';
import FinancialHealthDetails from '@/components/muneem-details/FinancialHealthDetails';
import SmartComplianceDetails from '@/components/muneem-details/SmartComplianceDetails';
import VendorOptimizationDetails from '@/components/muneem-details/VendorOptimizationDetails';
import BusinessPlanningDetails from '@/components/muneem-details/BusinessPlanningDetails';
import RemindersDetails from '@/components/muneem-details/RemindersDetails';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MuneemjiChatbotProps {
  onNavigate?: (section: string) => void;
}

const MuneemjiChatbot: React.FC<MuneemjiChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatOptions = [
    { id: 'growth-advisor', label: 'Growth Advisor', icon: '📈' },
    { id: 'financial-health', label: 'Financial Health', icon: '💰' },
    { id: 'smart-compliance', label: 'Smart Compliance', icon: '📊' },
    { id: 'vendor-optimization', label: 'Vendor Optimization', icon: '🚚' },
    { id: 'business-planning', label: 'Business Planning', icon: '📋' },
    { id: 'reminders', label: 'Reminders', icon: '🔔' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: '1',
          text: "Namaste! Main hoon Muneem Ji – aapke business ka digital saathi. Bataiye, aaj main aapki kaise madad kar sakta hoon?",
          isBot: true,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen]);

  const getMuneemjiImage = () => {
    return '/lovable-uploads/c7ef736c-7271-43d1-9fdf-7106dc697ab2.png';
  };

  const handleOptionClick = (option: typeof chatOptions[0]) => {
    // Directly open popup without chat response
    setSelectedOption(option.id);
    setShowPopup(true);
    
    if (onNavigate) onNavigate(option.id);
  };

  const getBotResponse = (optionId: string): string => {
    const responses: Record<string, string> = {
      'growth-advisor': "Business growth advisor ready hai! Detailed recommendations popup mein dekh sakte hain.",
      'financial-health': "Financial health analysis ready hai! Comprehensive insights popup mein available hain.",
      'smart-compliance': "Smart compliance dashboard ready hai! All compliance details popup mein dekhen.",
      'vendor-optimization': "Vendor optimization insights ready hain! Supply chain analysis popup mein available hai.",
      'business-planning': "Business planning assistant ready hai! Interactive planning tools popup mein dekhen.",
      'reminders': "Smart reminders dashboard ready hai! All reminder settings popup mein dekh sakte hain."
    };
    return responses[optionId] || "Main aapki madad karne ke liye yahan hoon!";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Samjha! Is query ke liye main aapko relevant section mein direct kar sakta hoon. Ya fir aap specific options mein se choose kar sakte hain.",
        isBot: true,
        timestamp: new Date()
      }]);
      setShowOptions(true);
    }, 1000);
  };

  const resetChat = () => {
    setMessages([]);
    setShowOptions(true);
    setIsTyping(false);
  };

  const renderDetailComponent = (optionId: string) => {
    switch (optionId) {
      case 'growth-advisor':
        return <GrowthAdvisorDetails />;
      case 'financial-health':
        return <FinancialHealthDetails />;
      case 'smart-compliance':
        return <SmartComplianceDetails />;
      case 'vendor-optimization':
        return <VendorOptimizationDetails />;
      case 'business-planning':
        return <BusinessPlanningDetails />;
      case 'reminders':
        return <RemindersDetails />;
      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <>
      {/* Floating Launcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Open Muneem Ji Chat"
          className="
            muneemji-launcher relative
            h-32 w-32
            rounded-full bg-white shadow-xl transition-all duration-300
            border-4 border-white
            hover:shadow-2xl
          "
          style={{ backgroundColor: 'transparent' }}
        >
          <div
            className={`
              pointer-events-none select-none
              flex items-center justify-center
              h-full w-full
              animate-muneemji-bob
              ${hovered ? "scale-[1.05]" : "scale-100"}
              transition-transform duration-300
            `}
          >
            <img
              src={getMuneemjiImage()}
              alt="Muneem Ji"
              width={128}
              height={128}
              loading="eager"
              decoding="async"
              className="
                muneemji-avatar
                h-28 w-28
                object-contain
                animate-muneemji-wave
              "
            />
          </div>
          <div className="absolute -top-2.5 -right-2.5 h-7 w-7 bg-green-500 rounded-full border-2 border-white" />
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:inset-auto lg:bottom-6 lg:right-6 lg:h-[600px] lg:w-[430px]">
          <div className="h-full bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl border border-border flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <img 
                  src={getMuneemjiImage()}
                  alt="Muneem Ji"
                  className="h-10 w-10 object-contain bg-white/20 rounded-full p-1"
                />
                <div>
                  <h3 className="font-semibold text-lg">Muneem Ji</h3>
                  <p className="text-xs opacity-90">Digital Business Saathi</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => {
                  setIsOpen(false);
                  // Reset chat when closed
                  setTimeout(() => {
                    setMessages([]);
                    setShowOptions(true);
                    setIsTyping(false);
                    setSelectedOption(null);
                  }, 300);
                }} className="text-white hover:bg-white/20 h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  style={{ animation: 'mj-bubble 0.3s ease-out', animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl ${message.isBot ? 'bg-muted text-foreground rounded-bl-md' : 'bg-primary text-white rounded-br-md'}`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md flex gap-1">
                    <div className="mj-typing-dot w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <div className="mj-typing-dot w-2 h-2 bg-muted-foreground rounded-full" style={{ animationDelay: '120ms' }}></div>
                    <div className="mj-typing-dot w-2 h-2 bg-muted-foreground rounded-full" style={{ animationDelay: '240ms' }}></div>
                  </div>
                </div>
              )}

              {showOptions && !isTyping && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">Namaste! Choose an option:</p>
                  <div className="grid grid-cols-2 gap-3">
  {chatOptions.map((option, index) => (
    <Button
      key={option.id}
      variant="outline"
      size="sm"
      onClick={() => handleOptionClick(option)}
      className="justify-start gap-3 p-3 h-auto text-left border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200 w-full"
      style={{
        animation: 'mj-pop 0.3s ease-out',
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both',
      }}
    >
      <span className="text-lg">{option.icon}</span>
      <span className="text-sm font-medium">{option.label}</span>
    </Button>
  ))}
</div>

                  <Button variant="ghost" size="sm" onClick={resetChat} className="w-full text-muted-foreground hover:text-foreground">
                    Reset Chat
                  </Button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="px-3 bg-[#C91429] hover:bg-[#b21224]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Popup */}
      <Dialog open={showPopup} onOpenChange={(open) => {
        setShowPopup(open);
        if (!open) {
          setSelectedOption(null);
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <img 
                src={getMuneemjiImage()}
                alt="Muneem Ji"
                className="h-8 w-8 object-contain"
              />
              {selectedOption && chatOptions.find(opt => opt.id === selectedOption)?.label}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOption && renderDetailComponent(selectedOption)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MuneemjiChatbot;














































// // MuneemjiChatbot.tsx
// import React, { useState, useEffect, useRef } from "react";
// import { X, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface Message {
//   id: string;
//   text: string;
//   isBot: boolean;
//   timestamp: Date;
// }

// interface MuneemjiChatbotProps {
//   onNavigate?: (section: string) => void;
// }

// const MuneemjiChatbot: React.FC<MuneemjiChatbotProps> = ({ onNavigate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [showOptions, setShowOptions] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const chatOptions = [
//     { id: "compliance", label: "Compliance Dashboard", icon: "📊" },
//     { id: "loans", label: "Loan Overview", icon: "💰" },
//     { id: "regulatory", label: "Regulatory Updates", icon: "📋" },
//     { id: "growth", label: "Business Growth Tips", icon: "📈" },
//     { id: "tax", label: "Tax & TDS Reminders", icon: "🧾" },
//     { id: "reports", label: "Financial Reports", icon: "📄" },
//     { id: "apply", label: "Apply for Loan", icon: "✋" },
//     { id: "services", label: "Other Services", icon: "🔧" },
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => scrollToBottom(), [messages]);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setTimeout(() => {
//         setMessages([
//           {
//             id: "1",
//             text: "👋 Namaste! Main hoon Muneem Ji – aapke business ka digital saathi. Aap kis cheez mein madad chahte hain?",
//             isBot: true,
//             timestamp: new Date(),
//           },
//         ]);
//       }, 500);
//     }
//   }, [isOpen]);

//   const handleOptionClick = (option: typeof chatOptions[0]) => {
//     setShowOptions(false);
//     setIsTyping(true);

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now().toString(),
//         text: option.label,
//         isBot: false,
//         timestamp: new Date(),
//       },
//     ]);

//     setTimeout(() => {
//       setIsTyping(false);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           text: getBotResponse(option.id),
//           isBot: true,
//           timestamp: new Date(),
//         },
//       ]);
//       if (onNavigate) onNavigate(option.id);
//     }, 1200);
//   };

//   const getBotResponse = (id: string) => {
//     const responses: Record<string, string> = {
//       compliance: "📊 Aapka compliance dashboard ready hai!",
//       loans: "💰 Best loan options mil gaye hain!",
//       regulatory: "📋 Latest MSME regulations yahan hain.",
//       growth: "📈 Personalized business growth tips ready hain!",
//       tax: "🧾 Tax filing dates aur TDS reminders set!",
//       reports: "📄 Financial reports generate karne ke liye options ready.",
//       apply: "✋ Loan application process shuru karte hain!",
//       services: "🔧 Additional services ki details available hain.",
//     };
//     return responses[id] || "Main aapki madad karne ke liye yahan hoon!";
//   };

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now().toString(),
//         text: inputValue,
//         isBot: false,
//         timestamp: new Date(),
//       },
//     ]);
//     setInputValue("");
//     setIsTyping(true);

//     setTimeout(() => {
//       setIsTyping(false);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           text: "✅ Samjha! Main aapko relevant section mein le chalta hoon.",
//           isBot: true,
//           timestamp: new Date(),
//         },
//       ]);
//       setShowOptions(true);
//     }, 1000);
//   };

//   const resetChat = () => {
//     setMessages([]);
//     setShowOptions(true);
//     setIsTyping(false);
//   };

//   return (
//     <>
//       {/* Floating Avatar */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button
//           onClick={() => setIsOpen(true)}
//           onMouseEnter={() => setHovered(true)}
//           onMouseLeave={() => setHovered(false)}
//           className="relative h-24 w-24 rounded-full bg-gradient-to-br from-pink-500 to-red-500 shadow-xl border-4 border-white transition-transform hover:scale-105"
//         >
//           <img
//             src="/lovable-uploads/generated-image.png"
//             alt="Muneem Ji"
//             className="rounded-full object-cover h-full w-full"
//           />
//           {hovered && (
//             <span className="absolute -top-8 right-1 bg-white text-black px-2 py-1 rounded-lg shadow-md text-xs animate-bounce">
//               Click to chat 💬
//             </span>
//           )}
//         </button>
//       </div>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-end justify-center lg:items-end lg:justify-end p-4">
//           <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border w-full max-w-md flex flex-col overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-red-500 text-white">
//               <div className="flex items-center gap-3">
//                 <img
//                   src="/lovable-uploads/generated-image.png"
//                   className="h-10 w-10 rounded-full border-2 border-white"
//                   alt="Muneem Ji"
//                 />
//                 <div>
//                   <h3 className="font-bold">Muneem Ji</h3>
//                   <p className="text-xs opacity-80">Your Business Saathi</p>
//                 </div>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsOpen(false)}
//                 className="text-white hover:bg-white/20"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-4 overflow-y-auto space-y-3">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.isBot ? "justify-start" : "justify-end"
//                   }`}
//                 >
//                   <div
//                     className={`px-4 py-2 rounded-2xl shadow-md ${
//                       msg.isBot
//                         ? "bg-gradient-to-r from-gray-200 to-gray-100 text-black"
//                         : "bg-gradient-to-r from-pink-500 to-red-500 text-white"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}

//               {isTyping && (
//                 <div className="flex justify-start gap-1">
//                   <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
//                   <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
//                   <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300" />
//                 </div>
//               )}

//               {showOptions && !isTyping && (
//                 <div className="grid grid-cols-2 gap-2 mt-4">
//                   {chatOptions.map((opt) => (
//                     <Button
//                       key={opt.id}
//                       variant="outline"
//                       onClick={() => handleOptionClick(opt)}
//                       className="flex gap-2 items-center text-xs p-2 rounded-xl shadow-sm hover:shadow-md hover:border-pink-500 transition"
//                     >
//                       <span>{opt.icon}</span> {opt.label}
//                     </Button>
//                   ))}
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={resetChat}
//                     className="col-span-2 text-gray-500 hover:text-black"
//                   >
//                     Reset Chat
//                   </Button>
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="p-3 border-t flex gap-2 bg-white">
//               <Input
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder="Type your question..."
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               />
//               <Button
//                 onClick={handleSendMessage}
//                 className="bg-pink-500 hover:bg-pink-600"
//               >
//                 <Send className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MuneemjiChatbot;

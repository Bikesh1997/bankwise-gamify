
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH || '/';
  
  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Generate unique filenames for cache busting
      rollupOptions: {
        output: {
          // Add hash to filenames for cache busting
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
      // Ensure proper source maps for debugging
      sourcemap: mode === 'development',
      // Optimize build for production
      minify: mode === 'production',
      // Clear output directory before build
      emptyOutDir: true,
    },
    // Add cache busting headers
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  };
});

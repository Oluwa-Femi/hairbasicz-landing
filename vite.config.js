import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import EnvironmentPlugin from "vite-plugin-environment";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      svgrOptions: { icon: true },
      include: "**/*.svg",
    }),
    EnvironmentPlugin([
      "VITE_REACT_APP_PAYSMOSMO_ECOMMERCE_KEY",
      "VITE_REACT_APP_PAYSMOSMO_ECOMMERCE_PAYSTACK_PUBLIC_KEY",
      "VITE_REACT_APP_PAYSMOSMO_SAVING_URL",
    ]),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/app",
    // Increase chunk size warning limit to reduce false-positives for large assets
    chunkSizeWarningLimit: 2000, // in KiB (2 MiB)
    rollupOptions: {
      output: {
        // Put third-party deps into a vendor chunk to keep app chunks smaller
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        }
      }
    },
    loader: {
      packages: "external",
    },
  },
  server: {
    port: 5193,
  },
});

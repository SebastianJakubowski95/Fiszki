import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Fiszki",
  plugins: [react()],

  server: {
    port: 3000,
  },
});

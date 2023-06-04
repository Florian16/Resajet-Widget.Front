import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import styleImport from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

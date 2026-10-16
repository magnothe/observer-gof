import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base relativa: além de funcionar no Vercel, faz o build em dist/
  // abrir com duplo clique no file:// — o plano B offline da apresentação.
  base: "./",
  build: {
    outDir: "dist",
    // um arquivo de JS e um de CSS só, para o plano B ficar fácil de copiar
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});

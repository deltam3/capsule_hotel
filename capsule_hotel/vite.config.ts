import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  build: {
    // Customize build options as needed
    target: "esnext", // Ensure compatibility with modern JavaScript
  },
});

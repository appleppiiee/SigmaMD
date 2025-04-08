/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
 plugins: [react()],
 build: {
 manifest: true,
 rollupOptions: {
 input: "./src/main.jsx",
 },
 },
});
*/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 3000} = process.env;

export default defineConfig({
 plugins: [react()],
 server:{
     proxy:{
     '/api':{
     target:`http://localhost:${PORT}`,
     changeOrigin: true,
     },
     
     },
    },
    
 build: {
 manifest: true,
 rollupOptions: {
 input: "./src/main.jsx",
 },
 },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// // filepath: c:\Users\singh\OneDrive\Desktop\github\bug-buster\Frontend\vite.config.js
// // filepath: c:\Users\singh\OneDrive\Desktop\github\bug-buster\Frontend\vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';

// export default defineConfig({
//   plugins: [
//     react(),
//     visualizer({ open: true }), // Generates a visualization report
//   ],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: (id) => {
//           if (id.includes('node_modules')) {
//             if (id.includes('react-markdown')) {
//               return 'react-markdown';
//             }
//             if (id.includes('rehype')) {
//               return 'rehype';
//             }
//             if (id.includes('prismjs')) {
//               return 'prismjs';
//             }
//             if (id.includes('lodash')) {
//               return 'lodash';
//             }
//             if (id.includes('@wooorm')) {
//               return 'wooorm'; // Split @wooorm/starry-night into its own chunk
//             }
//           }
//         },
//       },
//     },
//     chunkSizeWarningLimit: 3000, // Increase the warning limit to 3000 kB
//   },
// });
// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// export default ({ mode }) => {
//     process.env = {...process.env, ...loadEnv(mode, process.cwd())};

//     return defineConfig({
//         plugins: [react()],
//         server: {
//           proxy: {
//             '/api': {
//               target: process.env.VITE_BACKEND_URL ,
//               changeOrigin: true,
//             },
//           }
//         }
//     });
// }

export default defineConfig(() => {
  return {
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
  };
});
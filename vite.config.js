import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '',
    define: mode === 'development' ? {
      "__AUTH0_DOMAIN__": JSON.stringify(env.AUTH0_DOMAIN),
      "__AUTH0_CLIENT_ID__": JSON.stringify(env.AUTH0_CLIENT_ID),
      "__AUTH0_AUDIENCE__": JSON.stringify(env.AUTH0_AUDIENCE),
      "__REACT_APP_STRIPE_CLIENT_SECRET__": JSON.stringify(env.REACT_APP_STRIPE_CLIENT_SECRET),
      "__REACT_APP_STRIPE_PUBLIC_KEY__": JSON.stringify(env.REACT_APP_STRIPE_PUBLIC_KEY),
    } : {},
    build: {
      outDir: './dist',
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/api': 'http://127.0.0.1:8000'
      },
    },
  }
});

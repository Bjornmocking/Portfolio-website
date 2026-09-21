import 'dotenv/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// Draait de Vercel serverless function (api/chat.js) rechtstreeks binnen de
// Vite dev-server, zodat "npm run dev" alleen al genoeg is om de chatbot
// lokaal te testen (geen losse "npm run dev:server" nodig).
const localApiPlugin = (): Plugin => ({
  name: 'local-api-chat',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end('Method Not Allowed');
        return;
      }

      let rawBody = '';
      req.on('data', (chunk) => {
        rawBody += chunk;
      });

      req.on('end', async () => {
        try {
          (req as typeof req & { body?: unknown }).body = rawBody ? JSON.parse(rawBody) : {};

          const vercelRes = {
            statusCode: 200,
            status(code: number) {
              this.statusCode = code;
              return this;
            },
            json(payload: unknown) {
              res.statusCode = this.statusCode;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(payload));
            },
            setHeader: res.setHeader.bind(res),
          };

          const { default: handler } = await import('./api/chat.js');
          await handler(req as never, vercelRes as never);
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Onbekende serverfout.' }));
        }
      });
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

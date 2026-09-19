import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import contactHandler from './src/pages/api/user.js';

const isProduction = globalThis.process.argv.includes('--production') || globalThis.process.env.NODE_ENV === 'production';
const port = Number(globalThis.process?.env?.PORT) || 5173;
const app = express();

app.use(express.json());
app.post('/api/user', contactHandler);

if (isProduction) {
  const distPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');
  app.use(express.static(distPath));
  app.get('/{*splat}', (_request, response) => response.sendFile(path.join(distPath, 'index.html')));
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

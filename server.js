import 'dotenv/config';
import crypto from 'node:crypto';
import process from 'node:process';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import contactHandler from './src/pages/api/user.js';
import newsletterHandler from './src/pages/api/newsletter.js';
import adminHandler from './src/pages/api/admin.js';
import publicContentHandler from './src/pages/api/content.js';
import Razorpay from 'razorpay';

const razorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      })
    : null;

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const isProduction = globalThis.process.argv.includes('--production') || globalThis.process.env.NODE_ENV === 'production';
const port = Number(globalThis.process?.env?.PORT) || 5173;
const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.static(path.join(projectRoot, 'public')));
app.post('/api/user', contactHandler);
app.post('/api/newsletter', newsletterHandler);
app.use('/api/admin', adminHandler);
app.get('/api/projects', publicContentHandler);
app.get('/api/testimonials', publicContentHandler);

app.post('/api/payments/create-order', async (request, response) => {
  const amount = Number(request.body?.amount ?? 0);
  const currency = String(request.body?.currency || 'INR');
  const receipt = String(request.body?.receipt || 'small-digital-project');
  const customerName = String(request.body?.customerName || 'Client');
  const email = String(request.body?.email || '');
  const phone = String(request.body?.phone || '');

  if (!Number.isFinite(amount) || amount <= 0) {
    return response.status(400).json({ message: 'A valid payment amount is required.' });
  }

  if (!razorpay) {
    return response.status(503).json({
      message: 'Payment gateway is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your environment.',
    });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt,
      notes: {
        customerName,
        email,
        phone,
      },
    });

    return response.json({
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (error) {
    console.error('Unable to create Razorpay order:', error);
    return response.status(500).json({
      message: 'Unable to create a payment order right now.',
    });
  }
});

app.post('/api/payments/verify', (request, response) => {
  const { order_id, payment_id, signature } = request.body ?? {};

  if (!order_id || !payment_id || !signature) {
    return response.status(400).json({ message: 'Missing payment verification data.' });
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return response.status(503).json({
      message: 'Payment verification is unavailable because Razorpay keys are not configured.',
    });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

  return response.json({
    valid: expectedSignature === signature,
  });
});

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

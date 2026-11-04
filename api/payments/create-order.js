import 'dotenv/config';
import crypto from 'node:crypto';
import Razorpay from 'razorpay';

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

function readBody(request) {
  if (request.body && typeof request.body === 'object') {
    return request.body;
  }

  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }

  return {};
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const body = readBody(request);
  const amount = Number(body.amount ?? 0);
  const currency = String(body.currency || 'INR');
  const receipt = String(body.receipt || 'small-digital-project');
  const customerName = String(body.customerName || 'Client');
  const email = String(body.email || '');
  const phone = String(body.phone || '');

  if (!Number.isFinite(amount) || amount <= 0) {
    return response.status(400).json({ message: 'A valid payment amount is required.' });
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

    return response.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (error) {
    console.error('Unable to create Razorpay order:', error);
    return response.status(500).json({
      message: 'Unable to create a payment order right now.',
    });
  }
}

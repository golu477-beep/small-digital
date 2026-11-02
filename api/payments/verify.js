import 'dotenv/config';
import crypto from 'node:crypto';

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
  const { order_id, payment_id, signature } = body ?? {};

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

  return response.status(200).json({
    valid: expectedSignature === signature,
  });
}

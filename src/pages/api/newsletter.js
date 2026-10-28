import mongoose from 'mongoose';
import { connectToDatabase } from '../../lib/mongodb.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterSubscriber = mongoose.models.NewsletterSubscriber ||
  mongoose.model(
    'NewsletterSubscriber',
    new mongoose.Schema(
      {
        email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
          maxlength: 254,
          unique: true,
        },
        consentAt: { type: Date, required: true },
        source: { type: String, required: true, default: 'website-footer' },
      },
      { timestamps: true },
    ),
  );

export default async function newsletterHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const email = req.body?.email;
  const consent = req.body?.consent;
  if (
    typeof email !== 'string' ||
    email.trim().length > 254 ||
    !emailPattern.test(email.trim()) ||
    consent !== true
  ) {
    return res.status(400).json({
      success: false,
      message: 'Enter a valid email address and confirm your subscription consent.',
    });
  }

  try {
    await connectToDatabase();
    await NewsletterSubscriber.init();
    const normalizedEmail = email.trim().toLowerCase();
    const result = await NewsletterSubscriber.updateOne(
      { email: normalizedEmail },
      {
        $setOnInsert: {
          email: normalizedEmail,
          consentAt: new Date(),
          source: 'website-footer',
        },
      },
      { upsert: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      subscribed: result.upsertedCount === 1,
      message: result.upsertedCount === 1
        ? 'You are subscribed to the newsletter.'
        : 'This email is already subscribed.',
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(200).json({
        success: true,
        subscribed: false,
        message: 'This email is already subscribed.',
      });
    }

    console.error('Newsletter subscription failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to save your subscription right now. Please try again later.',
    });
  }
}

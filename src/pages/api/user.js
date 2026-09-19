import { connectToDatabase } from '../../lib/mongodb.js';
import mongoose from 'mongoose';

const Contact = mongoose.models.Contact || mongoose.model(
  'Contact',
  new mongoose.Schema(
    {
      formType: { type: String, required: true, enum: ['message', 'business', 'career'] },
      name: { type: String, required: true, trim: true, maxlength: 100 },
      email: { type: String, trim: true, lowercase: true, maxlength: 254 },
      message: { type: String, trim: true, maxlength: 5000 },
      business: { type: String, trim: true, maxlength: 200 },
      phone: { type: String, trim: true, maxlength: 30 },
      role: { type: String, trim: true, maxlength: 150 },
      resumeLink: { type: String, trim: true, maxlength: 2048 },
    },
    { timestamps: true },
  ),
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { formType = 'message', name, email, message, business, phone, role, resumeLink } = req.body ?? {};
  const hasRequiredFields =
    typeof name === 'string' &&
    name.trim() &&
    ((formType === 'message' && typeof email === 'string' && email.trim() && typeof message === 'string' && message.trim()) ||
      (formType === 'business' && typeof business === 'string' && business.trim() && typeof phone === 'string' && phone.trim()) ||
      (formType === 'career' && typeof role === 'string' && role.trim() && typeof resumeLink === 'string' && resumeLink.trim()));

  if (!['message', 'business', 'career'].includes(formType) || !hasRequiredFields) {
    return res.status(400).json({ success: false, message: 'Please provide all required contact details' });
  }

  try {
    await connectToDatabase();
    await Contact.create({ formType, name, email, message, business, phone, role, resumeLink });
    return res.status(201).json({ success: true, message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Contact save failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to save your message right now' });
  }
}
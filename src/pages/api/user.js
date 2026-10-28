import { connectToDatabase } from '../../lib/mongodb.js';
import { Contact } from '../../lib/adminModels.js';
import { sendContactNotification } from '../../lib/email.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isStringWithin = (value, { min = 1, max }) =>
  typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { formType = 'message', name, email, message, business, phone, role, resumeLink } = req.body ?? {};
  const hasRequiredFields =
    isStringWithin(name, { min: 2, max: 100 }) &&
    ((formType === 'message' &&
      isStringWithin(email, { max: 254 }) &&
      emailPattern.test(email.trim()) &&
      isStringWithin(message, { min: 10, max: 5000 })) ||
      (formType === 'business' &&
        isStringWithin(business, { max: 200 }) &&
        isStringWithin(phone, { max: 30 }) &&
        (phone.match(/\d/g) || []).length >= 7 &&
        (phone.match(/\d/g) || []).length <= 15) ||
      (formType === 'career' &&
        isStringWithin(role, { max: 150 }) &&
        isStringWithin(resumeLink, { max: 2048 }) &&
        /^https?:\/\//i.test(resumeLink.trim())));

  if (!['message', 'business', 'career'].includes(formType) || !hasRequiredFields) {
    return res.status(400).json({
      success: false,
      message: 'Please provide valid contact details and complete all required fields',
    });
  }

  try {
    await connectToDatabase();
    const contact = {
      formType,
      name: name.trim(),
      email: typeof email === 'string' ? email.trim().toLowerCase() : undefined,
      message: typeof message === 'string' ? message.trim() : undefined,
      business: typeof business === 'string' ? business.trim() : undefined,
      phone: typeof phone === 'string' ? phone.trim() : undefined,
      role: typeof role === 'string' ? role.trim() : undefined,
      resumeLink: typeof resumeLink === 'string' ? resumeLink.trim() : undefined,
    };
    await Contact.create({ ...contact, isRead: false });

    let notificationSent = false;
    try {
      notificationSent = await sendContactNotification(contact);
    } catch (notificationError) {
      console.error('Contact email notification failed:', notificationError);
    }

    return res.status(201).json({
      success: true,
      message: 'Your details have been saved successfully.',
      notificationSent,
    });
  } catch (error) {
    console.error('Contact save failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to save your message right now' });
  }
}
import nodemailer from 'nodemailer';

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM,
  CONTACT_EMAIL,
} = globalThis.process.env;

const port = Number(MAIL_PORT);
const emailConfigured = Boolean(
  MAIL_HOST &&
  Number.isInteger(port) &&
  port > 0 &&
  port <= 65535 &&
  MAIL_USER &&
  MAIL_PASS &&
  CONTACT_EMAIL,
);

const transporter = emailConfigured
  ? nodemailer.createTransport({
      host: MAIL_HOST,
      port,
      secure: port === 465,
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    })
  : null;

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export async function sendContactNotification(contact) {
  if (!transporter) {
    console.warn('Contact notification email is disabled; configure SMTP settings to enable it.');
    return false;
  }

  const details = Object.entries(contact)
    .filter(([, value]) => typeof value === 'string' && value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  await transporter.sendMail({
    from: MAIL_FROM || MAIL_USER,
    to: CONTACT_EMAIL,
    replyTo: contact.email || undefined,
    subject: `New ${contact.formType} enquiry`,
    text: details,
    html: `<pre style="font-family: sans-serif; white-space: pre-wrap">${escapeHtml(details)}</pre>`,
  });

  return true;
}

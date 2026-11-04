import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [notificationSent, setNotificationSent] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
    if (values.name.trim().length > 100) errors.name = 'Name must be 100 characters or fewer.';
    if (!emailPattern.test(values.email.trim()) || values.email.trim().length > 254) {
      errors.email = 'Please enter a valid email address.';
    }
    if (values.message.trim().length < 10) errors.message = 'Please add a little more detail (at least 10 characters).';
    if (values.message.trim().length > 5000) errors.message = 'Message must be 5,000 characters or fewer.';
    return errors;
  };

  const updateField = (field, value) => {
    const updatedValues = { ...formData, [field]: value };
    setFormData(updatedValues);
    if (fieldErrors[field]) {
      const nextErrors = validate(updatedValues);
      setFieldErrors((current) => ({ ...current, [field]: nextErrors[field] }));
    }
  };

  const validateOnBlur = (field) => {
    const errors = validate(formData);
    setFieldErrors((current) => ({ ...current, [field]: errors[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send your message');
      }

      setNotificationSent(result.notificationSent === true);
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to send your message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch</h2>
          <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl text-center" role="status" aria-live="polite">
            <h3 className="font-bold text-xl mb-1">Thank You!</h3>
            <p>Your message has been saved. We will get in touch soon.</p>
            {!notificationSent && (
              <p className="mt-2 text-sm text-amber-700" role="status">
                Email notification could not be sent. Please contact us by WhatsApp for urgent enquiries.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="John Doe"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                onBlur={() => validateOnBlur('name')}
              />
              {fieldErrors.name && <p id="contact-name-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                inputMode="email"
                placeholder="john@example.com"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                onBlur={() => validateOnBlur('email')}
              />
              {fieldErrors.email && <p id="contact-email-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                required
                minLength={10}
                maxLength={5000}
                placeholder="Tell us about your project..."
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                onBlur={() => validateOnBlur('message')}
              ></textarea>
              {fieldErrors.message && <p id="contact-message-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {error && <p className="text-sm text-red-600 text-center" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
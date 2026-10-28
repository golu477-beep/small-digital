import { useState } from 'react';
import { LoaderCircle, Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');

    if (!consent) {
      setError('Please confirm that you agree to receive newsletter emails.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to subscribe right now.');
      }

      setStatus(result.message);
      setEmail('');
      setConsent(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to subscribe right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 rounded-4xl ">
        
      
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-teal-400">SmallDigital web</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
           We help your business grow digitally. Excellent services and 24/7 support..
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Instagram</a>
          </div>
        </div>

      
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
          </ul>
        </div>

       
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/legal?policy=privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
            <li><a href="/legal?policy=terms" className="hover:text-teal-400 transition-colors">Terms & Conditions</a></li>
            <li><a href="/legal?policy=refund" className="hover:text-teal-400 transition-colors">Refund Policy</a></li>
            <li><a href="/admin" className="hover:text-teal-400 transition-colors">Admin</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">Newsletter</h4>
          <p className="text-sm text-gray-400">
            Get occasional digital growth tips and SmallDigital updates.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                aria-describedby="newsletter-consent newsletter-status newsletter-error"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Subscribe to newsletter"
                className="inline-flex min-w-11 items-center justify-center rounded-lg bg-teal-500 px-3 text-gray-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  : <Mail className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
            <label id="newsletter-consent" className="flex items-start gap-2 text-xs leading-5 text-gray-400">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 accent-teal-500"
              />
              <span>I agree to receive newsletter emails. I can unsubscribe by contacting SmallDigital.</span>
            </label>
            {status && <p id="newsletter-status" className="text-sm text-teal-300" role="status">{status}</p>}
            {error && <p id="newsletter-error" className="text-sm text-red-300" role="alert">{error}</p>}
          </form>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <p><span className="font-medium text-gray-200">Email:</span> SmallDigital@company.com</p>
          <p><span className="font-medium text-gray-200">Phone:</span> +91 7070414390  +91 7973070600</p>
          <p><span className="font-medium text-gray-200">Location:</span> Patna, mohali, India</p>
        </div>

      </div>
      
    </footer>
  );
};

export default Footer;
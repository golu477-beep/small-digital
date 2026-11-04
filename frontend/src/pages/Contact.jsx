import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", business: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const adminWhatsApp = "917070414390";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "business" }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Unable to save your details");

      const msg = `Hello Admin 👋\n\nNew Business Enquiry:\n👤 Name: ${form.name}\n🏢 Business: ${form.business}\n📱 Phone: ${form.phone}`;
      window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
      setSuccess(result.notificationSent
        ? "Your details are saved and the team has been notified."
        : "Your details are saved. The team email alert is currently unavailable; you can still message us on WhatsApp.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save your details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Get Free Business Audit</h2>
        <p className="text-slate-400 text-sm">Fill details below to connect on WhatsApp directly.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
        <div>
          <label htmlFor="business-contact-name" className="block text-xs font-semibold uppercase text-slate-300 mb-2">Your Name</label>
          <input
            id="business-contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Aapka Naam"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="business-contact-business" className="block text-xs font-semibold uppercase text-slate-300 mb-2">Business Name</label>
          <input
            id="business-contact-business"
            name="business"
            type="text"
            required
            minLength={2}
            maxLength={200}
            placeholder="Business Ka Naam"
            value={form.business}
            onChange={(e) => setForm({ ...form, business: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="business-contact-phone" className="block text-xs font-semibold uppercase text-slate-300 mb-2">WhatsApp Number</label>
          <input
            id="business-contact-phone"
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={30}
            pattern="[\d()+. -]{7,30}"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 9876543210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
            disabled={isSubmitting}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-indigo-600/30"
        >
          {isSubmitting ? "Saving..." : "Send on WhatsApp"}
        </button>
          {success && <p className="text-sm text-emerald-300 text-center" role="status">{success}</p>}
          {error && <p className="text-sm text-red-400 text-center" role="alert">{error}</p>}
      </form>
    </div>
  );
}
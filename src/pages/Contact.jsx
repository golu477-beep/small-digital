import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", business: "", phone: "" });
  const adminWhatsApp = "917070414390";

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello Admin 👋\n\nNew Business Enquiry:\n👤 Name: ${form.name}\n🏢 Business: ${form.business}\n📱 Phone: ${form.phone}`;
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Get Free Business Audit</h2>
        <p className="text-slate-400 text-sm">Fill details below to connect on WhatsApp directly.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Your Name</label>
          <input
            type="text"
            required
            placeholder="Aapka Naam"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Business Name</label>
          <input
            type="text"
            required
            placeholder="Business Ka Naam"
            onChange={(e) => setForm({ ...form, business: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">WhatsApp Number</label>
          <input
            type="tel"
            required
            placeholder="+91 9876543210"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-indigo-600/30"
        >
          Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
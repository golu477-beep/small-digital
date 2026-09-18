import React from "react";

export default function Home({ onNavigate }) {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/50 rounded-full">
          Digital Marketing for Indian Businesses
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Bring your dukaan & business online, without the confusion.
        </h1>
        <p className="text-slate-400 text-base md:text-lg">
          We help shop owners, manufacturers, and service businesses across India get found, get enquiries, and get orders online.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate("contact")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-semibold rounded-xl shadow-lg transition-all"
          >
            Get a Free Audit
          </button>
          <button
            onClick={() => onNavigate("careers")}
            className="px-6 py-3 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-medium rounded-xl transition-all"
          >
            Apply for Jobs (Careers)
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {[
          { title: "Search Visibility", desc: "Get found on Google when local customers search for what you sell." },
          { title: "Social Growth", desc: "Instagram, Facebook & WhatsApp content calendars built for your business." },
          { title: "Performance Ads", desc: "Google and Meta campaigns tuned for real enquiries and orders." },
          { title: "Website & Storefront", desc: "Fast, mobile-first sites and catalog pages built for conversions." }
        ].map((s, idx) => (
          <div key={idx} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-xl font-bold text-white">{s.title}</h3>
            <p className="text-slate-400 text-sm">{s.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
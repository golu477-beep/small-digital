import React, { useState } from "react";

export default function Careers() {
  const [formData, setFormData] = useState({ name: "", role: "", resumeLink: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Join Our Team</h2>
        <p className="text-slate-400 text-sm">Submit your details along with your public Resume Link.</p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="text-teal-400 text-4xl font-bold">✓</div>
            <h3 className="text-xl font-bold text-white">Application Submitted!</h3>
            <p className="text-slate-400 text-sm">We will review your resume link and get back to you soon.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="Aapka Naam"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Applying Role</label>
              <input
                type="text"
                required
                placeholder="e.g. Graphic Designer / Content Writer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Resume Link Field */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-teal-500/30">
              <label className="block text-xs font-semibold uppercase text-teal-300 mb-1">
                Resume Link (Google Drive / Dropbox) *
              </label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/..."
                value={formData.resumeLink}
                onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-teal-400 focus:outline-none mb-2"
              />
              <p className="text-xs text-slate-400">
                ⚠️ Make sure the link access is set to <strong>"Anyone with the link"</strong>.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-all text-sm"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
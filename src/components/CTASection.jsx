import React from 'react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Ready to scale your business with <span className="text-indigo-400">Small Digital</span>?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Let’s build a high-converting website and brand strategy tailored for your company.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
    
          <a
            href="#contact"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 text-center"
          >
            Start Your Project Today →
          </a>

  
          <a
            href="#portfolio"
            className="bg-transparent hover:bg-gray-800 text-gray-200 border border-gray-700 font-semibold text-lg px-8 py-4 rounded-xl transition-all text-center"
          >
            Explore Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
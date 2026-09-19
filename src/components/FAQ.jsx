import React, { useState } from 'react';

const faqs = [
  {
    question: "What services does Small Digital provide?",
    answer: "We offer web design, web development, SEO optimization, brand identity design, and digital marketing strategies tailored for businesses of all sizes."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Project timelines depend on complexity. Typically, a standard business website takes 1–3 weeks, while larger custom platforms take 4–8 weeks."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we provide continuous support, regular site updates, performance tracking, and security monitoring after your project goes live."
  },
  {
    question: "How much does a custom website cost?",
    answer: "Pricing varies based on your specific requirements and features. Contact us with your project details, and we’ll provide a custom quote."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 font-semibold text-gray-800 flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg">{faq.question}</span>
                <span className={`text-2xl font-bold text-indigo-600 transform transition-transform duration-200 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Prominent CTA Banner */}
        <div className="bg-indigo-600 rounded-3xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="text-indigo-100 mb-6">We're here to help you turn your digital ideas into reality.</p>
          <a
            href="#contact"
            className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
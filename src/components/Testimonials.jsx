import React from 'react';

const testimonials = [
  {
    quote: "Small Digital completely transformed our digital presence. We saw a 40% increase in our sales!",
    name: "Amit Sharma",
    role: "CEO, TechCraft Labs"
  },
  {
    quote: "Their team's work ethic and delivery time are exceptional. The branding and web design turned out amazing.",
    name: "Neha Verma",
    role: "Founder, StyleStudio"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Clients Say</h2>
        <p className="text-gray-600 mb-12">Client Testimonials</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md text-left">
              <p className="text-gray-600 italic mb-6">"{item.quote}"</p>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                <p className="text-gray-500 text-xs">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
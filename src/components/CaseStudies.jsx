import React from 'react';

const caseStudies = [
  {
    title: "E-commerce Revenue Boost",
    client: "RetailBrand X",
    result: "+150% Sales Growth",
    description: "Doubled conversion rates through website speed optimization and UI/UX enhancements.",
    tags: ["UI/UX", "Next.js", "SEO"]
  },
  {
    title: "SaaS Platform Scaling",
    client: "CloudApp Inc.",
    result: "10k+ Active Users",
    description: "Launched the app with a scalable frontend architecture and fast API integrations.",
    tags: ["React", "Vercel", "Tailwind"]
  }
];

export default function CaseStudies() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Case Studies</h2>
          <p className="text-gray-600">See the results we've achieved for our clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <span className="text-xs font-semibold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {study.client}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">{study.title}</h3>
              <p className="text-2xl font-extrabold text-green-600 mb-4">{study.result}</p>
              <p className="text-gray-600 mb-6">{study.description}</p>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';


const valuesData = [
  {
    title: 'Mission',
    desc: 'To empower businesses with innovative digital solutions that drive growth, efficiency, and competitive advantage.',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Passion',
    desc: "We're passionate about technology and its potential to transform businesses and improve lives.",
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    desc: 'We constantly explore new technologies and approaches to deliver cutting-edge solutions.',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    desc: 'We believe in working closely with our clients to understand their needs and achieve shared goals.',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations.',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Agility',
    desc: 'We adapt quickly to changing requirements and technologies to keep our clients ahead of the curve.',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const journeyTimeline = [
  {
    year: '2015',
    title: 'Company Founded',
    desc: 'Rayon Web Solutions was founded with a vision to create innovative digital solutions for businesses of all sizes.',
    align: 'left',
  },
  {
    year: '2017',
    title: 'Expanded Services',
    desc: 'Added mobile app development and UI/UX design services to our portfolio, growing our team to 15 professionals.',
    align: 'right',
  },
  {
    year: '2019',
    title: 'Broader Reach',
    desc: 'Opened our first remote delivery office and expanded support across multiple regions.',
    align: 'left',
  },
  {
    year: '2021',
    title: 'Cloud Solutions',
    desc: 'Launched our DevOps and cloud solutions division, helping businesses migrate and optimize their cloud infrastructure.',
    align: 'right',
  },
  {
    year: '2023',
    title: 'AI Integration',
    desc: 'Began incorporating AI and machine learning solutions into our service offerings to help clients leverage cutting-edge technology.',
    align: 'left',
  },
  {
    year: 'Today',
    title: 'Industry Leader',
    desc: 'Now recognized as an industry leader with over 200 successful projects and a team of 50+ digital experts.',
    align: 'right',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#050811] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans space-y-28">
      
      {/* 1. HERO ABOUT SECTION */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#121829] border border-purple-500/30 text-purple-300 text-xs px-3.5 py-1.5 rounded-full mb-6">
            <span>💻</span> About SmallDigital Web Solutions
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">SmallDigital Web Solutions</span>
          </h1>

          <p className="text-gray-300 text-lg mb-4">
            We're a team of passionate developers, designers, and digital strategists dedicated to transforming businesses through innovative technology solutions.
          </p>

          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Founded in 2015, SmallDigital Web Solutions has grown from a small startup to a leading digital agency. Our mission is to bridge the gap between business goals and technological innovation, creating digital experiences that drive growth and success.
          </p>

          <p className="text-gray-400 text-sm sm:text-base mb-8">
            With expertise spanning web development, mobile applications, cloud solutions, UI/UX design, and more, we offer comprehensive digital services tailored to your unique needs.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all">
              Get in Touch
            </button>
            <button className="bg-[#121829] border border-gray-800 hover:border-gray-700 text-gray-300 font-medium px-6 py-3 rounded-xl transition-all">
              Explore Services
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-gray-800 h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                alt="Team working"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden border border-gray-800 h-[172px]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                  alt="Discussion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-800 h-[172px]">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                  alt="Meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

      
          <div className="absolute -bottom-6 -right-2 sm:right-4 bg-[#0d1322]/95 backdrop-blur-md border border-gray-800 rounded-2xl p-4 shadow-2xl max-w-xs">
            <h4 className="text-sm font-semibold text-white mb-2">Why Choose Us</h4>
            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Expert Team
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Proven Track Record
              </div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Mission & Values</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          These core principles guide everything we do and define who we are as a company.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {valuesData.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0d1322] border border-gray-800/80 rounded-2xl p-6 hover:border-purple-500/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

   
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            From humble beginnings to industry leadership, our journey has been defined by innovation, growth, and a commitment to excellence.
          </p>
        </div>

       
        <div className="relative">
       
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-800"></div>

          <div className="space-y-12">
            {journeyTimeline.map((item, index) => (
              <div key={index} className="relative flex items-center justify-between">
                
         
                <div className={`w-1/2 pr-8 text-right ${item.align === 'right' ? 'hidden md:block opacity-0' : ''}`}>
                  {item.align === 'left' && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  )}
                </div>

               
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-xs flex items-center justify-center border-4 border-[#050811] shadow-lg">
                    {item.year}
                  </div>
                </div>

            
                <div className={`w-1/2 pl-8 text-left ${item.align === 'left' ? 'hidden md:block opacity-0' : ''}`}>
                  {item.align === 'right' && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="max-w-7xl mx-auto bg-[#0d1322] border border-gray-800 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          
          <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Cerber <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Security Integration</span>
          </h2>
          
          <p className="text-gray-300 text-sm sm:text-base mb-8">
            We partner with Cerber Security to provide enterprise-grade security solutions for all our digital products.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-900/40 text-purple-400 flex items-center justify-center mt-0.5 text-sm">✓</div>
              <div>
                <h4 className="font-semibold text-white text-base">Advanced Threat Protection</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Our solutions include real-time monitoring and protection against the latest cyber threats.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-900/40 text-purple-400 flex items-center justify-center mt-0.5 text-sm">✓</div>
              <div>
                <h4 className="font-semibold text-white text-base">Data Encryption</h4>
                <p className="text-gray-400 text-xs sm:text-sm">End-to-end encryption ensures your sensitive data remains secure at all times.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-900/40 text-purple-400 flex items-center justify-center mt-0.5 text-sm">✓</div>
              <div>
                <h4 className="font-semibold text-white text-base">Compliance & Certification</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Our security measures align with recognized standards including GDPR, HIPAA, and ISO 27001.</p>
              </div>
            </div>
          </div>

          <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 text-white font-medium px-6 py-3 rounded-xl transition-all">
            Learn More About Our Security
          </button>
        </div>

   
        <div className="bg-[#080d1a] border border-gray-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[320px]">
          <div className="w-16 h-16 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">Cerber Security Shield</h3>
          <p className="text-gray-400 text-sm max-w-md mb-6">
            Our partnership with Cerber Security ensures that all our digital solutions are built with security at their core.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-[#121829] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full">GDPR Compliant</span>
            <span className="bg-[#121829] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full">ISO 27001</span>
            <span className="bg-[#121829] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full">HIPAA Ready</span>
          </div>
        </div>
      </section>

    </div>
  );
}
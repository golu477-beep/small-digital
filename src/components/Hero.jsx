import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        
        <div>
          <p className="text-blue-600 font-semibold tracking-widest text-sm mb-4">
            WEB DEVELOPMENT SERVICES
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Build Your Business
            <span className="block text-blue-600">
              With a Modern Website
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            I create fast, responsive and professional websites for
            businesses, startups and individuals using modern web
            technologies.
          </p>

       
          <div className="flex flex-wrap gap-4 mt-8">

            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Get a Free Quote
            </a>

            <a
              href="#projects"
              className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              View My Work
            </a>

          </div>

         
          <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-600">
            <span>✓ Responsive Design</span>
            <span>✓ Fast Website</span>
            <span>✓ Modern UI</span>
          </div>
        </div>

       
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-gray-100 rounded-3xl p-8 shadow-xl">

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>

              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-blue-100 rounded-xl"></div>
                <div className="h-24 bg-gray-100 rounded-xl"></div>
                <div className="h-24 bg-gray-100 rounded-xl"></div>
                <div className="h-24 bg-blue-100 rounded-xl"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
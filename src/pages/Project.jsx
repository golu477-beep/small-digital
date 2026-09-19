import React, { useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: "Allen & Unwin Books",
    category: "Web Development",
    image: "https://via.placeholder.com/600x400/111827/FFFFFF?text=Web+Dev+Project+1",
    description: "Book publishing platform with custom search and store."
  },
  {
    id: 2,
    title: "New Zealand Book Publishers",
    category: "Web Development",
    image: "https://via.placeholder.com/600x400/111827/FFFFFF?text=Web+Dev+Project+2",
    description: "Heartwarming and charming stories catalog."
  },
  {
    id: 3,
    title: "Creative First Aid",
    category: "Web Development",
    image: "https://via.placeholder.com/600x400/111827/FFFFFF?text=Web+Dev+Project+3",
    description: "The science + joy of creativity for mental health."
  },
  {
    id: 4,
    title: "Toolsy - Free SEO Tools",
    category: "Product Owner",
    image: "https://via.placeholder.com/600x400/111827/FFFFFF?text=Product+Owner+Project",
    description: "SEO, AI workflows, and everyday file utility tools."
  }
];

export default function OurProjects() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Web Development', 'Product Owner'];

  
  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeTab);

  return (
    <section className="bg-[#050811] text-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto text-center">
      
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projects</span>
        </h2>
        
        <p className="max-w-3xl mx-auto text-gray-400 text-lg mb-10">
          Explore our portfolio of successful projects across various industries and technologies. Each project represents our commitment to excellence and innovation.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeTab === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/25 scale-105'
                  : 'bg-[#121826] text-gray-400 hover:text-white hover:bg-[#1a2333]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-[#0d1322] border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 group shadow-xl"
            >
            
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
              
                <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {project.category}
                </span>
              </div>

        
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
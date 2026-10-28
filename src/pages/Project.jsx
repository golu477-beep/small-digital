import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { defaultProjects } from '../data/portfolio.js';

const categories = ['All', 'Web Development', 'UI/UX', 'E-commerce'];

function ProjectModal({ project, onClose, isLight }) {
  const closeButtonRef = useRef(null);
  const closeDialog = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`portfolio-modal ${isLight ? "portfolio-modal-light" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button ref={closeButtonRef} type="button" className="portfolio-modal-close" onClick={onClose} aria-label="Close project details">
          <X className="h-5 w-5" />
        </button>
        <div className={`portfolio-modal-art project-${project.visual}`}>
          {project.imageUrl && <img className="portfolio-project-image" src={project.imageUrl} alt={`${project.title} project preview`} />}
          <span className="portfolio-modal-art-label">PROJECT OVERVIEW</span>
          <strong>{project.title}</strong>
          <span className="portfolio-modal-art-line" />
          <span className="portfolio-modal-art-line portfolio-modal-art-line-short" />
        </div>
        <div className="portfolio-modal-content">
          <span className="portfolio-modal-kicker">{project.categories.join(" · ")}</span>
          <h2 id="project-modal-title">{project.title}</h2>
          <p>{project.description}</p>

          <h3>Project brief</h3>
          <p>{project.requirement}</p>

          <h3>Approach</h3>
          <p>{project.solution}</p>

          <h3>Technology</h3>
          {project.techStack.length > 0 ? (
            <div className="portfolio-tech-list">
              {project.techStack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          ) : (
            <p>Technology details have not been provided for this project.</p>
          )}

          {project.demoUrl ? (
            <a className="portfolio-demo-link" href={project.demoUrl} target="_blank" rel="noreferrer">
              View live project <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <p className="portfolio-demo-unavailable">A public demo link was not provided.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default function OurProjects({ isLight }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState(defaultProjects);
  const [contentNotice, setContentNotice] = useState("");

  useEffect(() => {
    let active = true;
    fetch('/api/projects')
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load portfolio projects.");
        if (!Array.isArray(result.projects)) throw new Error("Portfolio response was invalid.");
        if (active) {
          setProjectsData(result.projects);
          setContentNotice("");
        }
      })
      .catch((error) => {
        console.warn("Unable to load managed portfolio projects; showing built-in projects.", error);
        if (active) setContentNotice("Showing the built-in portfolio while live project content is unavailable.");
      });
    return () => { active = false; };
  }, []);

  const filteredProjects = activeTab === 'All'
    ? projectsData
    : projectsData.filter(project => project.categories.includes(activeTab));

  return (
    <section className={`projects-page py-16 px-4 sm:px-6 lg:px-8 min-h-screen ${
      isLight ? "projects-light bg-slate-50 text-slate-900" : "bg-[#050811] text-white"
    }`}>
      <div className="max-w-7xl mx-auto text-center">
      
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projects</span>
        </h2>
        
        <p className="max-w-3xl mx-auto text-gray-400 text-lg mb-10">
          Explore selected project work. Open a project to see its brief and the information available about its implementation.
        </p>
        {contentNotice && <p className="portfolio-content-notice" role="status">{contentNotice}</p>}

        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeTab === category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeTab === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/25 scale-105'
                  : `portfolio-category-inactive bg-[#121826] text-gray-400 hover:text-white hover:bg-[#1a2333] ${
                    isLight ? "portfolio-category-inactive" : ""
                  }`
              }`}
            >
              {category}
            </button>
          ))}
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.slug ?? project.id ?? project.title}
              className={`portfolio-card project-${project.visual} bg-[#0d1322] border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 group shadow-xl`}
            >
              <button
                type="button"
                className={`portfolio-card-art project-${project.visual}`}
                onClick={() => setSelectedProject(project)}
                aria-label={`View details for ${project.title}`}
              >
                {project.imageUrl && <img className="portfolio-project-image" src={project.imageUrl} alt="" loading="lazy" />}
                <span className="portfolio-card-art-top">
                  <span>SMALL DIGITAL / PROJECT {String(index + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="portfolio-card-art-window">
                  <span className="portfolio-card-art-dots"><i /><i /><i /></span>
                  <span className="portfolio-card-art-heading">{project.title}</span>
                  <span className="portfolio-card-art-line" />
                  <span className="portfolio-card-art-line portfolio-card-art-line-short" />
                  <span className="portfolio-card-art-tiles"><i /><i /><i /></span>
                </span>
                <span className="portfolio-card-category">{project.categories[0]}</span>
              </button>

              <div className="p-5">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="text-left"
                  aria-label={`Read ${project.title} project details`}
                >
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </button>
                <p className="text-gray-400 text-sm">{project.description}</p>
                <button
                  type="button"
                  className="portfolio-details-link"
                  onClick={() => setSelectedProject(project)}
                >
                  View project details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isLight={isLight}
        />
      )}
    </section>
  );
}
import { useState } from "react";
import {
  Code,
  Smartphone,
  Cloud,
  Palette,
  BookOpen,
  CheckCircle,
  Cpu,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import logoImage from "../assets/logo.png";

export default function Navbar({ onNavigate }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const servicesData = [
    {
      title: "Web Development",
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      items: ["Custom Website Design", "E-commerce Solutions", "CMS Integration"],
    },
    {
      title: "App Development",
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      items: ["Android & iOS Apps", "Progressive Web Apps", "Cross-Platform Apps"],
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      items: ["Cloud Setup", "CI/CD Pipelines", "Docker & Kubernetes"],
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      items: ["Wireframes & Prototyping", "Web & Mobile App Design", "Design Systems"],
    },
    {
      title: "LMS & Integration",
      icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
      items: ["Custom LMS", "Payment Integration", "CRM & API Integration"],
    },
    {
      title: "QA & Automation",
      icon: <CheckCircle className="w-5 h-5 text-cyan-400" />,
      items: ["Manual Testing", "Automated CI Tests", "Performance Audits"],
    },
    {
      title: "AI & Machine Learning",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      items: [
        "Hugging Face Models",
        "LLM Development",
        "Custom Model Training",
        "Predictive Analytics",
      ],
    },
  ];

  return (
    <nav className="bg-[#090d16] text-white fixed w-full top-0 left-0 z-50 px-6 py-3.5 border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <div 
          onClick={() => navigate("home")} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <img 
            src={logoImage}
            alt="SmallDigital Web Logo"
            className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />

          <div className="flex items-center text-xl font-extrabold tracking-wide">
            <span className="text-white">SmallDigital</span>
            <span className="text-cyan-400 ml-1">Web</span>
          </div>
        </div>

   
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => navigate("home")} className="text-slate-300 hover:text-white transition">Home</button>
          <button onClick={() => navigate("about")} className="text-slate-300 hover:text-white transition">About</button>

          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1.5 bg-slate-800/50 hover:bg-slate-800 px-3.5 py-1.5 rounded-lg text-cyan-300 border border-slate-700/50 transition">
              Services <ChevronDown className="w-4 h-4" />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full -left-20 mt-2 w-[850px] bg-[#0c1220]/95 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl z-50">
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800/80">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      SERVICES
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Choose any service to view details and sub-services
                    </p>
                  </div>
                  <button onClick={() => navigate("services")} className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition">
                    View All Services
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {servicesData.map((service, index) => (
                    <div
                      key={index}
                      className="bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/30 rounded-xl p-4 transition-all duration-200 hover:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        {service.icon}
                        <h3 className="font-bold text-sm text-white">
                          {service.title}
                        </h3>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {service.items.map((item, subIndex) => (
                          <li key={subIndex} className="flex items-center gap-1.5 hover:text-cyan-300 cursor-pointer transition">
                            <span className="text-cyan-500/80">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => navigate("projects")} className="text-slate-300 hover:text-white transition">Projects</button>
          <button onClick={() => navigate("blog")} className="text-slate-300 hover:text-white transition">Blog</button>
          <button onClick={() => navigate("careers")} className="bg-slate-800/80 px-3.5 py-1.5 rounded-lg text-slate-200 hover:bg-slate-700 transition border border-slate-700/50">Careers</button>
          <button onClick={() => navigate("training")} className="text-slate-300 hover:text-white transition">Training</button>
          <button onClick={() => navigate("contact")} className="text-slate-300 hover:text-white transition">Contact</button>
        </div>

       
        <button onClick={() => navigate("contact")} className="hidden sm:block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-lg shadow-cyan-500/20">
          Book a Consultation
        </button>

      
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          className="md:hidden rounded-lg p-2 text-slate-200 hover:bg-slate-800"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

   
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#090d16] px-6 py-4">
          <div className="flex flex-col gap-1 text-sm font-medium">
            <button onClick={() => navigate("home")} className="py-3 text-left text-slate-200 border-b border-slate-800/50">Home</button>
            <button onClick={() => navigate("about")} className="py-3 text-left text-slate-200 border-b border-slate-800/50">About</button>
            <button onClick={() => navigate("services")} className="py-3 text-left text-cyan-300 border-b border-slate-800/50">Services</button>
            <button onClick={() => navigate("projects")} className="py-3 text-left text-slate-200 border-b border-slate-800/50">Projects</button>
            <button onClick={() => navigate("blog")} className="py-3 text-left text-slate-200 border-b border-slate-800/50">Blog</button>
            <button onClick={() => navigate("careers")} className="py-3 text-left text-slate-200 border-b border-slate-800/50">Careers</button>
            <button onClick={() => navigate("training")} className="py-3 text-left text-slate-200 border-b border-slate-800/50">Training</button>
            <button onClick={() => navigate("contact")} className="py-3 text-left text-slate-200">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}
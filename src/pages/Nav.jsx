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
  Moon,
  Sun,
  X,
} from "lucide-react";
import logoImage from "./logo.png";

export default function Navbar({ onNavigate, isLight, onToggleTheme }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinkClass = isLight
    ? "nav-link text-slate-600 hover:text-slate-950 transition"
    : "nav-link text-slate-300 hover:text-white transition";

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
    <nav className={`navbar-shell fixed w-full top-0 left-0 z-50 px-6 py-3.5 border-b backdrop-blur-md ${
      isLight
        ? "navbar-light bg-white/95 text-slate-900 border-slate-200"
        : "bg-[#090d16] text-white border-slate-800/80"
    }`}>
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

          <div className="navbar-brand flex items-center text-xl font-extrabold tracking-wide">
            <span className={isLight ? "text-slate-900" : "text-white"}>SmallDigital</span>
            <span className="text-cyan-400 ml-1">Web</span>
          </div>
        </div>

   
        <div className="navbar-links hidden lg:flex items-center gap-4 text-sm font-medium">
          <button onClick={() => navigate("home")} className={navLinkClass}>Home</button>
          <button onClick={() => navigate("about")} className={navLinkClass}>About</button>

          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border transition ${
              isLight
                ? "bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border-cyan-200"
                : "bg-slate-800/50 hover:bg-slate-800 text-cyan-300 border-slate-700/50"
            }`}>
              Services <ChevronDown className="w-4 h-4" />
            </button>

            {isServicesOpen && (
              <div className={`navbar-dropdown absolute top-full -left-20 mt-2 w-[850px] border rounded-2xl p-6 shadow-2xl backdrop-blur-2xl z-50 ${
                isLight ? "bg-white border-slate-200" : "bg-[#0c1220]/95 border-slate-800"
              }`}>
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

          <button onClick={() => navigate("projects")} className={navLinkClass}>Projects</button>
          <button onClick={() => navigate("blog")} className={`${navLinkClass} navbar-optional-link`}>Blog</button>
          <button onClick={() => navigate("careers")} className={`px-3.5 py-1.5 rounded-lg transition border ${
            isLight
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
              : "bg-slate-800/80 text-slate-200 hover:bg-slate-700 border-slate-700/50"
          }`}>Careers</button>
          <button onClick={() => navigate("training")} className={`${navLinkClass} navbar-optional-link`}>Training</button>
          <button onClick={() => navigate("contact")} className={navLinkClass}>Contact</button>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
          aria-pressed={isLight}
          className={`theme-toggle rounded-full p-2 transition-colors ${
            isLight
              ? "text-slate-700 hover:bg-slate-100"
              : "text-slate-200 hover:bg-slate-800"
          }`}
        >
          {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <button onClick={() => navigate("contact")} className="navbar-consultation hidden 2xl:block whitespace-nowrap bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-lg shadow-cyan-500/20">
          Book a Consultation
        </button>

      
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          className={`lg:hidden rounded-lg p-2 ${
            isLight ? "text-slate-700 hover:bg-slate-100" : "text-slate-200 hover:bg-slate-800"
          }`}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

   
      {isMobileMenuOpen && (
        <div className={`navbar-mobile lg:hidden border-t px-6 py-4 ${
          isLight ? "border-slate-200 bg-white" : "border-slate-800 bg-[#090d16]"
        }`}>
          <div className="flex flex-col gap-1 text-sm font-medium">
            <button onClick={() => navigate("home")} className="mobile-nav-link py-3 text-left border-b">Home</button>
            <button onClick={() => navigate("about")} className="mobile-nav-link py-3 text-left border-b">About</button>
            <button onClick={() => navigate("services")} className="mobile-nav-link py-3 text-left border-b">Services</button>
            <button onClick={() => navigate("projects")} className="mobile-nav-link py-3 text-left border-b">Projects</button>
            <button onClick={() => navigate("blog")} className="mobile-nav-link py-3 text-left border-b">Blog</button>
            <button onClick={() => navigate("careers")} className="mobile-nav-link py-3 text-left border-b">Careers</button>
            <button onClick={() => navigate("training")} className="mobile-nav-link py-3 text-left border-b">Training</button>
            <button onClick={() => navigate("contact")} className="mobile-nav-link py-3 text-left">Contact</button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-pressed={isLight}
              className="mobile-nav-link flex items-center gap-2 py-3 text-left"
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Switch to {isLight ? "dark" : "light"} mode
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
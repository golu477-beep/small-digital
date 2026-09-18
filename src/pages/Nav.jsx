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
} from "lucide-react";

export default function Navbar({ onNavigate }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);


  const servicesData = [
    {
      title: "Web Development",
      icon: <Code className="w-5 h-5 text-teal-400" />,
      items: ["Custom Website Design", "E-commerce Solutions", "CMS Integration"],
    },
    {
      title: "App Development",
      icon: <Smartphone className="w-5 h-5 text-teal-400" />,
      items: ["Android & iOS Apps", "Progressive Web Apps", "Cross-Platform Apps"],
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="w-5 h-5 text-teal-400" />,
      items: ["Cloud Setup", "CI/CD Pipelines", "Docker & Kubernetes"],
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="w-5 h-5 text-teal-400" />,
      items: ["Wireframes & Prototyping", "Web & Mobile App Design", "Design Systems"],
    },
    {
      title: "LMS & Integration",
      icon: <BookOpen className="w-5 h-5 text-teal-400" />,
      items: ["Custom LMS", "Payment Integration", "CRM & API Integration"],
    },
    {
      title: "QA & Automation",
      icon: <CheckCircle className="w-5 h-5 text-teal-400" />,
      items: ["Manual Testing", "Automated CI Tests", "Performance Audits"],
    },
    {
      title: "AI & Machine Learning",
      icon: <Cpu className="w-5 h-5 text-teal-400" />,
      items: [
        "Hugging Face Models",
        "LLM Development",
        "Custom Model Training",
        "Predictive Analytics",
      ],
    },
  ];

  return (
    <nav className="bg-[#0b101d] text-white fixed w-full top-0 left-0 z-50 px-6 py-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
      
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-wide">
          <span className="text-teal-400 font-mono text-2xl">&lt;/&gt;</span>
          <span className="text-white">SmallDigital </span>
          <span className="text-teal-400">Web</span>
        </div>

       
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => onNavigate("home")} className="text-slate-300 hover:text-white transition">Home</button>
          <a href="#" className="text-slate-300 hover:text-white transition">About</a>

          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 bg-slate-800/60 px-3 py-1.5 rounded-lg text-teal-300 hover:bg-slate-800 transition">
              Services <ChevronDown className="w-4 h-4" />
            </button>

       
            {isServicesOpen && (
              <div className="absolute top-full -left-20 mt-2 w-[850px] bg-[#0d1424]/95 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl z-50">
              
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800/80">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                      SERVICES
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Choose any service to view details and sub-services
                    </p>
                  </div>
                  <button className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition">
                    View All Services
                  </button>
                </div>

           
                <div className="grid grid-cols-3 gap-4">
                  {servicesData.map((service, index) => (
                    <div
                      key={index}
                      className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all duration-200 hover:bg-slate-800/40"
                    >
                    
                      <div className="flex items-center gap-2 mb-3">
                        {service.icon}
                        <h3 className="font-bold text-sm text-white">
                          {service.title}
                        </h3>
                      </div>

                  
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {service.items.map((item, subIndex) => (
                          <li key={subIndex} className="flex items-center gap-1.5 hover:text-teal-300 cursor-pointer transition">
                            <span className="text-teal-500/80">•</span>
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

          <a href="#" className="text-slate-300 hover:text-white transition">Projects</a>
          <a href="#" className="text-slate-300 hover:text-white transition">Blog</a>
          <button onClick={() => onNavigate("careers")} className="bg-slate-800 px-3 py-1.5 rounded-lg text-slate-200 hover:bg-slate-700 transition">Careers</button>
          <a href="#" className="text-slate-300 hover:text-white transition">Training</a>
          <button onClick={() => onNavigate("contact")} className="text-slate-300 hover:text-white transition">Contact</button>
        </div>

        <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-lg shadow-cyan-500/20">
          Book a Consultation
        </button>
      </div>
    </nav>
  );
}
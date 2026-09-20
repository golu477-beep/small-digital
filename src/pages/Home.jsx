import Testimonials from '../components/Testimonials';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import LiveChat from '../components/LiveChat';
import Hero from "../components/Hero";
import FloatingButtons from '../FloatingButtons';
import homepageImage from '../assets/homepage.jpeg';

export default function Home({ onNavigate }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#070a12] py-12 px-4 text-white sm:px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(7, 10, 18, 0.72), rgba(7, 10, 18, 0.8)), url(${homepageImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* 1. Background Metallic Glow & Ambient Light Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* 2. Cyber Mesh Overlay Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      <div className="relative z-10 space-y-24 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Digital Marketing for Indian Businesses
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Bring your dukaan & business online, without the confusion.
          </h1>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We help shop owners, manufacturers, and service businesses across India get found, get enquiries, and get orders online.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate("contact")}
              className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get a Free Audit
            </button>
            
            <button
              onClick={() => onNavigate("careers")}
              className="px-7 py-3.5 bg-slate-900/80 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              Apply for Jobs (Careers)
            </button>
          </div>
        </section>

        {/* Features Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Search Visibility", desc: "Get found on Google when local customers search for what you sell." },
            { title: "Social Growth", desc: "Instagram, Facebook & WhatsApp content calendars built for your business." },
            { title: "Performance Ads", desc: "Google and Meta campaigns tuned for real enquiries and orders." },
            { title: "Website & Storefront", desc: "Fast, mobile-first sites and catalog pages built for conversions." }
          ].map((s, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl space-y-2 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] group"
            >
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* Hero Banner Component */}
        <Hero />

        {/* Secondary Sections */}
        <main className="relative space-y-20">
          <CaseStudies />
          <Testimonials />
          <FAQ />
          <FloatingButtons />
          <ContactForm />
          {/* <LiveChat /> */}
        </main>

      </div>
    </div>
  );
}
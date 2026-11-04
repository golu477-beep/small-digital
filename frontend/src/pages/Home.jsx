import { useEffect, useState } from "react";
import Testimonials from '../components/Testimonials';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import Hero from "../components/Hero";
import ProjectEstimator from "../components/ProjectEstimator";
import ScrollReveal from "../components/ScrollReveal";
import homepageImage from '../assets/homepage.jpeg';


const heroPhrases = [
  "websites that bring in customers.",
  "digital campaigns built to grow.",
  "online experiences made for you.",
];

export default function Home({ onNavigate, isLight }) {
  const [phrase, setPhrase] = useState(heroPhrases[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let phraseIndex = 0;
    let characterIndex = heroPhrases[0].length;
    let isDeleting = true;
    let timeoutId;

    const animatePhrase = () => {
      const currentPhrase = heroPhrases[phraseIndex];

      if (isDeleting) {
        characterIndex -= 1;
        setPhrase(currentPhrase.slice(0, characterIndex));
        if (characterIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % heroPhrases.length;
          timeoutId = window.setTimeout(animatePhrase, 320);
          return;
        }
      } else {
        characterIndex += 1;
        setPhrase(currentPhrase.slice(0, characterIndex));
        if (characterIndex === currentPhrase.length) {
          isDeleting = true;
          timeoutId = window.setTimeout(animatePhrase, 1700);
          return;
        }
      }

      timeoutId = window.setTimeout(animatePhrase, isDeleting ? 38 : 72);
    };

    timeoutId = window.setTimeout(animatePhrase, 1700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`home-page relative min-h-screen w-full overflow-hidden py-12 px-4 sm:px-6 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#070a12] text-white"
      }`}
      style={{
        backgroundImage: isLight
          ? "none"
          : `linear-gradient(rgba(7, 10, 18, 0.72), rgba(7, 10, 18, 0.8)), url(${homepageImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >

      {!isLight && (
        <>
          <div className="hero-blob hero-blob-one absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />
          <div className="hero-blob hero-blob-two absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none -z-10" />
          <div className="hero-blob hero-blob-three absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none -z-10" />
        </>
      )}

      {!isLight && (
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"
        />
      )}

      <div className="relative z-10 space-y-24 max-w-7xl mx-auto">

        <ScrollReveal>
          <section className="hero-intro text-center max-w-3xl mx-auto space-y-6 pt-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Digital Marketing for Indian Businesses
          </span>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight ${
            isLight
              ? "text-slate-900"
              : "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400"
          }`}>
            Bring your dukaan & business online, without the confusion.
          </h1>

          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mx-auto ${
            isLight ? "text-slate-600" : "text-slate-400"
          }`}>
            We help shop owners, manufacturers, and service businesses across India get found, get enquiries, and get orders online.
          </p>

          <p className={`hero-typed-line text-sm sm:text-base font-semibold ${
            isLight ? "text-cyan-700" : "text-cyan-300"
          }`}>
            <span className="sr-only">Our focus: websites that bring in customers.</span>
            <span aria-hidden="true">{phrase}</span>
            <span className="typing-caret" aria-hidden="true" />
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
        </ScrollReveal>


        <ScrollReveal>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Search Visibility", desc: "Get found on Google when local customers search for what you sell." },
            { title: "Social Growth", desc: "Instagram, Facebook & WhatsApp content calendars built for your business." },
            { title: "Performance Ads", desc: "Google and Meta campaigns tuned for real enquiries and orders." },
            { title: "Website & Storefront", desc: "Fast, mobile-first sites and catalog pages built for conversions." }
          ].map((s, idx) => (
            <div 
              key={idx} 
              className={`p-6 ${
                isLight
                  ? "bg-white border-slate-200 shadow-sm"
                  : "bg-slate-900/40 border-slate-800/80 backdrop-blur-md"
              } border hover:border-cyan-500/40 rounded-2xl space-y-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] group`}
            >
              <h3 className={`text-xl font-bold group-hover:text-cyan-300 transition-colors ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                {s.title}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}>{s.desc}</p>
            </div>
          ))}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <Hero isLight={isLight} />
        </ScrollReveal>

        <ScrollReveal>
          <ProjectEstimator isLight={isLight} onNavigate={onNavigate} />
        </ScrollReveal>

        <main className="relative space-y-20">
          <ScrollReveal>
            <CaseStudies isLight={isLight} onNavigate={onNavigate} />
          </ScrollReveal>
          <ScrollReveal><Testimonials isLight={isLight} /></ScrollReveal>
          <ScrollReveal><FAQ /></ScrollReveal>
          <ScrollReveal><ContactForm /></ScrollReveal>
        </main>

      </div>
    </div>
  );
}
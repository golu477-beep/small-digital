import { useEffect, useState } from "react";
import AboutPage from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import FloatingButtons from "./FloatingButtons";
import Home from "./pages/Home";
import InfoPage from "./pages/InfoPage";
import Navbar from "./pages/Nav";
import OurProjects from "./pages/Project";
import Admin from "./pages/Admin";
import LegalPortal from "./pages/LegalPortal";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("small-digital-theme") === "light"
        ? "light"
        : "dark";
    } catch (error) {
      console.warn("Unable to read the saved theme preference.", error);
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("small-digital-theme", theme);
    } catch (error) {
      console.warn("Unable to save the theme preference.", error);
    }
  }, [theme]);

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (window.location.pathname.replace(/\/+$/, "") === "/admin") {
    return <Admin />;
  }
  if (window.location.pathname.replace(/\/+$/, "") === "/legal") {
    return <LegalPortal />;
  }

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-cyan-400 selection:text-slate-950 ${
        theme === "light"
          ? "bg-slate-50 text-slate-900"
          : "bg-[#070a12] text-slate-100"
      }`}
    >
      <Navbar
        onNavigate={navigate}
        isLight={theme === "light"}
        onToggleTheme={() =>
          setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark")
        }
      />

      <main key={activePage} className="page-transition relative min-h-screen pt-20">
        {activePage === "home" && (
          <Home onNavigate={navigate} isLight={theme === "light"} />
        )}
        {["services", "blog", "training"].includes(activePage) && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <InfoPage page={activePage} />
          </div>
        )}
        {activePage === "about" && <AboutPage />}
        {activePage === "projects" && <OurProjects isLight={theme === "light"} />}
        {activePage === "careers" && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Careers />
          </div>
        )}
        {activePage === "contact" && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Contact />
          </div>
        )}
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
}

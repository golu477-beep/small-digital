
import { useState } from "react";

const palette = {
  ink: "#1A1F2B",
  navy: "#1B2A4A",
  cream: "#F7F4EE",
  marigold: "#D9822B",
  muted: "#5B6472",
  line: "#DEDACD",
};

const services = [
  {
    name: "Search visibility",
    detail:
      "Get found on Google when local customers search for what you sell — technical SEO, listings, and content that ranks.",
  },
  {
    name: "Social growth",
    detail:
      "Instagram, Facebook and WhatsApp content calendars built around your festivals, offers, and store moments.",
  },
  {
    name: "Performance ads",
    detail:
      "Google and Meta campaigns tuned for enquiries and orders, not just clicks — with weekly spend reviews.",
  },
  {
    name: "Website and storefront",
    detail:
      "Fast, mobile-first sites and catalog pages that turn visitors into calls, WhatsApp chats, or orders.",
  },
];

const process = [
  {
    step: "01",
    title: "Business audit",
    detail:
      "We study your customers, competitors, and current online presence before proposing anything.",
  },
  {
    step: "02",
    title: "90-day plan",
    detail:
      "A written roadmap with monthly goals, channels, and budget — no guesswork, no jargon.",
  },
  {
    step: "03",
    title: "Build and launch",
    detail:
      "Pages, campaigns, and content go live in phases so you see movement from week one.",
  },
  {
    step: "04",
    title: "Track and improve",
    detail:
      "Monthly reports in plain language, with changes made based on what's actually working.",
  },
];

const testimonials = [
  {
    quote:
      "They set up our Google listing properly for the first time in six years. Enquiries from nearby customers doubled within two months.",
    name: "Rekha Sinha",
    role: "Owner, Sinha Electronics, Patna",
  },
  {
    quote:
      "Our WhatsApp orders used to come only from regulars. Now half our new orders start from an Instagram post they ran for us.",
    name: "Manoj Kumar",
    role: "Founder, Kumar Sweets",
  },
  {
    quote:
      "Straightforward monthly reports, no confusing dashboards. We finally understand where our marketing money goes.",
    name: "Farah Ahmed",
    role: "Director, Ahmed Textiles",
  },
];

function Nav() {
  return (
    <header
      className="site-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 48px",
        borderBottom: "1px solid " + palette.line,
      }}
    >
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 22,
          color: palette.navy,
          fontWeight: 600,
        }}
      >
        Small-Digital
      </div>

      <nav
        className="site-nav"
        style={{
          display: "flex",
          gap: 32,
          fontSize: 15,
          color: palette.ink,
        }}
      >
        <a
          href="#services"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Services
        </a>

        <a
          href="#process"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          How we work
        </a>

        <a
          href="#stories"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Stories
        </a>

        <a
          href="#contact"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Contact
        </a>
      </nav>

      <a
        className="nav-cta"
        href="#contact"
        style={{
          background: palette.navy,
          color: "#fff",
          padding: "10px 20px",
          borderRadius: 3,
          fontSize: 14,
          textDecoration: "none",
        }}
      >
        Book a call
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 64,
        padding: "96px 48px 80px",
        alignItems: "center",
      }}
    >
      <div className="hero-copy">
        <p
          style={{
            color: palette.marigold,
            fontSize: 15,
            marginBottom: 18,
            letterSpacing: "0.02em",
          }}
        >
          Digital marketing for Indian businesses
        </p>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 52,
            lineHeight: 1.15,
            color: palette.navy,
            margin: "0 0 24px",
            maxWidth: 640,
          }}
        >
          Bring your dukaan and your business online, without the confusion.
        </h1>

        <p
          style={{
            fontSize: 17,
            color: palette.muted,
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          We help shop owners, manufacturers, and service businesses across
          India get found, get enquiries, and get orders online — explained in
          plain language, reported every month.
        </p>

        <div className="hero-actions" style={{ display: "flex", gap: 16 }}>
          <a
            href="#contact"
            style={{
              background: palette.marigold,
              color: "#fff",
              padding: "13px 26px",
              borderRadius: 3,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Get a free audit
          </a>

          <a
            href="#services"
            style={{
              border: "1px solid " + palette.line,
              color: palette.ink,
              padding: "13px 26px",
              borderRadius: 3,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            See what we do
          </a>
        </div>
      </div>

      <div
        className="stats-panel"
        style={{
          background: palette.navy,
          borderRadius: 4,
          padding: 32,
          color: "#fff",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "#BFC9DC",
            marginBottom: 20,
          }}
        >
          This quarter, across our clients
        </p>

        {[
          ["Average enquiry growth", "2.3x"],
          ["Cities served", "18"],
          ["Active client businesses", "64"],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "18px 0",
              borderTop: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: "#D8DEEA",
              }}
            >
              {label}
            </span>

            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 22,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="content-section services-section" id="services" style={{ padding: "40px 48px 96px" }}>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 30,
          color: palette.navy,
          marginBottom: 48,
        }}
      >
        What we handle for you
      </h2>

      <div className="services-list">
        {services.map((s, i) => (
          <div
            className="service-row"
            key={s.name}
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: 32,
              padding: "28px 0",
              borderTop: i === 0 ? "1px solid " + palette.line : "none",
              borderBottom: "1px solid " + palette.line,
            }}
          >
            <h3
              style={{
                fontSize: 19,
                color: palette.ink,
                margin: 0,
                fontWeight: 600,
              }}
            >
              {s.name}
            </h3>

            <p
              style={{
                fontSize: 15.5,
                color: palette.muted,
                margin: 0,
                lineHeight: 1.7,
                maxWidth: 560,
              }}
            >
              {s.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section
      className="content-section process-section"
      id="process"
      style={{
        padding: "40px 48px 96px",
        background: palette.cream,
      }}
    >
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 30,
          color: palette.navy,
          marginBottom: 48,
        }}
      >
        How an engagement runs
      </h2>

      <div
        className="process-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 28,
        }}
      >
        {process.map((p) => (
          <div key={p.step}>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 26,
                color: palette.marigold,
                marginBottom: 14,
              }}
            >
              {p.step}
            </div>

            <h3
              style={{
                fontSize: 17,
                color: palette.ink,
                margin: "0 0 10px",
              }}
            >
              {p.title}
            </h3>

            <p
              style={{
                fontSize: 14.5,
                color: palette.muted,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {p.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stories() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="content-section stories-section" id="stories" style={{ padding: "40px 48px 96px" }}>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 30,
          color: palette.navy,
          marginBottom: 40,
        }}
      >
        Business owners we work with
      </h2>

      <div className="story-copy" style={{ maxWidth: 640 }}>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 22,
            lineHeight: 1.6,
            color: palette.ink,
            marginBottom: 24,
          }}
        >
          "{t.quote}"
        </p>

        <p
          style={{
            fontSize: 15,
            color: palette.navy,
            fontWeight: 600,
            margin: 0,
          }}
        >
          {t.name}
        </p>

        <p
          style={{
            fontSize: 14,
            color: palette.muted,
            margin: "2px 0 24px",
          }}
        >
          {t.role}
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={"Show story " + (i + 1)}
              style={{
                width: 28,
                height: 3,
                border: "none",
                background:
                  i === active ? palette.marigold : palette.line,
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
  });

  // =========================================
  // ADMIN WHATSAPP NUMBER
  // Yahan apna WhatsApp number daalo
  // India ke liye: 91 + 10 digit number
  // Example: 919876543210
  // =========================================
  const adminWhatsApp = "917070414390";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hello Admin 👋

New Business Enquiry

👤 Name: ${formData.name}
🏢 Business: ${formData.business}
📱 Phone/WhatsApp: ${formData.phone}

Please contact this customer.`;

    const whatsappURL =
      `https://wa.me/${adminWhatsApp}?text=` +
      encodeURIComponent(message);

    // WhatsApp open hoga
    window.open(whatsappURL, "_blank");

    // Success message
    setSent(true);

    // Form clear
    setFormData({
      name: "",
      business: "",
      phone: "",
    });
  };

  return (
    <section
      className="contact-section"
      id="contact"
      style={{
        background: palette.navy,
        color: "#fff",
        padding: "80px 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
      }}
    >
      {/* LEFT SIDE */}
      <div className="contact-copy">
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 32,
            marginBottom: 18,
          }}
        >
          Tell us about your business
        </h2>

        <p
          style={{
            fontSize: 15.5,
            color: "#C7CEDD",
            lineHeight: 1.7,
            maxWidth: 380,
          }}
        >
          Share a few details and we'll come back with a free audit of your
          current online presence within two working days — no obligation.
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {sent ? (
          <div>
            <p style={{ fontSize: 16 }}>
              Thanks — we'll reach out shortly.
            </p>

            <p
              style={{
                fontSize: 14,
                color: "#C7CEDD",
                lineHeight: 1.6,
              }}
            >
              Your enquiry has been prepared for WhatsApp.
            </p>

            <button
              type="button"
              onClick={() => setSent(false)}
              style={{
                marginTop: 10,
                background: palette.marigold,
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <>
            {/* NAME */}
            <input
              required
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              style={{
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "#fff",
                borderRadius: 3,
                fontSize: 14,
                outline: "none",
              }}
            />

            {/* BUSINESS NAME */}
            <input
              required
              name="business"
              type="text"
              placeholder="Business name"
              value={formData.business}
              onChange={handleChange}
              style={{
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "#fff",
                borderRadius: 3,
                fontSize: 14,
                outline: "none",
              }}
            />

            {/* PHONE */}
            <input
              required
              name="phone"
              type="tel"
              placeholder="Phone or WhatsApp number"
              value={formData.phone}
              onChange={handleChange}
              style={{
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "#fff",
                borderRadius: 3,
                fontSize: 14,
                outline: "none",
              }}
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              style={{
                marginTop: 8,
                background: palette.marigold,
                color: "#fff",
                border: "none",
                padding: "13px 22px",
                borderRadius: 3,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Request free audit
            </button>
          </>
        )}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        padding: "28px 48px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        color: palette.muted,
      }}
    >
      <span>© {new Date().getFullYear()} Vistaar Digital</span>
      <span>Patna · Delhi · Bengaluru</span>
    </footer>
  );
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Work Sans', sans-serif",
        background: "#fff",
        color: palette.ink,
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Work+Sans:wght@400;500;600&display=swap"
      />

      <Nav />
      <Hero />
      <Services />
      <Process />
      <Stories />
      <Contact />
      <Footer />
    </div>
  );
}


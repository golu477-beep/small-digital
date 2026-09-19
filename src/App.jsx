// import React, { useState, useEffect } from "react";

// const palette = {
//   darkBg: "#0B0F17",
//   cardBg: "rgba(18, 24, 38, 0.7)",
//   cardBorder: "rgba(255, 255, 255, 0.08)",
//   brandViolet: "#7C3AED",
//   brandCyan: "#06B6D4",
//   brandRose: "#F43F5E",
//   marigold: "#F59E0B",
//   textPrimary: "#F8FAFC",
//   textMuted: "#94A3B8",
//   textSubtle: "#64748B",
//   glassGlow: "rgba(124, 58, 237, 0.15)",
// };

// // Global styles injected directly for responsive layout, custom scrollbar, and glassmorphism
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');

//   * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   html {
//     scroll-behavior: smooth;
//   }

//   body {
//     background-color: ${palette.darkBg};
//     color: ${palette.textPrimary};
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     overflow-x: hidden;
//   }

//   .font-heading {
//     font-family: 'Space Grotesk', sans-serif;
//   }

//   .glass-card {
//     background: ${palette.cardBg};
//     backdrop-filter: blur(16px);
//     -webkit-backdrop-filter: blur(16px);
//     border: 1px solid ${palette.cardBorder};
//     border-radius: 16px;
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .glass-card:hover {
//     border-color: rgba(124, 58, 237, 0.4);
//     transform: translateY(-4px);
//     box-shadow: 0 12px 30px -10px ${palette.glassGlow};
//   }

//   .gradient-text {
//     background: linear-gradient(135deg, #06B6D4 0%, #7C3AED 50%, #F43F5E 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }

//   .gradient-btn {
//     background: linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%);
//     color: #ffffff;
//     font-weight: 600;
//     border: none;
//     border-radius: 12px;
//     transition: all 0.3s ease;
//     cursor: pointer;
//   }

//   .gradient-btn:hover {
//     opacity: 0.92;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 25px -5px rgba(124, 58, 237, 0.4);
//   }

//   .input-field {
//     width: 100%;
//     padding: 14px 18px;
//     background: rgba(15, 23, 42, 0.8);
//     border: 1px solid rgba(255, 255, 255, 0.12);
//     border-radius: 12px;
//     color: #ffffff;
//     font-size: 15px;
//     outline: none;
//     transition: border-color 0.2s ease, box-shadow 0.2s ease;
//   }

//   .input-field:focus {
//     border-color: ${palette.brandViolet};
//     box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.25);
//   }

//   .input-field::placeholder {
//     color: ${palette.textSubtle};
//   }

//   /* Responsive Grid Adjustments */
//   @media (max-width: 900px) {
//     .hero-grid {
//       grid-template-columns: 1fr !important;
//       gap: 40px !important;
//     }
//     .contact-grid {
//       grid-template-columns: 1fr !important;
//       gap: 40px !important;
//     }
//     .service-row {
//       grid-template-columns: 1fr !important;
//       gap: 12px !important;
//     }
//     .process-grid {
//       grid-template-columns: 1fr 1fr !important;
//     }
//     .site-nav {
//       display: none !important;
//     }
//   }

//   @media (max-width: 600px) {
//     .process-grid {
//       grid-template-columns: 1fr !important;
//     }
//     .site-header {
//       padding: 16px 20px !important;
//     }
//     .section-padding {
//       padding: 60px 20px !important;
//     }
//   }
// `;

// const services = [
//   {
//     icon: "🔍",
//     name: "Search Visibility",
//     detail:
//       "Get found on Google when local customers search for what you sell — technical SEO, listings, and content that ranks top.",
//   },
//   {
//     icon: "🚀",
//     name: "Social Growth",
//     detail:
//       "Instagram, Facebook and WhatsApp content calendars built around your festivals, offers, and store moments.",
//   },
//   {
//     icon: "🎯",
//     name: "Performance Ads",
//     detail:
//       "Google and Meta campaigns tuned for enquiries and orders, not just clicks — with weekly spend reviews.",
//   },
//   {
//     icon: "💻",
//     name: "Website & Storefront",
//     detail:
//       "Fast, mobile-first sites and catalog pages that turn visitors into calls, WhatsApp chats, or orders.",
//   },
// ];

// const process = [
//   {
//     step: "01",
//     title: "Business Audit",
//     detail:
//       "We study your customers, competitors, and current online presence before proposing anything.",
//   },
//   {
//     step: "02",
//     title: "90-Day Plan",
//     detail:
//       "A written roadmap with monthly goals, channels, and budget — no guesswork, no jargon.",
//   },
//   {
//     step: "03",
//     title: "Build & Launch",
//     detail:
//       "Pages, campaigns, and content go live in phases so you see movement from week one.",
//   },
//   {
//     step: "04",
//     title: "Track & Improve",
//     detail:
//       "Monthly reports in plain language, with changes made based on what's actually working.",
//   },
// ];

// const testimonials = [
//   {
//     quote:
//       "They set up our Google listing properly for the first time in six years. Enquiries from nearby customers doubled within two months.",
//     name: "Rekha Sinha",
//     role: "Owner, Sinha Electronics, Patna",
//   },
//   {
//     quote:
//       "Our WhatsApp orders used to come only from regulars. Now half our new orders start from an Instagram post they ran for us.",
//     name: "Manoj Kumar",
//     role: "Founder, Kumar Sweets",
//   },
//   {
//     quote:
//       "Straightforward monthly reports, no confusing dashboards. We finally understand where our marketing money goes.",
//     name: "Farah Ahmed",
//     role: "Director, Ahmed Textiles",
//   },
// ];

// function Nav() {
//   return (
//     <header
//       className="site-header"
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "20px 48px",
//         position: "sticky",
//         top: 0,
//         zIndex: 50,
//         background: "rgba(11, 15, 23, 0.8)",
//         backdropFilter: "blur(12px)",
//         borderBottom: `1px solid ${palette.cardBorder}`,
//       }}
//     >
//       <div
//         className="font-heading"
//         style={{
//           fontSize: 22,
//           fontWeight: 700,
//           letterSpacing: "-0.5px",
//           display: "flex",
//           alignItems: "center",
//           gap: 10,
//         }}
//       >
//         <div
//           style={{
//             width: 32,
//             height: 32,
//             borderRadius: 8,
//             background: "linear-gradient(135deg, #06B6D4, #7C3AED)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontWeight: 800,
//             fontSize: 16,
//             color: "#fff",
//           }}
//         >
//           S
//         </div>
//         <span>
//           Small<span style={{ color: palette.brandCyan }}>Digital</span>
//         </span>
//       </div>

//       <nav
//         className="site-nav"
//         style={{
//           display: "flex",
//           gap: 36,
//           fontSize: 14,
//           fontWeight: 500,
//         }}
//       >
//         <a href="#services" style={{ color: palette.textMuted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = palette.textMuted}>
//           Services
//         </a>
//         <a href="#process" style={{ color: palette.textMuted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = palette.textMuted}>
//           How We Work
//         </a>
//         <a href="#stories" style={{ color: palette.textMuted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = palette.textMuted}>
//           Stories
//         </a>
//         <a href="#contact" style={{ color: palette.textMuted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = palette.textMuted}>
//           Contact
//         </a>
//       </nav>

//       <a
//         className="gradient-btn"
//         href="#contact"
//         style={{
//           padding: "10px 22px",
//           fontSize: 14,
//           textDecoration: "none",
//           display: "inline-block",
//         }}
//       >
//         Book a Call
//       </a>
//     </header>
//   );
// }

// function Hero() {
//   return (
//     <section
//       className="section-padding"
//       style={{
//         position: "relative",
//         padding: "100px 48px 80px",
//         overflow: "hidden",
//       }}
//     >
//       {/* Glow Effects Background */}
//       <div
//         style={{
//           position: "absolute",
//           top: "-10%",
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "600px",
//           height: "400px",
//           background: "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(6, 182, 212, 0.05) 60%, transparent 80%)",
//           filter: "blur(80px)",
//           pointerEvents: "none",
//           zIndex: 0,
//         }}
//       />

//       <div
//         className="hero-grid"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1.1fr 0.9fr",
//           gap: 64,
//           alignItems: "center",
//           maxWidth: 1200,
//           margin: "0 auto",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <div>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "6px 16px",
//               borderRadius: 30,
//               background: "rgba(124, 58, 237, 0.12)",
//               border: "1px solid rgba(124, 58, 237, 0.3)",
//               fontSize: 13,
//               fontWeight: 600,
//               color: palette.brandCyan,
//               marginBottom: 24,
//             }}
//           >
//             <span style={{ width: 8, height: 8, borderRadius: "50%", background: palette.brandCyan }}></span>
//             Digital Marketing For Indian Businesses
//           </div>

//           <h1
//             className="font-heading"
//             style={{
//               fontSize: "clamp(36px, 5vw, 56px)",
//               lineHeight: 1.15,
//               fontWeight: 700,
//               margin: "0 0 24px",
//               letterSpacing: "-1px",
//             }}
//           >
//             Bring your <span className="gradient-text">dukaan</span> and business online, without confusion.
//           </h1>

//           <p
//             style={{
//               fontSize: 17,
//               color: palette.textMuted,
//               lineHeight: 1.7,
//               marginBottom: 40,
//               maxWidth: 520,
//             }}
//           >
//             We help shop owners, manufacturers, and service businesses across India get found, get enquiries, and scale orders online — with plain language monthly reporting.
//           </p>

//           <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//             <a
//               className="gradient-btn"
//               href="#contact"
//               style={{
//                 padding: "14px 28px",
//                 fontSize: 15,
//                 textDecoration: "none",
//               }}
//             >
//               Get Free Audit
//             </a>

//             <a
//               href="#services"
//               style={{
//                 background: "rgba(255, 255, 255, 0.05)",
//                 border: `1px solid ${palette.cardBorder}`,
//                 color: palette.textPrimary,
//                 padding: "14px 28px",
//                 borderRadius: 12,
//                 textDecoration: "none",
//                 fontSize: 15,
//                 fontWeight: 600,
//                 transition: "all 0.2s ease",
//               }}
//             >
//               See What We Do
//             </a>
//           </div>
//         </div>

//         {/* Floating Stats Widget */}
//         <div
//           className="glass-card"
//           style={{
//             padding: 36,
//             boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
//             position: "relative",
//           }}
//         >
//           <div
//             style={{
//               fontSize: 12,
//               fontWeight: 700,
//               letterSpacing: "1px",
//               color: palette.brandCyan,
//               textTransform: "uppercase",
//               marginBottom: 24,
//             }}
//           >
//             ⚡ Live Client Overview
//           </div>

//           {[
//             ["Average enquiry growth", "2.3x", "📈"],
//             ["Cities served in India", "18+", "📍"],
//             ["Active business partners", "64", "🤝"],
//           ].map(([label, value, emoji], idx) => (
//             <div
//               key={label}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "18px 0",
//                 borderTop: idx === 0 ? "none" : `1px solid ${palette.cardBorder}`,
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                 <span style={{ fontSize: 20 }}>{emoji}</span>
//                 <span style={{ fontSize: 14, color: palette.textMuted, fontWeight: 500 }}>{label}</span>
//               </div>
//               <span className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: palette.textPrimary }}>
//                 {value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Services() {
//   return (
//     <section className="section-padding" id="services" style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
//       <div style={{ textAlign: "center", marginBottom: 60 }}>
//         <h2 className="font-heading" style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
//           What We Handle For You
//         </h2>
//         <p style={{ color: palette.textMuted, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
//           End-to-end digital growth strategies designed to bring measurable results to your doorstep.
//         </p>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
//         {services.map((s) => (
//           <div className="glass-card" key={s.name} style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
//             <div
//               style={{
//                 width: 50,
//                 height: 50,
//                 borderRadius: 12,
//                 background: "rgba(124, 58, 237, 0.15)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 24,
//               }}
//             >
//               {s.icon}
//             </div>
//             <h3 className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary }}>
//               {s.name}
//             </h3>
//             <p style={{ fontSize: 14.5, color: palette.textMuted, lineHeight: 1.6 }}>
//               {s.detail}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function Process() {
//   return (
//     <section
//       className="section-padding"
//       id="process"
//       style={{
//         padding: "90px 48px",
//         background: "rgba(18, 24, 38, 0.4)",
//         borderTop: `1px solid ${palette.cardBorder}`,
//         borderBottom: `1px solid ${palette.cardBorder}`,
//       }}
//     >
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <div style={{ marginBottom: 60 }}>
//           <span style={{ color: palette.brandCyan, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
//             Step-By-Step
//           </span>
//           <h2 className="font-heading" style={{ fontSize: 36, fontWeight: 700, marginTop: 8 }}>
//             How An Engagement Runs
//           </h2>
//         </div>

//         <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
//           {process.map((p) => (
//             <div className="glass-card" key={p.step} style={{ padding: 28, position: "relative" }}>
//               <div
//                 className="font-heading"
//                 style={{
//                   fontSize: 32,
//                   fontWeight: 800,
//                   color: palette.brandViolet,
//                   marginBottom: 16,
//                   opacity: 0.8,
//                 }}
//               >
//                 {p.step}
//               </div>
//               <h3 className="font-heading" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: palette.textPrimary }}>
//                 {p.title}
//               </h3>
//               <p style={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.6 }}>
//                 {p.detail}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Stories() {
//   const [active, setActive] = useState(0);
//   const t = testimonials[active];

//   return (
//     <section className="section-padding" id="stories" style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
//       <div style={{ textAlign: "center", marginBottom: 50 }}>
//         <span style={{ color: palette.brandViolet, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
//           Success Stories
//         </span>
//         <h2 className="font-heading" style={{ fontSize: 36, fontWeight: 700, marginTop: 8 }}>
//           Business Owners We Partner With
//         </h2>
//       </div>

//       <div
//         className="glass-card"
//         style={{
//           maxWidth: 800,
//           margin: "0 auto",
//           padding: "48px 40px",
//           textAlign: "center",
//           position: "relative",
//         }}
//       >
//         <p
//           className="font-heading"
//           style={{
//             fontSize: "clamp(18px, 2.5vw, 24px)",
//             lineHeight: 1.6,
//             color: palette.textPrimary,
//             marginBottom: 32,
//             fontWeight: 500,
//           }}
//         >
//           "{t.quote}"
//         </p>

//         <div>
//           <p style={{ fontSize: 16, fontWeight: 700, color: palette.brandCyan, margin: 0 }}>
//             {t.name}
//           </p>
//           <p style={{ fontSize: 14, color: palette.textSubtle, marginTop: 4 }}>
//             {t.role}
//           </p>
//         </div>

//         <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 32 }}>
//           {testimonials.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActive(i)}
//               aria-label={"Show story " + (i + 1)}
//               style={{
//                 width: i === active ? 32 : 12,
//                 height: 6,
//                 borderRadius: 3,
//                 border: "none",
//                 background: i === active ? palette.brandViolet : "rgba(255,255,255,0.2)",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Contact() {
//   const [sent, setSent] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     business: "",
//     phone: "",
//   });

//   const adminWhatsApp = "917070414390";

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const message = `Hello Admin 👋\n\nNew Business Enquiry\n\n👤 Name: ${formData.name}\n🏢 Business: ${formData.business}\n📱 Phone/WhatsApp: ${formData.phone}\n\nPlease contact this customer.`;

//     const whatsappURL = `https://wa.me/${adminWhatsApp}?text=` + encodeURIComponent(message);
//     window.open(whatsappURL, "_blank");

//     setSent(true);
//     setFormData({ name: "", business: "", phone: "" });
//   };

//   return (
//     <section
//       className="section-padding"
//       id="contact"
//       style={{
//         padding: "100px 48px",
//         background: "radial-gradient(ellipse at bottom, rgba(124, 58, 237, 0.15), transparent 70%)",
//         borderTop: `1px solid ${palette.cardBorder}`,
//       }}
//     >
//       <div
//         className="contact-grid"
//         style={{
//           maxWidth: 1100,
//           margin: "0 auto",
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: 64,
//           alignItems: "center",
//         }}
//       >
//         <div>
//           <span style={{ color: palette.brandCyan, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
//             Let's Talk Growth
//           </span>
//           <h2 className="font-heading" style={{ fontSize: 38, fontWeight: 700, margin: "12px 0 20px" }}>
//             Tell Us About Your Business
//           </h2>
//           <p style={{ fontSize: 16, color: palette.textMuted, lineHeight: 1.7, maxWidth: 440 }}>
//             Share a few details and we'll come back with a free audit of your current online presence within two working days — no obligation.
//           </p>
//         </div>

//         <div className="glass-card" style={{ padding: 36 }}>
//           {sent ? (
//             <div style={{ textAlign: "center", padding: "20px 0" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
//               <h3 className="font-heading" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
//                 Thanks — Request Prepared!
//               </h3>
//               <p style={{ fontSize: 14, color: palette.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
//                 Your enquiry has been formatted and opened directly in WhatsApp.
//               </p>
//               <button
//                 type="button"
//                 className="gradient-btn"
//                 onClick={() => setSent(false)}
//                 style={{ padding: "12px 24px", fontSize: 14 }}
//               >
//                 Submit Another Enquiry
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//               <div>
//                 <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: palette.textMuted, marginBottom: 8 }}>
//                   Your Full Name *
//                 </label>
//                 <input
//                   required
//                   name="name"
//                   type="text"
//                   placeholder="e.g. Ramesh Kumar"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: palette.textMuted, marginBottom: 8 }}>
//                   Business Name *
//                 </label>
//                 <input
//                   required
//                   name="business"
//                   type="text"
//                   placeholder="e.g. Kumar Electronics"
//                   value={formData.business}
//                   onChange={handleChange}
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: palette.textMuted, marginBottom: 8 }}>
//                   Phone / WhatsApp Number *
//                 </label>
//                 <input
//                   required
//                   name="phone"
//                   type="tel"
//                   placeholder="+91 98765 43210"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="input-field"
//                 />
//               </div>

//               <button type="submit" className="gradient-btn" style={{ padding: "16px", fontSize: 15, marginTop: 10 }}>
//                 Request Free Audit →
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Footer() {
//   return (
//     <footer
//       style={{
//         padding: "32px 48px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         fontSize: 14,
//         color: palette.textSubtle,
//         borderTop: `1px solid ${palette.cardBorder}`,
//         background: palette.darkBg,
//         flexWrap: "wrap",
//         gap: 16,
//       }}
//     >
//       <span>© {new Date().getFullYear()} SmallDigital Technologies. All rights reserved.</span>
//       <span>Patna · Delhi · Bengaluru</span>
//     </footer>
//   );
// }

// export default function App() {
//   useEffect(() => {
//     // Inject custom global stylesheet
//     const styleTag = document.createElement("style");
//     styleTag.innerHTML = globalStyles;
//     document.head.appendChild(styleTag);

//     return () => {
//       document.head.removeChild(styleTag);
//     };
//   }, []);

//   return (
//     <div style={{ background: palette.darkBg, color: palette.textPrimary, minHeight: "100vh" }}>
//       <Nav />
//       <Hero />
//       <Services />
//       <Process />
//       <Stories />
//       <Contact />
//       <Footer />
//     </div>
//   );
// }

import { useState } from "react";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Navbar from "./pages/Nav";
import InfoPage from "./pages/InfoPage";
import Footer from "./pages/Footer";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar onNavigate={setActivePage} />

      <div className="relative max-w-6xl mx-auto px-4 pt-24">

  
        <main className="py-6">
          {activePage === "home" && <Home onNavigate={(page) => setActivePage(page)} />}
          {["about", "services", "projects", "blog", "training"].includes(activePage) && (
            <InfoPage page={activePage} />
          )}
          {activePage === "careers" && <Careers />}
          {activePage === "contact" && <Contact />}
        </main>

        <Footer />
        <footer className="py-8 text-center border-t border-slate-800/80 text-slate-500 text-xs">
          © {new Date().getFullYear()} Small-Digital. Patna · Delhi · Bengaluru
        </footer>
      </div>
    </div>
  );
}
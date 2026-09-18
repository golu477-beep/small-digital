const pageContent = {
  about: {
    eyebrow: "ABOUT SMALLDIGITAL",
    title: "Digital work that moves Indian businesses forward.",
    description: "We help ambitious businesses build a sharper online presence with strategy, design, technology, and measurable growth.",
    points: ["Clear strategy before execution", "Design made for real customers", "Practical support after launch"],
  },
  services: {
    eyebrow: "OUR SERVICES",
    title: "Everything you need to grow online.",
    description: "From your first website to an automated cloud workflow, our team brings the right digital specialists together for your next stage.",
    points: ["Websites and e-commerce", "Mobile apps and custom software", "Cloud, automation, and AI solutions"],
  },
  projects: {
    eyebrow: "SELECTED PROJECTS",
    title: "Work built around outcomes, not just appearances.",
    description: "We partner closely with teams to solve the right problem and deliver digital products people can actually use.",
    points: ["Conversion-focused websites", "Reliable internal tools", "Scalable product foundations"],
  },
  blog: {
    eyebrow: "FROM THE BLOG",
    title: "Useful ideas for building better digital products.",
    description: "Short, practical notes on websites, growth, technology, and the decisions that make digital work more effective.",
    points: ["Product and UX thinking", "Marketing lessons for growing teams", "Technology explained simply"],
  },
  training: {
    eyebrow: "TRAINING",
    title: "Build digital confidence inside your team.",
    description: "Hands-on sessions help your people understand the tools, workflows, and skills that keep your business moving.",
    points: ["Frontend and full-stack foundations", "Digital marketing workshops", "Team-specific learning plans"],
  },
};

export default function InfoPage({ page }) {
  const content = pageContent[page] || pageContent.about;

  return (
    <section className="py-12 md:py-20 max-w-4xl mx-auto">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
        {content.eyebrow}
      </span>
      <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight text-white">
        {content.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
        {content.description}
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {content.points.map((point) => (
          <div key={point} className="border border-slate-800 bg-slate-900/70 rounded-xl p-5 text-slate-200">
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}

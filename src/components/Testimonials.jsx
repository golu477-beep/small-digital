import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { defaultTestimonials } from '../data/testimonials.js';

export default function Testimonials({ isLight }) {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const testimonialCount = testimonials.length;

  useEffect(() => {
    let active = true;
    fetch('/api/testimonials')
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load testimonials.");
        if (!Array.isArray(result.testimonials)) throw new Error("Testimonial response was invalid.");
        if (active) {
          setTestimonials(result.testimonials);
          setActiveIndex(0);
        }
      })
      .catch((error) => {
        console.warn("Unable to load managed testimonials; showing built-in testimonials.", error);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (
      isPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      testimonialCount < 2
    ) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonialCount);
    }, 6500);
    return () => window.clearInterval(intervalId);
  }, [isPaused, testimonialCount]);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  };
  const showNext = () => {
    setActiveIndex((index) => (index + 1) % testimonials.length);
  };
  const testimonial = testimonials[activeIndex];

  return (
    <section className={`testimonial-section py-16 ${
      isLight ? "testimonial-light" : "testimonial-dark"
    }`}>
      <div className="mx-auto max-w-4xl px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Client stories
        </span>
        <h2 className="mt-2 text-3xl font-bold">What clients say</h2>
        <p className="mt-2 text-sm text-slate-500">A few words from our client feedback</p>

        {testimonial ? (
          <div
            className="testimonial-carousel mt-9"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
            }}
          >
            <article
              key={activeIndex}
              className="testimonial-card"
              aria-live="polite"
              aria-atomic="true"
            >
              <Quote className="testimonial-quote-icon" aria-hidden="true" />
              {Number.isInteger(testimonial.rating) && (
                <div className="testimonial-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }, (_, index) => (
                    <Star key={index} className="h-4 w-4" aria-hidden="true" />
                  ))}
                </div>
              )}
              <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial-attribution">
                <span className="testimonial-brand" aria-label={`${testimonial.company} wordmark`}>
                  {testimonial.company}
                </span>
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </article>

            <div className="testimonial-controls">
              <button type="button" onClick={showPrevious} aria-label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="testimonial-dots" aria-label="Choose a testimonial">
                {testimonials.map((item, index) => (
                  <button
                    type="button"
                    key={item.name}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              <button type="button" onClick={showNext} aria-label="Next testimonial">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-9 text-sm text-slate-500">No client stories are available right now.</p>
        )}
      </div>
    </section>
  );
}
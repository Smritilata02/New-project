import React, { useRef, useState, useEffect } from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_WIDTH = 550;
  const GAP = 40;
  const SCROLL_STEP = (CARD_WIDTH + GAP) * 2;

  const testimonials = [
    {
      name: "Annie Pei",
      company: "Nomina",
      quote:
        "Thoughtshop is the best team I've ever worked with. The team brings a rare balance of sharp creative thinking, operational rigor, and skillful stakeholder management."
    },
    {
      name: "Bryan Harper",
      company: "Minnesota Vikings",
      quote:
        "Thoughtshop sparked a trail of thought we had not explored, clarifying how our vision could translate into more ambitious, bold moves."
    },
    {
      name: "Sarah Collins",
      company: "Dropbox",
      quote: "They helped us clarify our brand with confidence and precision."
    },
    {
      name: "Michael Tan",
      company: "Spotify",
      quote: "Strategic, creative, and deeply thoughtful throughout the process."
    },
    {
      name: "Emily Rose",
      company: "Airbnb",
      quote: "Thoughtshop helped us unlock a new level of storytelling."
    }
  ];

  const updateArrows = () => {
    const el = sliderRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 5
    );
  };

  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "right" ? SCROLL_STEP : -SCROLL_STEP,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    updateArrows();
  }, []);

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">PRAISE FROM CLIENTS</h2>

      <div className="slider-wrapper">
        <div className="slider-viewport">
          <div
            ref={sliderRef}
            onScroll={updateArrows}
            className="slider no-scrollbar"
          >
            {testimonials.map((item, i) => (
              <div className="testimonial-card" key={i}>
                <div className="card-header">
                  <p className="name">{item.name}</p>
                  <p className="company">{item.company}</p>
                </div>
                <p className="quote">{item.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {canScrollLeft && (
          <button
            className="arrow left"
            onClick={() => scroll("left")}
          >
            ←
          </button>
        )}

        {canScrollRight && (
          <button
            className="arrow right"
            onClick={() => scroll("right")}
          >
            →
          </button>
        )}
      </div>
    </section>
  );
}

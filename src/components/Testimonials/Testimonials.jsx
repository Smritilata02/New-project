import { useEffect, useRef, useState } from "react"
import "./Testimonials.css"

export default function Testimonials() {
  const [page, setPage] = useState(0)

  const cursorRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

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
      name: "Michael Tan",
      company: "Spotify",
      quote:
        "Strategic, creative, and deeply thoughtful throughout the process."
    },
    {
      name: "Emily Rose",
      company: "Airbnb",
      quote:
        "Thoughtshop helped us unlock a new level of storytelling."
    },
    {
      name: "Sarah Collins",
      company: "Dropbox",
      quote:
        "They helped us clarify our brand with confidence and precision."
    },
    {
      name: "Sarah Collins",
      company: "Dropbox",
      quote:
        "They helped us clarify our brand with confidence and precision."
    }
  ]

  const totalPages = Math.ceil(testimonials.length / 2)

  const visibleItems = testimonials.slice(page * 2, page * 2 + 2)

  // 🔵 Cursor animation
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const speed = 0.15

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed
      pos.current.y += (mouse.current.y - pos.current.y) * speed
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      requestAnimationFrame(animate)
    }

    animate()

    const move = (e) => {
      mouse.current.x = e.clientX - 55
      mouse.current.y = e.clientY - 55
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">PRAISE FROM CLIEN<img src="src/assets/T.png" alt="T" className="logo-t" />S</h2>

      <div className="testimonials-stage">
        {visibleItems.map((item, i) => (
          <div className="testimonial-card" key={i}>
            <div className="card-header">
              <p className="name">{item.name}</p>
              <p className="company">{item.company}</p>
            </div>
            <p className="quote">{item.quote}</p>
          </div>
        ))}
      </div>

      {/* ⬅️➡️ Arrows */}
      {page > 0 && (
        <button
          className="arrow left"
          onClick={() => setPage(page - 1)}
        >
          ←
        </button>
      )}

      {page < totalPages - 1 && (
        <button
          className="arrow right"
          onClick={() => setPage(page + 1)}
        >
          →
        </button>
      )}

      {/* ⚪ Hover Cursor */}
      <div ref={cursorRef} className="testimonial-cursor">→</div>
    </section>
  )
}

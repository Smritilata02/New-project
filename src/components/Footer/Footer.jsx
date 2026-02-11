import React, { useState, useCallback, useEffect, useRef } from "react";

/* ================= ICONS ================= */
const Icons = {
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Loader: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
    </svg>
  )
};

/* ================= SCROLL ANIMATION HOOK ================= */
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight + 500) { setIsVisible(true); return true; }
      return false;
    };
    if (checkVisibility()) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { if (checkVisibility()) window.removeEventListener('scroll', onScroll); ticking = false; });
        ticking = true;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); window.removeEventListener('scroll', onScroll); }
    }, { threshold: 0, rootMargin: '500px 0px 500px 0px' });
    observer.observe(element);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
  return [ref, isVisible];
};

/* ================= POP ITEM ================= */
const PopItem = ({ children, delay = 0, className = '', type = 'pop' }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`pop-animate ${type} ${isVisible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* ================= SMOOTH SCROLL ================= */
const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ================= INTERACTIVE GRADIENT BLOBS ================= */
const InteractiveGradients = () => {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef();
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });
  const blobs = [
    { id: 'yellow-1', color: 'yellow', size: 500, speed: 0.08, offset: { x: 0, y: 0 }, intensity: 1 },
    { id: 'yellow-2', color: 'yellow', size: 350, speed: 0.05, offset: { x: 200, y: 100 }, intensity: 0.7 },
    { id: 'violet-1', color: 'violet', size: 450, speed: 0.06, offset: { x: -100, y: -50 }, intensity: 0.9 },
    { id: 'violet-2', color: 'violet', size: 300, speed: 0.1, offset: { x: 100, y: -150 }, intensity: 0.6 },
    { id: 'grey-1', color: 'grey', size: 400, speed: 0.04, offset: { x: 50, y: 50 }, intensity: 0.8 },
    { id: 'grey-2', color: 'grey', size: 280, speed: 0.09, offset: { x: -100, y: -100 }, intensity: 0.5 },
  ];
  useEffect(() => {
    const handleMouseMove = (e) => { if (containerRef.current) { const rect = containerRef.current.getBoundingClientRect(); targetRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }; } };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => { setIsHovering(false); targetRef.current = { x: 0.5, y: 0.5 }; };
    const container = containerRef.current;
    if (container) { container.addEventListener('mousemove', handleMouseMove); container.addEventListener('mouseenter', handleMouseEnter); container.addEventListener('mouseleave', handleMouseLeave); }
    const animate = () => { const lerp = (s, e, f) => s + (e - s) * f; currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.05); currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.05); setMouse({ ...currentRef.current }); animationRef.current = requestAnimationFrame(animate); };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (container) { container.removeEventListener('mousemove', handleMouseMove); container.removeEventListener('mouseenter', handleMouseEnter); container.removeEventListener('mouseleave', handleMouseLeave); } if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);
  const getBlobStyle = (blob, index) => {
    const baseX = 50 + blob.offset.x / 10; const baseY = 50 + blob.offset.y / 10;
    const moveX = (mouse.x - 0.5) * 100 * blob.speed * blob.intensity * 3; const moveY = (mouse.y - 0.5) * 100 * blob.speed * blob.intensity * 3;
    const time = Date.now() / 1000; const waveX = Math.sin(time * 0.5 + index) * 20 * blob.intensity; const waveY = Math.cos(time * 0.3 + index * 0.7) * 20 * blob.intensity;
    return { left: `calc(${baseX}% + ${moveX + waveX}px)`, top: `calc(${baseY}% + ${moveY + waveY}px)`, width: blob.size, height: blob.size, transform: `translate(-50%, -50%) scale(${isHovering ? 1 + blob.intensity * 0.2 : 1})`, opacity: isHovering ? 0.6 + blob.intensity * 0.15 : 0.4 };
  };
  return (
    <div className="interactive-gradients" ref={containerRef} aria-hidden="true">
      {blobs.map((blob, index) => (<div key={blob.id} className={`interactive-blob blob-${blob.color}`} style={getBlobStyle(blob, index)} />))}
      <div className="cursor-glow" style={{ left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%`, opacity: isHovering ? 0.8 : 0 }} />
    </div>
  );
};

/* ================= GRADIENT BACKGROUND ================= */
const GradientBackground = () => (
  <div className="gradient-bg" aria-hidden="true">
    <div className="base-gradient" /><div className="gradient-orb orb-yellow-1" /><div className="gradient-orb orb-yellow-2" /><div className="gradient-orb orb-purple-1" /><div className="gradient-orb orb-purple-2" /><div className="gradient-orb orb-grey-1" /><div className="mesh-gradient" /><div className="noise-texture" /><div className="vignette" />
  </div>
);

/* ================= ANIMATED BACKGROUND SHAPES ================= */
const AnimatedShapes = () => (
  <div className="animated-shapes" aria-hidden="true">
    <svg className="shape-layer floating-shapes" viewBox="0 0 1000 800">
      <polygon points="100,50 130,65 130,95 100,110 70,95 70,65" className="float-hex fh-1"/><polygon points="850,120 880,135 880,165 850,180 820,165 820,135" className="float-hex fh-2"/><polygon points="200,650 230,665 230,695 200,710 170,695 170,665" className="float-hex fh-3"/><polygon points="750,550 780,565 780,595 750,610 720,595 720,565" className="float-hex fh-4"/>
      <circle cx="150" cy="300" r="25" className="float-circle fc-1"/><circle cx="900" cy="400" r="18" className="float-circle fc-2"/><circle cx="50" cy="600" r="30" className="float-circle fc-3"/><circle cx="800" cy="700" r="22" className="float-circle fc-4"/>
      <polygon points="500,80 530,130 470,130" className="float-tri ft-1"/><polygon points="950,300 980,350 920,350" className="float-tri ft-2"/><polygon points="80,450 110,500 50,500" className="float-tri ft-3"/>
      <rect x="600" y="150" width="40" height="40" className="float-square fs-1"/><rect x="300" y="500" width="35" height="35" className="float-square fs-2"/>
      <rect x="700" y="380" width="30" height="30" className="float-diamond fd-1"/><rect x="180" y="200" width="25" height="25" className="float-diamond fd-2"/>
    </svg>
    <svg className="shape-layer morph-blob-layer" viewBox="0 0 400 400">
      <defs><linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1"/><stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.08"/><stop offset="100%" stopColor="#6b7280" stopOpacity="0.05"/></linearGradient></defs>
      <path className="morph-blob" fill="url(#morphGrad)"><animate attributeName="d" dur="25s" repeatCount="indefinite" values="M200,50 C280,50 350,120 350,200 C350,280 280,350 200,350 C120,350 50,280 50,200 C50,120 120,50 200,50;M200,80 C260,40 380,100 360,180 C380,280 300,380 200,360 C100,380 30,280 50,180 C20,100 140,40 200,80;M180,50 C300,30 370,140 340,220 C370,320 260,370 180,350 C80,370 20,280 60,180 C20,80 100,30 180,50;M200,50 C280,50 350,120 350,200 C350,280 280,350 200,350 C120,350 50,280 50,200 C50,120 120,50 200,50"/></path>
    </svg>
    <svg className="shape-layer rotating-rings" viewBox="0 0 300 300">
      <circle cx="150" cy="150" r="120" className="ring ring-1"/><circle cx="150" cy="150" r="100" className="ring ring-2"/><circle cx="150" cy="150" r="80" className="ring ring-3"/><circle cx="150" cy="150" r="60" className="ring ring-4"/><circle cx="150" cy="150" r="8" className="ring-center"/><circle cx="270" cy="150" r="4" className="ring-dot rd-1"/><circle cx="250" cy="150" r="3" className="ring-dot rd-2"/><circle cx="230" cy="150" r="3" className="ring-dot rd-3"/>
    </svg>
    <svg className="shape-layer pulse-circles" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="20" className="pulse-circle pc-1"/><circle cx="100" cy="100" r="40" className="pulse-circle pc-2"/><circle cx="100" cy="100" r="60" className="pulse-circle pc-3"/><circle cx="100" cy="100" r="80" className="pulse-circle pc-4"/><circle cx="100" cy="100" r="6" className="pulse-center"/>
    </svg>
    <svg className="shape-layer constellation-net" viewBox="0 0 600 500">
      <circle cx="100" cy="80" r="3" className="const-star cs-1"/><circle cx="180" cy="120" r="4" className="const-star cs-2"/><circle cx="250" cy="60" r="3" className="const-star cs-3"/><circle cx="350" cy="100" r="5" className="const-star cs-4"/><circle cx="450" cy="70" r="3" className="const-star cs-5"/><circle cx="520" cy="130" r="4" className="const-star cs-6"/><circle cx="80" cy="200" r="4" className="const-star cs-7"/><circle cx="200" cy="250" r="3" className="const-star cs-8"/><circle cx="400" cy="220" r="4" className="const-star cs-9"/><circle cx="550" cy="280" r="3" className="const-star cs-10"/><circle cx="150" cy="380" r="5" className="const-star cs-11"/><circle cx="300" cy="400" r="3" className="const-star cs-12"/><circle cx="480" cy="420" r="4" className="const-star cs-13"/>
      <line x1="100" y1="80" x2="180" y2="120" className="const-line cl-1"/><line x1="180" y1="120" x2="250" y2="60" className="const-line cl-2"/><line x1="250" y1="60" x2="350" y2="100" className="const-line cl-3"/><line x1="350" y1="100" x2="450" y2="70" className="const-line cl-4"/><line x1="450" y1="70" x2="520" y2="130" className="const-line cl-5"/><line x1="80" y1="200" x2="200" y2="250" className="const-line cl-6"/><line x1="200" y1="250" x2="400" y2="220" className="const-line cl-7"/><line x1="400" y1="220" x2="550" y2="280" className="const-line cl-8"/><line x1="150" y1="380" x2="300" y2="400" className="const-line cl-9"/><line x1="300" y1="400" x2="480" y2="420" className="const-line cl-10"/><line x1="180" y1="120" x2="80" y2="200" className="const-line cl-11"/><line x1="350" y1="100" x2="400" y2="220" className="const-line cl-12"/><line x1="200" y1="250" x2="150" y2="380" className="const-line cl-13"/>
      <circle r="2.5" fill="#fbbf24" opacity="0.9" className="travel-particle"><animateMotion dur="8s" repeatCount="indefinite" path="M100,80 L180,120 L250,60 L350,100 L450,70 L520,130 L400,220 L200,250 L80,200 L100,80"/></circle>
    </svg>
    <svg className="shape-layer dot-grid" viewBox="0 0 400 400">
      {[...Array(8)].map((_, row) => ([...Array(8)].map((_, col) => (<circle key={`grid-${row}-${col}`} cx={25 + col * 50} cy={25 + row * 50} r="2" className={`grid-dot gd-${(row + col) % 4}`}/>))))}
    </svg>
    <div className="particle-container">
      {[...Array(15)].map((_, i) => (<div key={`particle-${i}`} className={`floating-particle-div fp-div-${i % 5}`} style={{ left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${10 + Math.random() * 15}s` }}/>))}
    </div>
    <svg className="shape-layer cube-wireframe" viewBox="0 0 200 200">
      <rect x="50" y="50" width="60" height="60" className="cube-face cf-front"/><rect x="70" y="30" width="60" height="60" className="cube-face cf-back"/>
      <line x1="50" y1="50" x2="70" y2="30" className="cube-edge"/><line x1="110" y1="50" x2="130" y2="30" className="cube-edge"/><line x1="50" y1="110" x2="70" y2="90" className="cube-edge"/><line x1="110" y1="110" x2="130" y2="90" className="cube-edge"/>
    </svg>
    <svg className="shape-layer spiral-shape" viewBox="0 0 200 200">
      <path className="spiral-path" fill="none" d="M100,100 C100,90 110,90 110,100 C110,115 95,115 95,100 C95,80 120,80 120,100 C120,125 85,125 85,100 C85,70 130,70 130,100 C130,135 75,135 75,100 C75,60 140,60 140,100"/>
      <circle r="3" className="spiral-dot"><animateMotion dur="8s" repeatCount="indefinite" path="M100,100 C100,90 110,90 110,100 C110,115 95,115 95,100 C95,80 120,80 120,100 C120,125 85,125 85,100 C85,70 130,70 130,100 C130,135 75,135 75,100 C75,60 140,60 140,100"/></circle>
    </svg>
    <svg className="shape-layer dna-helix" viewBox="0 0 100 400">
      {[...Array(10)].map((_, i) => { const y = 20 + i * 40; const offset = Math.sin(i * 0.8) * 30; return (<g key={`dna-${i}`} className={`dna-pair dp-${i}`}><circle cx={50 + offset} cy={y} r="5" className="dna-node dn-left"/><circle cx={50 - offset} cy={y} r="5" className="dna-node dn-right"/><line x1={50 + offset} y1={y} x2={50 - offset} y2={y} className="dna-link"/></g>); })}
    </svg>
    <svg className="shape-layer infinity-shape" viewBox="0 0 300 150">
      <path className="infinity-path" d="M75,75 C75,30 25,30 25,75 C25,120 75,120 75,75 C75,30 125,30 125,75 C125,120 75,120 75,75" transform="translate(75,0) scale(1.2)"/>
      <circle r="4" className="infinity-dot"><animateMotion dur="5s" repeatCount="indefinite" path="M75,75 C75,30 25,30 25,75 C25,120 75,120 75,75 C75,30 125,30 125,75 C125,120 75,120 75,75"/></circle>
    </svg>
  </div>
);

/* ================= FOOTER LINK ================= */
const FooterLink = ({ children, sectionId, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (<a href={`#${sectionId}`} onClick={(e) => scrollToSection(e, sectionId)} className={`footer-link pop-animate pop-left ${isVisible ? 'is-visible' : ''}`} ref={ref} style={{ transitionDelay: `${delay}ms` }}><span className="link-text">{children}</span><span className="link-arrow"><Icons.ArrowRight /></span></a>);
};

/* ================= SOCIAL LINK ================= */
const SocialLink = ({ icon: Icon, label, href = "#", delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (<a href={href} className={`social-link pop-animate pop-scale ${isVisible ? 'is-visible' : ''}`} aria-label={label} target="_blank" rel="noopener noreferrer" ref={ref} style={{ transitionDelay: `${delay}ms` }}><span className="social-icon"><Icon /></span><span className="social-label">{label}</span></a>);
};

/* ================= NEWSLETTER FORM ================= */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { setStatus("error"); setMessage("Please enter a valid email"); return; }
    setStatus("loading"); await new Promise((r) => setTimeout(r, 1500));
    setStatus("success"); setMessage("Welcome aboard!"); setEmail("");
    setTimeout(() => { setStatus("idle"); setMessage(""); }, 4000);
  }, [email]);
  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <PopItem delay={0} type="pop-up"><p className="newsletter-text">Join our newsletter for insights on design, branding, and digital innovation.</p></PopItem>
      <PopItem delay={20} type="pop-scale">
        <div className="input-wrapper">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={`newsletter-input ${status === "error" ? "input-error" : ""} ${status === "success" ? "input-success" : ""}`} disabled={status === "loading" || status === "success"} aria-label="Email address"/>
          <button type="submit" className={`newsletter-btn ${status}`} disabled={status === "loading" || status === "success"}>
            <span className="btn-content">
              {status === "idle" && <><span>Subscribe</span><Icons.ArrowRight /></>}
              {status === "loading" && <Icons.Loader />}
              {status === "success" && <Icons.Check />}
              {status === "error" && <><span>Try Again</span><Icons.ArrowRight /></>}
            </span>
          </button>
        </div>
      </PopItem>
      {message && <p className={`newsletter-message ${status}`}>{message}</p>}
    </form>
  );
};

/* ================= PARALLAX PURPLE MOUNTAINS ================= */
const ParallaxMountains = () => {
  const containerRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    const startOffsets = [80, 160, 280, 420, 600];
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const update = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / windowH));
      const eased = easeOutCubic(progress);

      for (let i = 0; i < layersRef.current.length; i++) {
        const layer = layersRef.current[i];
        if (layer) {
          const offset = startOffsets[i] * (1 - eased);
          layer.style.transform = `translate3d(0,${offset}px,0)`;
        }
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="parallax-mountains" ref={containerRef} aria-hidden="true">
      <div className="mtn-layer mtn-l1" ref={el => layersRef.current[0] = el}>
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="mtn-svg">
          <path d="M0 600 L0 250 C100 220 200 280 350 230 C500 180 650 250 800 220 C950 190 1100 240 1250 210 C1350 190 1400 230 1440 240 L1440 600Z" fill="#2d1f4e"/>
        </svg>
      </div>
      <div className="mtn-layer mtn-l2" ref={el => layersRef.current[1] = el}>
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="mtn-svg">
          <path d="M0 600 L0 300 C140 320 280 240 420 180 C560 120 700 200 840 260 C980 310 1120 260 1300 240 Q1400 260 1440 300 L1440 600Z" fill="#241942"/>
        </svg>
      </div>
      <div className="mtn-layer mtn-l3" ref={el => layersRef.current[2] = el}>
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="mtn-svg">
          <path d="M0 600 L0 340 C200 360 380 280 560 220 C740 160 920 240 1100 280 C1280 320 1380 290 1440 320 L1440 600Z" fill="#1b1236"/>
        </svg>
      </div>
      <div className="mtn-layer mtn-l4" ref={el => layersRef.current[3] = el}>
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="mtn-svg">
          <path d="M0 600 L0 380 C250 400 500 340 750 280 C1000 220 1250 300 1440 320 L1440 600Z" fill="#130d2a"/>
        </svg>
      </div>
      <div className="mtn-layer mtn-l5" ref={el => layersRef.current[4] = el}>
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="mtn-svg">
          <path d="M0 600 L0 420 C300 450 650 400 1000 370 C1300 350 1400 400 1440 410 L1440 600Z" fill="#0d0820"/>
        </svg>
      </div>
    </div>
  );
};

/* ================= FOOTER ================= */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navSections = [
    { label: "Services", sectionId: "services" },
    { label: "Work", sectionId: "work" },
    { label: "Method", sectionId: "method" },
    { label: "About", sectionId: "about" },
  ];
  const socialLinks = [
    { icon: Icons.Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Icons.Twitter, label: "X (Twitter)", href: "https://x.com" },
    { icon: Icons.LinkedIn, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <GradientBackground />
      <InteractiveGradients />
      <AnimatedShapes />
      <ParallaxMountains />
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <PopItem delay={0} type="pop-scale"><a href="/" className="brand-logo" aria-label="ThoughtShop Home"><span className="logo-text">ThoughtShop</span><span className="logo-dot">.</span></a></PopItem>
            <PopItem delay={20} type="pop-up"><p className="brand-tagline">Crafting digital experiences that resonate, inspire, and transform brands into icons.</p></PopItem>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <PopItem delay={0} type="pop-down"><h3 className="footer-title">Navigate</h3></PopItem>
            <ul className="footer-links">{navSections.map((section, i) => (<li key={section.label}><FooterLink sectionId={section.sectionId} delay={i * 15}>{section.label}</FooterLink></li>))}</ul>
          </nav>
          <div className="footer-social">
            <PopItem delay={0} type="pop-down"><h3 className="footer-title">Connect</h3></PopItem>
            <div className="social-links">{socialLinks.map((s, i) => (<SocialLink key={s.label} {...s} delay={i * 20} />))}</div>
            <PopItem delay={60} type="pop-up" className="contact-info"><a href="mailto:hello@thoughtshop.com" className="contact-email">hello@thoughtshop.com</a><p className="contact-location">San Francisco, CA</p></PopItem>
          </div>
          <div className="footer-newsletter">
            <PopItem delay={0} type="pop-down"><h3 className="footer-title">Newsletter</h3></PopItem>
            <NewsletterForm />
          </div>
        </div>
        <PopItem delay={50} type="pop-up" className="footer-bottom">
          <p className="copyright">© {currentYear} ThoughtShop. All rights reserved.</p>
          <nav className="legal-links" aria-label="Legal"><a href="/privacy">Privacy Policy</a><span className="sep">·</span><a href="/terms">Terms of Service</a></nav>
          <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></button>
        </PopItem>
      </div>

      <style>{`
        .footer{position:relative;background:#030303;color:#fff;overflow:hidden}
        .footer-content{position:relative;z-index:20;max-width:1400px;margin:0 auto;padding:100px 80px 60px}
        @media(max-width:1024px){.footer-content{padding:80px 50px 50px}}
        @media(max-width:640px){.footer-content{padding:60px 24px 40px}}

        .pop-animate{opacity:0;will-change:transform,opacity}
        .pop-animate.pop-up{transform:translateY(25px) scale(0.95);transition:opacity 0.25s cubic-bezier(0.22,1,0.36,1),transform 0.25s cubic-bezier(0.22,1,0.36,1)}
        .pop-animate.pop-up.is-visible{opacity:1;transform:translateY(0) scale(1)}
        .pop-animate.pop-down{transform:translateY(-20px) scale(0.95);transition:opacity 0.25s cubic-bezier(0.22,1,0.36,1),transform 0.25s cubic-bezier(0.22,1,0.36,1)}
        .pop-animate.pop-down.is-visible{opacity:1;transform:translateY(0) scale(1)}
        .pop-animate.pop-scale{transform:scale(0.75);transition:opacity 0.2s cubic-bezier(0.22,1,0.36,1),transform 0.2s cubic-bezier(0.22,1,0.36,1)}
        .pop-animate.pop-scale.is-visible{opacity:1;transform:scale(1)}
        .pop-animate.pop-left{transform:translateX(-20px) scale(0.97);transition:opacity 0.2s cubic-bezier(0.22,1,0.36,1),transform 0.2s cubic-bezier(0.22,1,0.36,1)}
        .pop-animate.pop-left.is-visible{opacity:1;transform:translateX(0) scale(1)}

        .interactive-gradients{position:absolute;inset:0;z-index:3;overflow:hidden;pointer-events:auto}
        .interactive-blob{position:absolute;border-radius:50%;filter:blur(80px);mix-blend-mode:screen;pointer-events:none;transition:opacity 0.5s,transform 0.3s;will-change:transform,left,top}
        .blob-yellow{background:radial-gradient(circle,rgba(251,191,36,0.45) 0%,rgba(251,191,36,0.25) 25%,rgba(245,158,11,0.12) 50%,transparent 75%)}
        .blob-violet{background:radial-gradient(circle,rgba(139,92,246,0.4) 0%,rgba(139,92,246,0.22) 25%,rgba(124,58,237,0.1) 50%,transparent 75%)}
        .blob-grey{background:radial-gradient(circle,rgba(156,163,175,0.3) 0%,rgba(107,114,128,0.18) 25%,rgba(75,85,99,0.08) 50%,transparent 75%)}
        .cursor-glow{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(251,191,36,0.2) 0%,rgba(139,92,246,0.12) 30%,transparent 60%);transform:translate(-50%,-50%);filter:blur(60px);pointer-events:none;transition:opacity 0.4s;mix-blend-mode:screen}
        .interactive-blob.blob-yellow{animation:blobPulse 8s ease-in-out infinite}
        .interactive-blob.blob-violet{animation:blobPulse 10s ease-in-out infinite}
        .interactive-blob.blob-grey{animation:blobPulse 12s ease-in-out infinite}
        @keyframes blobPulse{0%,100%{filter:blur(80px) brightness(1)}50%{filter:blur(90px) brightness(1.15)}}

        .gradient-bg{position:absolute;inset:0;z-index:0;overflow:hidden}
        .base-gradient{position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 20% 40%,rgba(251,191,36,0.08) 0%,transparent 50%),radial-gradient(ellipse 60% 40% at 80% 20%,rgba(139,92,246,0.07) 0%,transparent 50%),radial-gradient(ellipse 70% 60% at 50% 80%,rgba(107,114,128,0.06) 0%,transparent 50%),linear-gradient(180deg,#030303 0%,#060606 50%,#030303 100%)}
        .orb-yellow-1{position:absolute;width:60vw;height:60vw;max-width:800px;max-height:800px;top:-20%;left:-15%;background:radial-gradient(circle,rgba(251,191,36,0.12) 0%,transparent 70%);border-radius:50%;filter:blur(80px);animation:orbFloat 30s ease-in-out infinite}
        .orb-yellow-2{position:absolute;width:40vw;height:40vw;max-width:500px;max-height:500px;bottom:10%;right:-10%;background:radial-gradient(circle,rgba(251,191,36,0.08) 0%,transparent 70%);border-radius:50%;filter:blur(60px);animation:orbFloat 25s ease-in-out infinite 5s}
        .orb-purple-1{position:absolute;width:55vw;height:55vw;max-width:700px;max-height:700px;top:10%;right:-20%;background:radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%);border-radius:50%;filter:blur(70px);animation:orbFloat 28s ease-in-out infinite 3s}
        .orb-purple-2{position:absolute;width:35vw;height:35vw;max-width:450px;max-height:450px;bottom:-10%;left:10%;background:radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%);border-radius:50%;filter:blur(55px);animation:orbFloat 32s ease-in-out infinite 8s}
        .orb-grey-1{position:absolute;width:50vw;height:50vw;max-width:650px;max-height:650px;top:30%;left:-10%;background:radial-gradient(circle,rgba(107,114,128,0.1) 0%,transparent 70%);border-radius:50%;filter:blur(65px);animation:orbFloat 26s ease-in-out infinite 4s}
        @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(3%,5%) scale(1.05)}}
        .mesh-gradient{position:absolute;inset:0;background:conic-gradient(from 0deg at 30% 40%,rgba(251,191,36,0.02),rgba(139,92,246,0.02),rgba(107,114,128,0.02),rgba(251,191,36,0.02));animation:meshRotate 60s linear infinite}
        @keyframes meshRotate{to{filter:hue-rotate(30deg)}}
        .noise-texture{position:absolute;inset:0;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,0.65) 100%)}

        .animated-shapes{position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden}
        .shape-layer{position:absolute}
        .floating-shapes{width:100%;height:100%;top:0;left:0}
        .float-hex,.float-circle,.float-tri,.float-square,.float-diamond{fill:none;stroke:rgba(255,255,255,0.06);stroke-width:1}
        .float-hex{animation:floatShape 20s ease-in-out infinite}
        .fh-1{animation-delay:0s}.fh-2{animation-delay:2s}.fh-3{animation-delay:4s}.fh-4{animation-delay:6s}
        .float-circle{animation:floatCircle 18s ease-in-out infinite}
        .fc-1{stroke:rgba(251,191,36,0.08);animation-delay:1s}.fc-2{stroke:rgba(139,92,246,0.06);animation-delay:3s}.fc-3{stroke:rgba(251,191,36,0.05);animation-delay:5s}.fc-4{stroke:rgba(139,92,246,0.08);animation-delay:7s}
        .float-tri{animation:floatTri 22s ease-in-out infinite}
        .ft-1{stroke:rgba(251,191,36,0.06);animation-delay:0.5s}.ft-2{stroke:rgba(139,92,246,0.05);animation-delay:2.5s}.ft-3{stroke:rgba(156,163,175,0.06);animation-delay:4.5s}
        .float-square{animation:floatSquare 16s ease-in-out infinite}
        .fs-1{stroke:rgba(251,191,36,0.05);animation-delay:1.5s}.fs-2{stroke:rgba(139,92,246,0.06);animation-delay:3.5s}
        .float-diamond{animation:floatDiamond 24s ease-in-out infinite;transform-origin:center;transform:rotate(45deg)}
        .fd-1{stroke:rgba(251,191,36,0.08);animation-delay:0s}.fd-2{stroke:rgba(139,92,246,0.05);animation-delay:2s}
        @keyframes floatShape{0%,100%{transform:translateY(0) rotate(0deg);opacity:0.15}50%{transform:translateY(-30px) rotate(10deg);opacity:0.35}}
        @keyframes floatCircle{0%,100%{transform:scale(1) translateY(0);opacity:0.15}50%{transform:scale(1.2) translateY(-20px);opacity:0.35}}
        @keyframes floatTri{0%,100%{transform:translateY(0) rotate(0deg);opacity:0.15}50%{transform:translateY(-25px) rotate(-15deg);opacity:0.35}}
        @keyframes floatSquare{0%,100%{transform:rotate(0deg) scale(1);opacity:0.15}50%{transform:rotate(45deg) scale(1.1);opacity:0.35}}
        @keyframes floatDiamond{0%,100%{transform:rotate(45deg) translateY(0);opacity:0.15}50%{transform:rotate(45deg) translateY(-20px);opacity:0.35}}

        .morph-blob-layer{width:350px;height:350px;top:15%;right:8%;opacity:0.35}
        .morph-blob{filter:blur(2px)}
        .rotating-rings{width:280px;height:280px;top:50%;left:5%;transform:translateY(-50%);opacity:0.2}
        .ring{fill:none;stroke-width:1}
        .ring-1{stroke:rgba(251,191,36,0.12);animation:rotateRing 40s linear infinite}
        .ring-2{stroke:rgba(139,92,246,0.1);animation:rotateRing 35s linear infinite reverse}
        .ring-3{stroke:rgba(156,163,175,0.08);animation:rotateRing 30s linear infinite}
        .ring-4{stroke:rgba(251,191,36,0.06);animation:rotateRing 25s linear infinite reverse}
        @keyframes rotateRing{to{transform:rotate(360deg)}}
        .ring-center{fill:rgba(251,191,36,0.25);animation:ringCenterPulse 3s ease-in-out infinite}
        @keyframes ringCenterPulse{0%,100%{r:8;opacity:0.25}50%{r:12;opacity:0.5}}
        .ring-dot{fill:rgba(251,191,36,0.35)}
        .rd-1{animation:orbitDot1 40s linear infinite}.rd-2{animation:orbitDot2 35s linear infinite reverse}.rd-3{animation:orbitDot3 30s linear infinite}
        @keyframes orbitDot1{to{transform:rotate(360deg);transform-origin:150px 150px}}
        @keyframes orbitDot2{to{transform:rotate(-360deg);transform-origin:150px 150px}}
        @keyframes orbitDot3{to{transform:rotate(360deg);transform-origin:150px 150px}}

        .pulse-circles{width:200px;height:200px;bottom:25%;right:15%;opacity:0.25}
        .pulse-circle{fill:none;stroke:rgba(139,92,246,0.18);stroke-width:1;animation:pulseExpand 5s ease-out infinite}
        .pc-1{animation-delay:0s}.pc-2{animation-delay:1s}.pc-3{animation-delay:2s}.pc-4{animation-delay:3s}
        @keyframes pulseExpand{0%{r:15;opacity:0.35;stroke-width:2}100%{r:95;opacity:0;stroke-width:0.5}}
        .pulse-center{fill:rgba(139,92,246,0.35);animation:pulseCenterBeat 2s ease-in-out infinite}
        @keyframes pulseCenterBeat{0%,100%{r:6;opacity:0.35}50%{r:10;opacity:0.6}}

        .constellation-net{width:100%;height:100%;top:0;left:0;opacity:0.3}
        .const-star{fill:rgba(255,255,255,0.45);animation:starTwinkle 3s ease-in-out infinite}
        .cs-1{animation-delay:0s}.cs-2{animation-delay:0.3s}.cs-3{animation-delay:0.6s}.cs-4{animation-delay:0.9s}.cs-5{animation-delay:1.2s}.cs-6{animation-delay:1.5s}.cs-7{animation-delay:1.8s}.cs-8{animation-delay:2.1s}.cs-9{animation-delay:2.4s}.cs-10{animation-delay:2.7s}.cs-11{animation-delay:0.2s}.cs-12{animation-delay:0.5s}.cs-13{animation-delay:0.8s}
        @keyframes starTwinkle{0%,100%{opacity:0.15;r:3}50%{opacity:0.6;r:4}}
        .const-line{stroke:rgba(255,255,255,0.04);stroke-width:1;stroke-dasharray:100;animation:lineReveal 4s ease-out forwards}
        .cl-1{animation-delay:0s}.cl-2{animation-delay:0.2s}.cl-3{animation-delay:0.4s}.cl-4{animation-delay:0.6s}.cl-5{animation-delay:0.8s}.cl-6{animation-delay:1s}.cl-7{animation-delay:1.2s}.cl-8{animation-delay:1.4s}.cl-9{animation-delay:1.6s}.cl-10{animation-delay:1.8s}.cl-11{animation-delay:2s}.cl-12{animation-delay:2.2s}.cl-13{animation-delay:2.4s}
        @keyframes lineReveal{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}

        .dot-grid{width:350px;height:350px;top:60%;right:25%;opacity:0.15}
        .grid-dot{fill:rgba(255,255,255,0.25);animation:gridDotPulse 4s ease-in-out infinite}
        .gd-0{animation-delay:0s}.gd-1{animation-delay:0.2s}.gd-2{animation-delay:0.4s}.gd-3{animation-delay:0.6s}
        @keyframes gridDotPulse{0%,100%{opacity:0.1;r:1.5}50%{opacity:0.35;r:3}}

        .particle-container{position:absolute;inset:0}
        .floating-particle-div{position:absolute;width:4px;height:4px;border-radius:50%;animation:floatParticleDiv 20s ease-in-out infinite}
        .fp-div-0{background:rgba(251,191,36,0.3)}.fp-div-1{background:rgba(139,92,246,0.25)}.fp-div-2{background:rgba(156,163,175,0.25)}.fp-div-3{background:rgba(251,191,36,0.18)}.fp-div-4{background:rgba(139,92,246,0.3)}
        @keyframes floatParticleDiv{0%,100%{transform:translateY(0) translateX(0);opacity:0.15}25%{transform:translateY(-40px) translateX(20px);opacity:0.4}50%{transform:translateY(-20px) translateX(-15px);opacity:0.25}75%{transform:translateY(-50px) translateX(10px);opacity:0.5}}

        .cube-wireframe{width:150px;height:150px;bottom:15%;left:20%;opacity:0.18;animation:cubeRotate 30s linear infinite}
        .cube-face{fill:none;stroke:rgba(251,191,36,0.12);stroke-width:1}.cf-back{stroke:rgba(139,92,246,0.08)}
        .cube-edge{stroke:rgba(255,255,255,0.05);stroke-width:1}
        @keyframes cubeRotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

        .spiral-shape{width:180px;height:180px;top:70%;right:5%;opacity:0.2}
        .spiral-path{stroke:rgba(251,191,36,0.12);stroke-width:1.5;stroke-dasharray:500;animation:spiralDraw 15s linear infinite}
        @keyframes spiralDraw{0%{stroke-dashoffset:500}100%{stroke-dashoffset:0}}
        .spiral-dot{fill:rgba(251,191,36,0.45)}

        .dna-helix{width:80px;height:380px;right:92%;top:50%;transform:translateY(-50%);opacity:0.2}
        .dna-node{fill:rgba(251,191,36,0.25)}.dn-left{fill:rgba(251,191,36,0.35)}.dn-right{fill:rgba(139,92,246,0.35)}
        .dna-link{stroke:rgba(255,255,255,0.08);stroke-width:1}
        .dna-pair{animation:dnaPulse 3s ease-in-out infinite}
        .dp-0{animation-delay:0s}.dp-1{animation-delay:0.3s}.dp-2{animation-delay:0.6s}.dp-3{animation-delay:0.9s}.dp-4{animation-delay:1.2s}.dp-5{animation-delay:1.5s}.dp-6{animation-delay:1.8s}.dp-7{animation-delay:2.1s}.dp-8{animation-delay:2.4s}.dp-9{animation-delay:2.7s}
        @keyframes dnaPulse{0%,100%{opacity:0.15}50%{opacity:0.5}}

        .infinity-shape{width:220px;height:110px;bottom:45%;left:30%;opacity:0.18}
        .infinity-path{fill:none;stroke:rgba(139,92,246,0.12);stroke-width:2;stroke-dasharray:400;animation:infinityDraw 8s linear infinite}
        @keyframes infinityDraw{0%{stroke-dashoffset:400}100%{stroke-dashoffset:0}}
        .infinity-dot{fill:rgba(139,92,246,0.45)}

        @media(max-width:1024px){.rotating-rings,.dna-helix,.cube-wireframe,.spiral-shape{display:none}.morph-blob-layer,.pulse-circles,.infinity-shape{opacity:0.12}}
        @media(max-width:768px){.morph-blob-layer,.pulse-circles,.dot-grid,.infinity-shape{display:none}.floating-shapes,.constellation-net{opacity:0.18}.particle-container .floating-particle-div{width:3px;height:3px}}

        .footer-grid{display:grid;grid-template-columns:1.2fr .8fr .8fr 1.2fr;gap:60px}
        @media(max-width:1100px){.footer-grid{grid-template-columns:1fr 1fr;gap:50px}}
        @media(max-width:640px){.footer-grid{grid-template-columns:1fr;gap:50px}}
        .brand-logo{display:inline-block;margin-bottom:24px}
        .logo-text{font-size:34px;font-weight:800;letter-spacing:-0.02em;color:#fff}.logo-dot{color:#fbbf24}
        .brand-tagline{color:#e2e8f0;font-size:18px;line-height:1.75;max-width:300px;opacity:0.85}
        .footer-title{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#e2e8f0;margin-bottom:28px;font-weight:600;opacity:0.6}
        .footer-links{display:flex;flex-direction:column;gap:16px;list-style:none;padding:0;margin:0}
        .footer-link{display:inline-flex;align-items:center;gap:10px;color:#e2e8f0;font-size:17px;transition:all .2s;opacity:0.8;text-decoration:none;cursor:pointer}
        .footer-link:hover{opacity:1;color:#fbbf24}
        .link-arrow{opacity:0;transform:translateX(-8px);transition:all .2s}
        .footer-link:hover .link-arrow{opacity:1;transform:translateX(0);color:#fbbf24}
        .social-links{display:flex;flex-direction:column;gap:14px;margin-bottom:36px}
        .social-link{display:inline-flex;align-items:center;gap:14px;color:#e2e8f0;font-size:17px;transition:all .2s;opacity:0.8;text-decoration:none}
        .social-icon{display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;transition:all .2s;color:#e2e8f0}
        .social-link:hover{opacity:1}
        .social-link:hover .social-icon{background:rgba(251,191,36,.15);border-color:rgba(251,191,36,.4);transform:translateY(-2px)}
        .contact-info{margin-top:10px}
        .contact-email{display:block;color:#fbbf24;font-size:17px;margin-bottom:8px;transition:color .2s;text-decoration:none}
        .contact-email:hover{color:#f59e0b}
        .contact-location{color:#e2e8f0;font-size:16px;opacity:0.7;margin:0}
        .newsletter-form{max-width:100%}
        .newsletter-text{color:#e2e8f0;font-size:16px;line-height:1.7;margin-bottom:24px;opacity:0.8}
        .input-wrapper{display:flex;flex-direction:column;gap:14px}
        .newsletter-input{width:100%;padding:18px 20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;color:#fff;font-size:17px;transition:all .2s}
        .newsletter-input:focus{outline:none;border-color:rgba(251,191,36,.5);background:rgba(255,255,255,.08);box-shadow:0 0 0 4px rgba(251,191,36,.08)}
        .newsletter-input::placeholder{color:rgba(255,255,255,0.3)}
        .newsletter-input.input-error{border-color:#ef4444}.newsletter-input.input-success{border-color:#10b981}
        .newsletter-input:disabled{opacity:.5;cursor:not-allowed}
        .newsletter-btn{display:flex;align-items:center;justify-content:center;width:100%;padding:18px 28px;background:#fff;color:#000;font-weight:600;font-size:17px;border-radius:14px;border:none;cursor:pointer;transition:all .2s}
        .btn-content{display:flex;align-items:center;gap:10px}
        .newsletter-btn:hover:not(:disabled){background:#fbbf24;transform:translateY(-2px);box-shadow:0 4px 20px rgba(251,191,36,.25)}
        .newsletter-btn:disabled{cursor:not-allowed}
        .newsletter-btn.loading{background:#1f2937;color:#fff}.newsletter-btn.success{background:#10b981;color:#fff}.newsletter-btn.error{background:#ef4444;color:#fff}
        .newsletter-message{margin-top:14px;font-size:15px;padding:12px 16px;border-radius:10px;animation:fadeIn .2s}
        .newsletter-message.success{background:rgba(16,185,129,.1);color:#10b981;border:1px solid rgba(16,185,129,.2)}
        .newsletter-message.error{background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.2)}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
        .footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:60px;margin-top:80px;border-top:1px solid rgba(255,255,255,.08)}
        @media(max-width:768px){.footer-bottom{flex-direction:column;gap:24px;text-align:center}}
        .copyright{color:#e2e8f0;font-size:16px;opacity:0.5;margin:0}
        .legal-links{display:flex;align-items:center;gap:10px;color:#e2e8f0;font-size:16px}
        .legal-links a{transition:opacity .2s;opacity:0.5;color:#e2e8f0;text-decoration:none}.legal-links a:hover{opacity:1}
        .sep{color:rgba(255,255,255,0.15)}
        .back-to-top{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:#e2e8f0;cursor:pointer;transition:all .2s}
        .back-to-top:hover{background:rgba(251,191,36,.15);border-color:rgba(251,191,36,.4);color:#fbbf24;transform:translateY(-3px)}
        .animate-spin{animation:spin 1s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}

        .parallax-mountains{
          position:absolute;
          bottom:0;left:0;right:0;
          height:85%;
          z-index:10;
          pointer-events:none;
          overflow:hidden;
        }
        .mtn-layer{
          position:absolute;
          bottom:0;left:0;right:0;
          will-change:transform;
        }
        .mtn-svg{display:block;width:100%;height:100%}
        .mtn-l1{z-index:1;height:100%}
        .mtn-l2{z-index:2;height:90%}
        .mtn-l3{z-index:3;height:78%}
        .mtn-l4{z-index:4;height:65%}
        .mtn-l5{z-index:5;height:55%}

        @media(max-width:1024px){.parallax-mountains{height:70%}}
        @media(max-width:768px){
          .parallax-mountains{height:60%}
          .logo-text{font-size:30px}.brand-tagline{font-size:16px}.footer-title{font-size:12px}
          .footer-link,.social-link,.contact-email{font-size:16px}.contact-location,.newsletter-text{font-size:15px}
          .newsletter-input,.newsletter-btn{font-size:16px}.copyright,.legal-links{font-size:15px}
          .interactive-blob{filter:blur(60px)}.cursor-glow{display:none}
        }
        @media(max-width:480px){.parallax-mountains{height:50%}}
      `}</style>
    </footer>
  );
};

export default Footer;
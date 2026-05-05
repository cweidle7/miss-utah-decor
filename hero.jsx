// Miss Utah Decor — Hero Carousel

const SLIDES = [
  // Spring in Bloom — landscape floral wall, crop avoids the grass base
  { src: 'assets/Hero_carousel/backdrop-angle.jpg',                  pos: 'center 42%' },
  // Eid Mubarak — crescent minimalist
  { src: 'assets/Hero_carousel/eid-mubarak-crescent-minimalist.jpg', pos: 'center 36%' },
  // Mermaid 1st bday — carriage backdrop
  { src: 'assets/Hero_carousel/first-bday-mermaid-carriage.jpg',     pos: 'center 22%' },
  // Corporate 40 Years — crop cuts the ceiling, centers on marquee + balloons
  { src: 'assets/Hero_carousel/marquee-corporate-40-years.jpg',      pos: 'center 55%' },
  // Outdoor picnic — crop keeps the tablescape + florals, trims sky + cushions
  { src: 'assets/Hero_carousel/outdoor-picnic-pastel-florals.jpg',   pos: 'center 38%' },
  // Valentine's — red rose wall + heart columns
  { src: 'assets/Hero_carousel/valentines-all-you-need-is-love.jpg', pos: 'center 38%' },
];

const Hero = ({ onCTA }) => {
  const { isMobile } = useBreakpoint();
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [btnHover, setBtnHover] = React.useState(false);
  const dotRefs = React.useRef([]);

  // Preload all slides on mount so later frames don't flash in
  React.useEffect(() => {
    SLIDES.forEach(({ src }) => { const img = new Image(); img.src = src; });
  }, []);

  // Auto-advance every 5s; pauses when hovered
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActiveIdx(i => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const goTo = React.useCallback(i => setActiveIdx(i), []);

  // Roving tabindex keyboard nav on dots
  const handleDotKeyDown = (e, i) => {
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault(); next = (i + 1) % SLIDES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); next = (i - 1 + SLIDES.length) % SLIDES.length;
    } else { return; }
    goTo(next);
    dotRefs.current[next]?.focus();
  };

  return (
    <section
      role="region"
      aria-label="Miss Utah Decor event highlights — hero carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: isMobile ? 600 : 720,
        overflow: 'hidden',
        background: '#150A1C',
        isolation: 'isolate',
      }}
    >

      {/* ── Slides inside a shared Ken Burns wrapper ─────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          animation: 'mud-hero-kb 18s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: slide.pos,
              opacity: i === activeIdx ? 1 : 0,
              transition: 'opacity 650ms ease-in-out',
            }}
          />
        ))}
      </div>

      {/* ── Persistent overlay — bottom-left anchor, protects text on every slide */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
        }}
      />

      {/* ── Side label (desktop only) ──────────────────────────────────────── */}
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 'clamp(20px, 3vw, 40px)', top: '52%', transform: 'translateY(-50%)',
            zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            color: 'rgba(255,255,255,.42)',
          }}
        >
          <span style={{ width: 1, height: 52, background: 'rgba(255,255,255,.20)' }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 9,
            letterSpacing: '.4em', textTransform: 'uppercase',
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          }}>
            Salt Lake City · Utah
          </span>
          <span style={{ width: 1, height: 52, background: 'rgba(255,255,255,.20)' }} />
        </div>
      )}

      {/* ── Instagram side link (desktop only) ───────────────────────────── */}
      {!isMobile && (
        <a
          href="https://instagram.com/missutahdecor"
          target="_blank"
          rel="noreferrer"
          style={{
            position: 'absolute',
            right: 'clamp(20px, 3vw, 40px)', top: '50%', transform: 'translateY(-50%)',
            zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            color: 'rgba(255,255,255,.42)', textDecoration: 'none',
          }}
        >
          <span style={{ width: 1, height: 44, background: 'rgba(255,255,255,.20)' }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 9,
            letterSpacing: '.4em', textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}>
            @missutahdecor
          </span>
          <span style={{ width: 1, height: 44, background: 'rgba(255,255,255,.20)' }} />
        </a>
      )}

      {/* ── Main content — bottom-left ────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', alignItems: 'flex-end',
        padding: `0 clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)`,
      }}>
        <div style={{ maxWidth: isMobile ? '92%' : 660 }}>

          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            marginBottom: isMobile ? 16 : 22,
            animation: 'mud-hero-rise 600ms 100ms ease-out both',
          }}>
            <span style={{
              width: 24, height: 1,
              background: 'rgba(255,255,255,.40)',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              fontSize: 10, letterSpacing: '.38em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.85)',
            }}>
              Utah's Premier Balloon &amp; Event Decor
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: isMobile ? 'clamp(36px, 10vw, 54px)' : 'clamp(56px, 7vw, 104px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: 0,
            animation: 'mud-hero-rise 800ms 200ms ease-out both',
          }}>
            <span style={{ display: 'block', color: '#ffffff' }}>Your Party,</span>
            <span style={{ display: 'block', color: '#FF3EA5' }}>Unforgettable</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontFamily: 'var(--font-script)',
            fontSize: isMobile ? 'clamp(18px, 4vw, 22px)' : 'clamp(20px, 2vw, 28px)',
            lineHeight: 1.3,
            color: 'rgba(255,255,255,.88)',
            margin: `${isMobile ? 14 : 18}px 0 0`,
            animation: 'mud-hero-rise 800ms 460ms ease-out both',
          }}>
            we don't just make balloons. We make memories.
          </p>

          {/* CTA */}
          <div style={{
            marginTop: isMobile ? 24 : 36,
            animation: 'mud-hero-rise 800ms 620ms ease-out both',
          }}>
            <button
              onClick={onCTA}
              style={{
                fontFamily: 'var(--font-sans)', fontWeight: 700,
                fontSize: isMobile ? 12 : 13,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: '#fff', background: '#FF3EA5',
                border: 'none', borderRadius: 999,
                padding: isMobile ? '14px 28px' : '18px 40px',
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: btnHover ? '#e62e95' : '#FF3EA5',
              transform: btnHover ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'background 150ms ease-out, transform 200ms ease-out',
              boxShadow: '0 8px 28px rgba(255,62,165,.38)',
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Let's Party
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide dots — keyboard navigable, roving tabindex */}
          <div
            role="tablist"
            aria-label="Carousel slides"
            style={{
              marginTop: isMobile ? 20 : 26,
              display: 'flex', gap: 8, alignItems: 'center',
              animation: 'mud-hero-rise 800ms 780ms ease-out both',
            }}
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                ref={el => dotRefs.current[i] = el}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
                tabIndex={i === activeIdx ? 0 : -1}
                onClick={() => goTo(i)}
                onKeyDown={e => handleDotKeyDown(e, i)}
                onFocus={e => { e.currentTarget.style.outline = '2px solid #FF3EA5'; e.currentTarget.style.outlineOffset = '3px'; }}
                onBlur={e => { e.currentTarget.style.outline = 'none'; }}
                style={{
                  width: i === activeIdx ? 24 : 6,
                  height: 6,
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: i === activeIdx ? '#ffffff' : 'rgba(255,255,255,.36)',
                  transition: 'width 300ms ease-out, background 300ms ease-out',
                }}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll nudge (desktop only) ───────────────────────────────────── */}
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 24, right: 'clamp(72px, 6vw, 110px)',
            zIndex: 3,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            color: '#fff', opacity: .4,
          }}
        >
          <span style={{ fontSize: 8, letterSpacing: '.36em', textTransform: 'uppercase' }}>Scroll</span>
          <span style={{
            width: 1, height: 40,
            background: 'linear-gradient(to bottom, #fff, transparent)',
            animation: 'mud-scroll-tick 1.8s ease-in-out infinite',
          }} />
        </div>
      )}

      <style>{`
        @keyframes mud-hero-kb {
          from { transform: scale(1.0)   translate3d(0, 0, 0); }
          to   { transform: scale(1.10)  translate3d(0, 0, 0); }
        }
        @keyframes mud-hero-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mud-scroll-tick {
          0%,100% { transform: scaleY(1); opacity: .28; }
          50%     { transform: scaleY(1.4); opacity: .75; }
        }
        @keyframes mud-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mud-float {
          0%   { transform: translate(0,0) rotate(-3deg); }
          100% { transform: translate(8px,-14px) rotate(3deg); }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Hero });

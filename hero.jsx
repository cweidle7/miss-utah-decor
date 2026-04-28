// Miss Utah Decor — Hero

const Hero = ({ onCTA }) => {
  const { isMobile } = useBreakpoint();

  return (
    <section style={{
      position: 'relative', height: '100vh', minHeight: isMobile ? 600 : 720,
      overflow: 'hidden', background: '#150A1C',
      isolation: 'isolate',
    }}>
      {/* Ken Burns background — pure CSS, GPU-composited via will-change */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(assets/hero/hero-poster.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          animation: 'mud-hero-kb 14s ease-in-out infinite alternate',
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      />

      {/* Bottom gradient — shields text without killing the image */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 36%, transparent 60%)',
      }} />

      {/* Side label — location */}
      {!isMobile && (
        <div aria-hidden="true" style={{
          position: 'absolute', left: 'clamp(20px, 3vw, 40px)', top: '52%', transform: 'translateY(-50%)',
          zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          color: 'rgba(255,255,255,.45)',
        }}>
          <span style={{ width: 1, height: 52, background: 'rgba(255,255,255,.22)' }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 9,
            letterSpacing: '.4em', textTransform: 'uppercase',
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          }}>Salt Lake City · Utah</span>
          <span style={{ width: 1, height: 52, background: 'rgba(255,255,255,.22)' }} />
        </div>
      )}

      {/* Instagram side link */}
      {!isMobile && (
        <a
          href="https://instagram.com/missutahdecor"
          target="_blank"
          rel="noreferrer"
          style={{
            position: 'absolute', right: 'clamp(20px, 3vw, 40px)', top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            color: 'rgba(255,255,255,.45)', textDecoration: 'none',
          }}
        >
          <span style={{ width: 1, height: 44, background: 'rgba(255,255,255,.22)' }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 9,
            letterSpacing: '.4em', textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}>@missutahdecor</span>
          <span style={{ width: 1, height: 44, background: 'rgba(255,255,255,.22)' }} />
        </a>
      )}

      {/* Main content — bottom-left anchored */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', alignItems: 'flex-end',
        padding: `0 clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)`,
      }}>
        <div style={{ maxWidth: isMobile ? '92%' : 620 }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20,
            animation: 'mud-hero-rise 600ms 100ms ease-out both',
          }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,.38)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: 10, letterSpacing: '.36em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.78)',
            }}>Utah's Premier Balloon &amp; Event Decor</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(52px, 6.5vw, 96px)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            color: '#fff', margin: 0,
            animation: 'mud-hero-rise 800ms 220ms ease-out both',
          }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block', animation: 'mud-hero-rise 800ms 280ms ease-out both' }}>
                Your Party,
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{
                display: 'inline-block', animation: 'mud-hero-rise 800ms 380ms ease-out both',
                color: 'var(--pink-300)',
              }}>
                Unforgettable.
              </span>
            </span>
          </h1>

          <div style={{
            marginTop: 18,
            fontFamily: 'var(--font-script)',
            fontSize: isMobile ? 'clamp(18px, 4vw, 23px)' : 'clamp(20px, 2vw, 28px)',
            lineHeight: 1.25,
            color: 'rgba(255,255,255,.75)',
            animation: 'mud-hero-rise 800ms 520ms ease-out both',
          }}>
            we don't just make balloons — we make memories.
          </div>

          <div style={{
            marginTop: isMobile ? 24 : 36,
            display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
            animation: 'mud-hero-rise 800ms 680ms ease-out both',
          }}>
            <Button variant="primary" size={isMobile ? 'md' : 'xl'} onClick={onCTA}>
              Let's Party
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </Button>
            <a
              href="tel:+13854395050"
              style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 11,
                letterSpacing: '.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,.82)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 4px',
              }}
            >
              <span style={{
                width: 36, height: 36, borderRadius: 999, display: 'grid', placeItems: 'center',
                border: '1px solid rgba(255,255,255,.35)',
                flexShrink: 0,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              {!isMobile && (
                <span>
                  (385) 439-5050
                  <span style={{ display: 'block', fontWeight: 400, fontSize: 9, letterSpacing: '.14em', opacity: .65, marginTop: 2 }}>
                    call or text
                  </span>
                </span>
              )}
            </a>
          </div>

        </div>
      </div>

      {/* Scroll nudge */}
      {!isMobile && (
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 24, right: 'clamp(72px, 6vw, 110px)', zIndex: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: '#fff', opacity: .42,
        }}>
          <span style={{ fontSize: 8, letterSpacing: '.36em', textTransform: 'uppercase' }}>Scroll</span>
          <span style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #fff, transparent)', animation: 'mud-scroll-tick 1.8s ease-in-out infinite' }} />
        </div>
      )}

      <style>{`
        @keyframes mud-hero-kb {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }
        @keyframes mud-hero-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mud-scroll-tick {
          0%,100% { transform: scaleY(1); opacity: .28; }
          50%     { transform: scaleY(1.4); opacity: .75; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Hero });

// Miss Utah Decor — Hero (billboard entrance)

const HeroMarquee = () => {
  const items = [
    'FEATURED ON GOOD THINGS UTAH',
    '10+ YEARS OF MEMORIES',
    '500+ CELEBRATIONS',
    'SERVING ALL OF UTAH',
    'RATED 5★ ON GOOGLE',
  ];
  const row = [...items, ...items, ...items];
  return (
    <div style={{
      position: 'absolute', top: 70, left: 0, right: 0, zIndex: 3,
      padding: '10px 0', overflow: 'hidden',
      background: 'rgba(14,10,12,.28)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      borderTop: '1px solid rgba(255,255,255,.08)',
      borderBottom: '1px solid rgba(255,255,255,.08)',
    }}>
      <div style={{
        display: 'flex', gap: 40, whiteSpace: 'nowrap',
        animation: 'mud-marquee 38s linear infinite',
      }}>
        {row.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.92)',
            display: 'inline-flex', alignItems: 'center', gap: 40,
          }}>
            {t}
            <span style={{ color: 'var(--pink-300)', fontSize: 12, letterSpacing: 0 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const FloatingBalloon = ({ size = 60, color = '#EC4899', top = '20%', left = '10%', delay = 0, dur = 8 }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', top, left, zIndex: 2,
    animation: `mud-float ${dur}s ease-in-out ${delay}s infinite alternate`,
    pointerEvents: 'none',
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,.35))',
  }}>
    <svg width={size} height={size * 1.25} viewBox="0 0 60 75" fill="none">
      <defs>
        <radialGradient id={`bg-${top}-${left}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".7" />
          <stop offset="30%" stopColor={color} stopOpacity=".95" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="30" rx="24" ry="28" fill={`url(#bg-${top}-${left})`} />
      <path d="M27 57 L30 58 L33 57 L30 62 Z" fill={color} opacity=".9" />
      <path d="M30 62 Q28 67 30 72 Q32 70 30 75" stroke="rgba(255,255,255,.55)" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const Hero = ({ onCTA }) => {
  const { isMobile } = useBreakpoint();
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const bgRef = React.useRef(null);

  React.useEffect(() => {
    if (isMobile) return; // skip parallax on touch — mousemove never fires anyway
    const move = (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      mouseRef.current = { x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy };
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.08) translate3d(${mouseRef.current.x * -10}px, ${mouseRef.current.y * -6}px, 0)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isMobile]);

  return (
    <section style={{
      position: 'relative', height: '100vh', minHeight: isMobile ? 600 : 720,
      overflow: 'hidden', background: '#0E0A0C',
      isolation: 'isolate',
    }}>
      {/* Billboard photo — placeholder until real assets are dropped in */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '-4%', zIndex: 0,
          backgroundImage: 'url(https://picsum.photos/seed/pinkarches/1920/1080)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          transform: 'scale(1.08)',
          transition: 'transform 800ms cubic-bezier(.22,.61,.36,1)',
          animation: 'mud-hero-kb 22s ease-in-out infinite alternate',
        }}
      />

      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          radial-gradient(100% 70% at 50% -10%, rgba(255, 210, 235, .35) 0%, transparent 55%),
          radial-gradient(60% 80% at 15% 100%, rgba(14,10,12,.82) 0%, rgba(14,10,12,.35) 40%, transparent 70%),
          linear-gradient(to top, rgba(14,10,12,.78) 0%, rgba(14,10,12,.15) 45%, rgba(14,10,12,0) 68%)
        `,
      }} />

      <div aria-hidden="true" style={{
        position: 'absolute', left: '-8%', bottom: '-15%', width: '70%', height: '90%', zIndex: 1,
        background: 'radial-gradient(closest-side, rgba(196,30,107,.35), transparent 70%)',
        filter: 'blur(30px)',
      }} />

      {/* Floating balloons — fewer and smaller on mobile */}
      {!isMobile && <FloatingBalloon size={48} color="#F472B6" top="18%" left="6%" delay={0} dur={9} />}
      <FloatingBalloon size={isMobile ? 28 : 36} color="#FBCFE8" top="30%" left="90%" delay={1.5} dur={11} />
      {!isMobile && <FloatingBalloon size={56} color="#C41E6B" top="60%" left="88%" delay={0.8} dur={10} />}
      {!isMobile && <FloatingBalloon size={28} color="#E4C978" top="68%" left="4%" delay={2.2} dur={12} />}
      <FloatingBalloon size={isMobile ? 28 : 40} color="#B79CD1" top="14%" left={isMobile ? '82%' : '78%'} delay={0.4} dur={13} />

      <HeroMarquee />

      {/* Side vertical labels — hidden on mobile (they'd eat content space) */}
      {!isMobile && (
        <div aria-hidden="true" style={{
          position: 'absolute', left: 'clamp(20px, 3vw, 40px)', top: '52%', transform: 'translateY(-50%)',
          zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          color: 'rgba(255,255,255,.8)',
        }}>
          <span style={{ width: 1, height: 64, background: 'rgba(255,255,255,.4)' }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 10,
            letterSpacing: '.4em', textTransform: 'uppercase',
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          }}>Salt Lake City · Utah</span>
          <span style={{ width: 1, height: 64, background: 'rgba(255,255,255,.4)' }} />
        </div>
      )}

      {!isMobile && (
        <a
          href="https://instagram.com/missutahdecor"
          target="_blank"
          rel="noreferrer"
          style={{
            position: 'absolute', right: 'clamp(20px, 3vw, 40px)', top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            color: 'rgba(255,255,255,.85)', textDecoration: 'none',
          }}
        >
          <span style={{ width: 1, height: 56, background: 'rgba(255,255,255,.4)' }} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 10,
            letterSpacing: '.4em', textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}>@missutahdecor</span>
          <span style={{ width: 1, height: 56, background: 'rgba(255,255,255,.4)' }} />
        </a>
      )}

      {/* Main content — bottom-left anchored */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', alignItems: 'flex-end',
        padding: `0 clamp(20px, 4vw, 72px) clamp(40px, 6vw, 88px)`,
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20,
            animation: 'mud-hero-rise 700ms 100ms cubic-bezier(.22,.61,.36,1) both',
          }}>
            <span style={{ width: 40, height: 1, background: 'var(--pink-200)' }} />
            <span style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              fontSize: isMobile ? 10 : 11, letterSpacing: '.36em', textTransform: 'uppercase',
              color: 'var(--pink-100)',
              textShadow: '0 1px 10px rgba(0,0,0,.5)',
            }}>Utah's Premier Balloon &amp; Event Decor</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: isMobile ? 'clamp(40px, 12vw, 58px)' : 'clamp(58px, 9vw, 148px)',
            lineHeight: .88,
            letterSpacing: '-.005em', textTransform: 'uppercase',
            color: '#fff', margin: 0, maxWidth: 1100,
            textShadow: '0 3px 30px rgba(0,0,0,.55)',
            animation: 'mud-hero-rise 900ms 250ms cubic-bezier(.22,.61,.36,1) both',
          }}>
            <span style={{ display:'block', overflow: 'hidden' }}>
              <span style={{ display:'inline-block', animation: 'mud-hero-rise 900ms 300ms cubic-bezier(.22,.61,.36,1) both' }}>Your Party,</span>
            </span>
            <span style={{ display:'block', overflow: 'hidden' }}>
              <span style={{ display:'inline-block', animation: 'mud-hero-rise 900ms 420ms cubic-bezier(.22,.61,.36,1) both' }}>
                <span style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #FBCFE8 60%, #F472B6 100%)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Unforgettable.</span>
              </span>
            </span>
          </h1>

          <div style={{
            marginTop: 14, maxWidth: 680,
            fontFamily: 'var(--font-script)', fontSize: isMobile ? 'clamp(28px, 6vw, 40px)' : 'clamp(36px, 4vw, 56px)',
            lineHeight: 1, color: 'var(--pink-200)',
            textShadow: '0 2px 20px rgba(0,0,0,.55)',
            animation: 'mud-hero-rise 900ms 600ms cubic-bezier(.22,.61,.36,1) both',
          }}>
            we don't just make balloons — we make memories.
          </div>

          {/* CTA row */}
          <div style={{
            marginTop: isMobile ? 28 : 40,
            display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
            animation: 'mud-hero-rise 900ms 780ms cubic-bezier(.22,.61,.36,1) both',
          }}>
            <Button variant="primary" size={isMobile ? 'md' : 'xl'} onClick={onCTA}>
              Lets Party
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </Button>
            <a
              href="tel:+13854395050"
              style={{
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 4px',
              }}
            >
              <span style={{
                width: 38, height: 38, borderRadius: 999, display: 'grid', placeItems: 'center',
                border: '1.5px solid rgba(255,255,255,.5)',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              {!isMobile && (
                <span>
                  Call (385) 439-5050
                  <span style={{ display:'block', fontWeight: 400, fontSize: 10, letterSpacing: '.14em', opacity: .75, marginTop: 3 }}>
                    or text — we answer fast
                  </span>
                </span>
              )}
            </a>
          </div>

          {/* Trust stats */}
          <div style={{
            marginTop: isMobile ? 32 : 56,
            display: 'flex', gap: 'clamp(20px, 4vw, 56px)', flexWrap: 'wrap',
            animation: 'mud-hero-rise 900ms 960ms cubic-bezier(.22,.61,.36,1) both',
          }}>
            {[
              ['24h', 'Quote turnaround'],
              ['7 days', 'Weekly availability'],
              ['All Utah', 'Delivery & setup'],
            ].map(([k, v]) => (
              <div key={k} style={{ color: 'rgba(255,255,255,.9)' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: isMobile ? 18 : 22,
                  color: '#fff',
                }}>{k}</div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 10,
                  letterSpacing: '.2em', textTransform: 'uppercase',
                  color: 'var(--pink-100)', marginTop: 4,
                }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll nudge — desktop only */}
      {!isMobile && (
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 24, right: 'clamp(72px, 6vw, 110px)', zIndex: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: '#fff', opacity: .7,
        }}>
          <span style={{ fontSize: 9, letterSpacing: '.36em', textTransform: 'uppercase' }}>Scroll</span>
          <span style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, #fff, transparent)', animation: 'mud-scroll-tick 1.8s ease-in-out infinite' }} />
        </div>
      )}

      <style>{`
        @keyframes mud-hero-kb {
          0%   { transform: scale(1.08) translate3d(0,0,0); }
          100% { transform: scale(1.18) translate3d(-1.5%,-1.5%,0); }
        }
        @keyframes mud-hero-rise {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mud-scroll-tick {
          0%,100% { transform: scaleY(1); opacity: .35; }
          50%     { transform: scaleY(1.5); opacity: 1; }
        }
        @keyframes mud-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
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

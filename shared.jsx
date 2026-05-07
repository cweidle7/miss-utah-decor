// Miss Utah Decor — shared bits (logo, buttons, header, footer, section intro)

const useBreakpoint = () => {
  const [w, setW] = React.useState(() => window.innerWidth);
  React.useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return { isMobile: w <= 640, isTablet: w <= 1024 };
};

const Logo = ({ height = 48, invert = false }) => {
  if (invert) {
    return (
      <a href="#home" onClick={(e)=>{e.preventDefault(); window.MUD_nav?.('home')}}
         style={{ display:'inline-flex', flexDirection:'column', textDecoration: 'none', lineHeight: 1 }}>
        <span style={{
          fontFamily: 'var(--font-script)', fontWeight: 400,
          fontSize: height * 0.95, color: '#fff', lineHeight: .9,
          textShadow: '0 2px 14px rgba(0,0,0,.45)',
          whiteSpace: 'nowrap',
        }}>Miss Utah</span>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700,
          fontSize: height * 0.17, color: '#fff', letterSpacing: '.4em',
          textTransform: 'uppercase', marginTop: 4, marginLeft: height * 0.25,
          textShadow: '0 1px 8px rgba(0,0,0,.5)',
        }}>Decor</span>
      </a>
    );
  }
  return (
    <a href="#home" onClick={(e)=>{e.preventDefault(); window.MUD_nav?.('home')}} style={{ display: 'inline-block', textDecoration: 'none' }}>
      <img src="assets/logo.png" alt="Miss Utah Decor" style={{ height, display: 'block' }} />
    </a>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', onClick, href, style: extraStyle = {} }) => {
  const base = {
    fontFamily: 'var(--font-sans)', fontWeight: 700,
    letterSpacing: '.14em', textTransform: 'uppercase',
    borderRadius: '999px', border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    transition: 'transform 260ms cubic-bezier(.34,1.56,.64,1), background 120ms, box-shadow 260ms',
    textDecoration: 'none', whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { fontSize: 11, padding: '11px 20px' },
    md: { fontSize: 12, padding: '16px 30px' },
    lg: { fontSize: 13, padding: '20px 38px' },
    xl: { fontSize: 14, padding: '24px 44px' },
  };
  const variants = {
    primary:    { background: 'var(--pink-500)', color: '#fff', boxShadow: '0 14px 38px rgba(236,72,153,.45), 0 2px 0 rgba(255,255,255,.25) inset' },
    ghost:      { background: 'transparent', color: 'var(--pink-500)', border: '2px solid var(--pink-500)' },
    ghostWhite: { background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.7)' },
    dark:       { background: 'var(--ink)', color: '#fff', boxShadow: 'var(--shadow-md)' },
    white:      { background: '#fff', color: 'var(--fg-1)', boxShadow: 'var(--shadow-md)' },
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={e=>{
        e.currentTarget.style.transform='translateY(-3px)';
        if (variant==='primary') e.currentTarget.style.boxShadow='0 20px 48px rgba(236,72,153,.55), 0 2px 0 rgba(255,255,255,.3) inset';
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.transform='translateY(0)';
        if (variant==='primary') e.currentTarget.style.boxShadow='0 14px 38px rgba(236,72,153,.45), 0 2px 0 rgba(255,255,255,.25) inset';
      }}
      style={{ ...base, ...sizes[size], ...variants[variant], ...extraStyle }}
    >
      {children}
    </Tag>
  );
};

const Header = ({ current, onNav, overlay = false }) => {
  const { isMobile, isTablet } = useBreakpoint();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on resize to desktop
  React.useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const solid = !overlay || scrolled;
  const ink = solid ? 'var(--ink)' : '#fff';
  const navItems = [['What We Make','offer'],['Packages','packages'],['Our Story','story']];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: solid ? 'rgba(255,255,255,.92)' : 'transparent',
      backdropFilter: solid ? 'blur(14px) saturate(1.2)' : 'none',
      WebkitBackdropFilter: solid ? 'blur(14px) saturate(1.2)' : 'none',
      borderBottom: solid ? '1px solid var(--border-1)' : '1px solid transparent',
      transition: 'background 260ms ease, border-color 260ms',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        padding: '18px clamp(20px, 4vw, 56px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
      }}>
        <Logo height={scrolled ? 40 : isMobile ? 44 : 56} invert={!solid} />

        {/* Desktop / tablet center nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 28, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {navItems.map(([label, key]) => (
              <a key={key} href={`#${key}`}
                 onClick={(e)=>{e.preventDefault(); onNav?.(key)}}
                 style={{
                   fontFamily: 'var(--font-sans)', fontWeight: 600,
                   fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase',
                   color: ink, textDecoration: 'none', whiteSpace: 'nowrap',
                   borderBottom: current === key ? `1.5px solid ${solid ? 'var(--pink-500)' : '#fff'}` : '1.5px solid transparent',
                   paddingBottom: 4, transition: 'color 220ms, border-color 160ms',
                   textShadow: solid ? 'none' : '0 1px 6px rgba(0,0,0,.35)',
                 }}>{label}</a>
            ))}
          </nav>
        )}

        {/* Desktop right actions */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexShrink: 0 }}>
            {!isTablet && (
              <a href="tel:+13854395050" style={{
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '.14em',
                textTransform: 'uppercase', color: ink, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                textShadow: solid ? 'none' : '0 1px 6px rgba(0,0,0,.35)',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (385) 439-5050
              </a>
            )}
            <Button variant="primary" size="sm" onClick={() => onNav?.('contact')}>Book Your Date</Button>
          </div>
        )}

        {/* Mobile: CTA pill + hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button variant="primary" size="sm" onClick={() => { setMenuOpen(false); onNav?.('contact'); }}>Book</Button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: ink, padding: '6px', display: 'grid', placeItems: 'center',
                borderRadius: 8,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
                }
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile slide-down nav */}
      {isMobile && menuOpen && (
        <nav style={{
          background: 'rgba(255,255,255,.97)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderTop: '1px solid var(--border-1)',
          padding: '8px clamp(20px,4vw,56px) 20px',
          display: 'flex', flexDirection: 'column',
        }}>
          {navItems.map(([label, key]) => (
            <a key={key} href={`#${key}`}
               onClick={(e)=>{e.preventDefault(); setMenuOpen(false); onNav?.(key);}}
               style={{
                 fontFamily: 'var(--font-sans)', fontWeight: 600,
                 fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase',
                 color: 'var(--ink)', textDecoration: 'none',
                 padding: '14px 0',
                 borderBottom: '1px solid var(--border-1)',
               }}>{label}</a>
          ))}
          <a href="tel:+13854395050"
             style={{
               fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, letterSpacing: '.14em',
               textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none',
               padding: '14px 0',
               display: 'inline-flex', alignItems: 'center', gap: 10,
             }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            (385) 439-5050
          </a>
        </nav>
      )}
    </header>
  );
};

const SectionIntro = ({ eyebrow, title, subtitle, align = 'center', invert = false, scriptWord, marginBottom = 56 }) => (
  <div style={{ textAlign: align, marginBottom, maxWidth: align === 'center' ? 760 : 'none', marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
    <div style={{
      fontFamily: 'var(--font-sans)', fontWeight: 500,
      fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase',
      color: invert ? 'var(--pink-200)' : 'var(--pink-500)',
      display: 'inline-flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ width: 28, height: 1, background: 'currentColor', display:'inline-block' }} />
      {eyebrow}
      <span style={{ width: 28, height: 1, background: 'currentColor', display:'inline-block' }} />
    </div>
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 800,
      fontSize: 'clamp(28px, 4.4vw, 58px)', lineHeight: 1.02,
      letterSpacing: '.005em', textTransform: 'uppercase',
      color: invert ? '#fff' : 'var(--fg-1)',
      margin: '14px 0 0',
    }}>
      {title}
      {scriptWord && (
        <> <span style={{
          fontFamily: 'var(--font-script)', fontWeight: 400,
          fontSize: '1.25em', textTransform: 'none', letterSpacing: 0,
          color: invert ? 'var(--pink-200)' : 'var(--pink-500)',
          verticalAlign: 'baseline',
        }}>{scriptWord}</span></>
      )}
    </h2>
    {subtitle && (
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
        fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.55,
        color: invert ? 'rgba(255,255,255,.85)' : 'var(--fg-2)',
        marginTop: 18,
      }}>{subtitle}</p>
    )}
  </div>
);

const Footer = () => {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <footer style={{ background: 'var(--ink)', color: '#F3D9E1', padding: 'clamp(48px,8vw,72px) clamp(20px,4vw,56px) 32px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(40% 60% at 90% 10%, rgba(236,72,153,.18), transparent 60%), radial-gradient(30% 50% at 10% 100%, rgba(196,30,107,.18), transparent 60%)',
      }} />
      <div style={{
        position: 'relative', maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr',
        gap: isMobile ? '32px 24px' : 48, alignItems: 'flex-start',
      }}>
        <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: isMobile ? 48 : 64, color: '#fff', lineHeight: .95, marginBottom: 4 }}>Miss Utah Decor</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '.3em', color: 'var(--pink-200)', textTransform: 'uppercase', marginBottom: 18 }}>Est. 2014 · Salt Lake City</div>
          <p style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.6, color: '#F3D9E1', opacity: .85 }}>
            Balloon installations, backdrops, florals, and grab-and-go party kits for every Utah celebration.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--pink-300)', marginBottom: 14 }}>Explore</div>
          {['Backdrops','Balloon arches','Florals',"Grab 'n Go","Packages"].map(x=>(
            <div key={x} style={{ fontSize: 14, marginBottom: 8 }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>{x}</a></div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--pink-300)', marginBottom: 14 }}>Studio</div>
          {['Our Story','Featured on TV','Reviews','Contact'].map(x=>(
            <div key={x} style={{ fontSize: 14, marginBottom: 8 }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>{x}</a></div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--pink-300)', marginBottom: 14 }}>Say hi</div>
          <div style={{ fontSize: 14, marginBottom: 8, color: '#fff' }}>(385) 439-5050</div>
          <div style={{ fontSize: 14, marginBottom: 8, color: '#fff' }}>Missutahdecor@gmail.com</div>
          <div style={{ fontSize: 14, color: '#fff' }}>@missutahdecor</div>
        </div>
      </div>
      <div style={{
        position: 'relative', maxWidth: 1280, margin: '48px auto 0',
        borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 20,
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', gap: 8,
        fontSize: 12, color: '#F3D9E1', opacity: .7,
      }}>
        <div>© 2026 Miss Utah Decor · Made with love in Utah</div>
        <div>Serving all of Utah: SLC · Provo · Park City · Ogden</div>
      </div>
    </footer>
  );
};

Object.assign(window, { useBreakpoint, Logo, Button, Header, SectionIntro, Footer });

// Miss Utah Decor — Homepage content sections (trust strip, offerings, packages, testimonials, make-it, insta, contact)

const IMG = {
  archTall:    'assets/gallery/balloon-arch-pink-silver.jpg',
  backdrops:   'assets/gallery/backdrop-sage-its-a-boy.jpg',
  florals:     'assets/gallery/bouquet-roses-handheld.jpg',
  milestone:   'assets/gallery/milestone-50-pastel.jpg',
  grabgo:      'assets/gallery/balloon-bouquet-welcome-home.jpg',
  featureMake: 'assets/press/tv-good-things-utah-edit.png',
  tvApp:       'assets/press/Good%20Things%20Utah%20Logo.png',
  ig1:         'assets/gallery/babyshower-oh-baby.jpg',
  ig2:         'assets/gallery/gender-reveal-boy-or-girl.jpg',
  ig3:         'assets/gallery/milestone-50-pastel.jpg',
  ig4:         'assets/gallery/balloon-arch-pink-silver.jpg',
};

// Alt text paired by key — used by components that render background-image divs
// so screen readers still get meaningful descriptions via aria-label.
const ALT = {
  archTall:    'Pink and silver balloon arch with neon Happy Birthday sign and disco wall',
  backdrops:   'Sage green and cream balloon backdrop with an It’s a Boy cart',
  florals:     'Hand-tied red rose bouquet wrapped in cream paper',
  milestone:   'Pastel pink and lavender 50th birthday balloon arch with marquee numbers',
  grabgo:      'Silver and gold Welcome Home balloon bouquet for a military homecoming',
  featureMake: 'Miss Utah Decor mother-daughter team on the Good Things Utah TV set',
  tvApp:       'Good Things Utah show logo',
  ig1:         'Oh Baby! welcome sign and balloon backdrop for a baby shower',
  ig2:         'Boy or Girl gender reveal balloon arch with bulldog',
  ig3:         'Pastel surprise 50th party balloon arch with lit numbers',
  ig4:         'Pink and silver disco-themed balloon arch with star foils',
};

const TrustStrip = () => {
  const { isMobile } = useBreakpoint();
  const stats = [
    { num: '10+', label: 'Years crafting parties' },
    { num: '500+', label: 'Events decorated' },
    { num: '24h', label: 'Quote turnaround' },
    { num: '5★', label: 'Average review' },
  ];
  return (
    <section style={{ background: 'var(--cream)', padding: '36px clamp(20px,4vw,56px)', borderBottom: '1px solid var(--border-1)' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: 24, alignItems: 'center',
      }}>
        {stats.map((s, i) => (
          <div key={s.num} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            // On mobile 2-col: border on even items (col 2); on desktop: border on all but first
            borderLeft: (isMobile ? i % 2 !== 0 : i !== 0) ? '1px solid var(--border-2)' : 'none',
            paddingLeft: (isMobile ? i % 2 !== 0 : i !== 0) ? 24 : 0,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.2vw, 48px)', color: 'var(--pink-500)', lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-2)', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PinkBand = () => {
  const occasions = ['Weddings', 'Baby showers', 'Gender reveals', 'Quinceañeras', 'Milestone birthdays', 'Corporate events', 'Graduations', 'Bridal showers', 'Bat mitzvahs'];
  const row = [...occasions, ...occasions];
  return (
    <section style={{ background: 'var(--pink-500)', padding: '56px 0 48px', position: 'relative', overflow: 'hidden' }}>
      <style>{`@keyframes mud-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'radial-gradient(60% 80% at 50% 0%, rgba(255,255,255,.18), transparent 60%)' }} />
      <div style={{ position:'relative', maxWidth: 1080, margin: '0 auto', padding: '0 clamp(20px,4vw,56px)' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--pink-100)', marginBottom: 14 }}>The studio in one line</div>
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(15px, 1.8vw, 26px)', lineHeight: 1.35,
            color: '#fff', margin: 0, textWrap: 'pretty',
          }}>
            Over a decade turning empty rooms into <span style={{ fontFamily:'var(--font-script)', fontStyle:'normal', fontWeight:400, fontSize:'1.3em', color:'var(--cream)' }}>pure magic.</span> From small arches to full-venue installations, we bring every creative vision to life.
          </p>
        </div>
      </div>
      <div style={{ marginTop: 40, overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,.2)', borderBottom: '1px solid rgba(255,255,255,.2)', padding: '16px 0' }}>
        <div style={{ display:'flex', flexWrap:'nowrap', width:'max-content', gap: 40, animation:'mud-marquee 42s linear infinite' }}>
          {row.map((o, i) => (
            <span key={i} style={{
              fontFamily:'var(--font-display)', fontWeight: 700, fontStyle:'italic',
              fontSize: 'clamp(14px, 1.6vw, 22px)',
              color:'#fff', display:'inline-flex', alignItems:'center', gap: 40, flexShrink: 0,
            }}>
              {o}
              <span style={{ color:'var(--pink-200)', fontSize: 16, fontStyle:'normal' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryTile = ({ images = [], alts = [], label, copy, onClick, tall = false, isMobile = false, startDelay = 0 }) => {
  const [hover, setHover] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const intervalRef = React.useRef(null);

  // Initial rotation start, staggered by startDelay so cards don't all switch at once
  React.useEffect(() => {
    if (images.length <= 1) return;
    const t = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setActiveIdx(i => (i + 1) % images.length);
      }, 6000);
    }, startDelay);
    return () => { clearTimeout(t); clearInterval(intervalRef.current); };
  }, [images.length, startDelay]);

  // Pause on hover, resume immediately on leave
  React.useEffect(() => {
    if (images.length <= 1) return;
    if (hover) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setActiveIdx(i => (i + 1) % images.length);
      }, 6000);
    }
  }, [hover, images.length]);

  return (
    <a href="#" onClick={(e)=>{e.preventDefault(); onClick?.()}}
       onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
       aria-label={`${label}: ${copy}`}
       style={{
         textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', gap: 18,
         cursor:'pointer',
         gridRow: (!isMobile && tall) ? 'span 2' : 'auto',
       }}>
      <div style={{
        position:'relative',
        width:'100%',
        aspectRatio: (!isMobile && tall) ? '0.85 / 1.3' : '1 / 1.05',
        borderRadius: 18, boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition:'all 400ms cubic-bezier(.22,.61,.36,1)',
        overflow:'hidden',
      }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={i === 0 ? (alts[0] || '') : ''} aria-hidden={i !== 0 || undefined}
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', objectPosition:'center',
              opacity: i === activeIdx ? 1 : 0,
              transition:'opacity 0.8s ease-in-out',
              willChange:'opacity',
            }}
          />
        ))}
        <div aria-hidden="true" style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to top, rgba(14,10,12,.55) 0%, rgba(14,10,12,0) 50%)',
          zIndex: 1,
        }} />
        <div style={{
          position:'absolute', left: 20, bottom: 20, right: 20,
          display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 12,
          color:'#fff', zIndex: 2,
        }}>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize: (!isMobile && tall) ? 36 : 24, textTransform:'uppercase', letterSpacing:'.01em', lineHeight: 1 }}>{label}</div>
            <div style={{ fontFamily:'var(--font-sans)', fontWeight: 400, fontSize: 13, marginTop: 8, opacity:.9, maxWidth: 280 }}>{copy}</div>
          </div>
          <span style={{
            width: 40, height: 40, borderRadius: 999, background:'#fff', color:'var(--pink-500)',
            display:'grid', placeItems:'center', flexShrink: 0,
            transform: hover ? 'translateX(4px) scale(1.08)' : 'translateX(0) scale(1)',
            transition:'transform 300ms cubic-bezier(.34,1.56,.64,1)',
            boxShadow: '0 6px 16px rgba(0,0,0,.25)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </span>
        </div>
        {images.length > 1 && (
          <div aria-hidden="true" style={{
            position:'absolute', bottom: 8, left:0, right:0,
            display:'flex', justifyContent:'center', alignItems:'center', gap: 5,
            zIndex: 3, pointerEvents:'none',
          }}>
            {images.map((_, i) => (
              <button key={i} onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); setActiveIdx(i); }}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                style={{
                  width: i === activeIdx ? 8 : 6, height: i === activeIdx ? 8 : 6,
                  borderRadius:'50%',
                  background: i === activeIdx ? '#fff' : 'rgba(255,255,255,.4)',
                  border:'none', padding:0, cursor:'pointer',
                  transition:'all 0.25s ease', flexShrink:0,
                  pointerEvents:'auto', outline:'none',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

const CategoryGrid = ({ onPick }) => {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1.2fr 1fr 1fr';
  return (
    <section id="offer" style={{ padding: 'clamp(64px,10vw,128px) clamp(20px,4vw,56px)', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionIntro eyebrow="What We Make" title="Decor for every" scriptWord="celebration" subtitle="Pick a canvas. We'll build the rest around your colors, venue, and vibe." />
        <div style={{ display:'grid', gridTemplateColumns: cols, gridTemplateRows:'auto', gap: isMobile ? 20 : 28 }}>
          {/* Balloon Garlands — balloon-arch-pink-silver.jpg, first-bday-circus-tent.jpg, first-bday-train-blue-white.jpg */}
          <CategoryTile tall={!isMobile} isMobile={isMobile} startDelay={0}
            images={['assets/gallery/balloon-arch-pink-silver.jpg','assets/gallery/first-bday-circus-tent.jpg','assets/gallery/first-bday-train-blue-white.jpg']}
            alts={['Pink and silver balloon garland with neon Happy Birthday sign and disco wall']}
            label="Balloon Garlands" copy="Floor-standing, ceiling, full rooms. Our signature." onClick={()=>onPick?.('balloons')} />
          {/* Backdrops — backdrop-sage-its-a-boy.jpg, spring-in-bloom/backdrop-front.jpg, spring-in-bloom/backdrop-wide.jpg */}
          <CategoryTile isMobile={isMobile} startDelay={1500}
            images={['assets/gallery/backdrop-sage-its-a-boy.jpg','assets/gallery/spring-in-bloom/backdrop-front.jpg','assets/gallery/spring-in-bloom/backdrop-wide.jpg']}
            alts={["Sage green and cream balloon backdrop with an It's a Boy cart"]}
            label="Backdrops" copy="Welcome signs, photo walls, marquee letters." onClick={()=>onPick?.('backdrops')} />
          {/* Florals — bouquet-roses-handheld.jpg, wedding-burgundy-cream-florals.jpg */}
          <CategoryTile isMobile={isMobile} startDelay={3000}
            images={['assets/gallery/bouquet-roses-handheld.jpg','assets/gallery/wedding-burgundy-cream-florals.jpg']}
            alts={['Hand-tied red rose bouquet wrapped in cream paper']}
            label="Florals" copy="Fresh & faux arrangements to match any palette." onClick={()=>onPick?.('florals')} />
          {/* Milestone Numbers — milestone-50-pastel.jpg, marquee-8th-birthday-pink-purple.jpg, marquee-name-anavay-lavender.jpg */}
          <CategoryTile isMobile={isMobile} startDelay={4500}
            images={['assets/gallery/milestone-50-pastel.jpg','assets/gallery/marquee-8th-birthday-pink-purple.jpg','assets/gallery/marquee-name-anavay-lavender.jpg']}
            alts={['Pastel pink and lavender 50th birthday balloon arch with marquee numbers']}
            label="Milestone Numbers" copy="Marquee 30s, 40s, 50s. Lit up and photo-ready." onClick={()=>onPick?.('milestone')} />
          <CategoryTile isMobile={isMobile} startDelay={6000}
            images={['assets/gallery/balloon-bouquet-welcome-home.jpg','assets/gallery/balloon-bouquet-welcome-home.jpg']}
            alts={['Silver and gold Welcome Home balloon bouquet for a military homecoming']}
            label="Grab 'n Go" copy="Pre-built kits for smaller at-home celebrations." onClick={()=>onPick?.('grabgo')} />
        </div>
      </div>
    </section>
  );
};

const PackageCard = ({ tier, price, badge, bullets, featured, onCTA }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{
        position:'relative',
        background: featured ? 'var(--pink-500)' : '#fff',
        color: featured ? '#fff' : 'var(--fg-1)',
        borderRadius: 22,
        padding: '40px 32px 32px',
        boxShadow: featured ? '0 24px 60px rgba(236,72,153,.35)' : hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        border: featured ? '1px solid rgba(255,255,255,.3)' : '1px solid var(--border-1)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition:'transform 300ms cubic-bezier(.22,.61,.36,1), box-shadow 300ms',
        display:'flex', flexDirection:'column',
      }}
    >
      {badge && (
        <div style={{
          position:'absolute', top: -14, left: '50%', transform:'translateX(-50%)',
          fontFamily:'var(--font-sans)', fontWeight:700, fontSize: 10, letterSpacing:'.22em', textTransform:'uppercase',
          background: featured ? '#fff' : 'var(--ink)', color: featured ? 'var(--pink-500)' : '#fff',
          padding: '7px 16px', borderRadius: 999,
          boxShadow:'0 6px 16px rgba(0,0,0,.18)',
          whiteSpace: 'nowrap',
        }}>{badge}</div>
      )}
      <div style={{
        fontFamily:'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing:'.24em', textTransform:'uppercase',
        color: featured ? 'var(--pink-100)' : 'var(--pink-500)',
      }}>{tier}</div>
      <div style={{
        fontFamily:'var(--font-display)', fontWeight: 800, fontSize: 56, lineHeight: 1,
        margin: '10px 0 6px',
      }}>{price}<span style={{ fontSize: 16, fontWeight: 500, opacity: .75, marginLeft: 6 }}>starting</span></div>
      <div style={{ width: 48, height: 1, background: featured ? 'rgba(255,255,255,.45)' : 'var(--border-2)', margin: '16px 0 22px' }} />
      <ul style={{ listStyle:'none', padding:0, margin: 0, display:'flex', flexDirection:'column', gap: 12, flex: 1 }}>
        {bullets.map((b) => (
          <li key={b} style={{ fontSize: 14, lineHeight: 1.5, display:'flex', gap: 10, alignItems:'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={featured ? '#fff' : 'var(--pink-500)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onCTA}
        style={{
          marginTop: 28,
          fontFamily:'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing:'.16em', textTransform:'uppercase',
          padding:'16px 20px', borderRadius: 999, border:'none', cursor:'pointer',
          background: featured ? '#fff' : 'var(--pink-500)',
          color: featured ? 'var(--pink-500)' : '#fff',
          boxShadow: featured ? '0 6px 18px rgba(0,0,0,.2)' : '0 10px 26px rgba(236,72,153,.35)',
          transition:'transform 200ms cubic-bezier(.34,1.56,.64,1)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
      >Reserve this package</button>
    </div>
  );
};

const Packages = ({ onCTA }) => {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <section id="packages" style={{ padding: 'clamp(64px,10vw,128px) clamp(20px,4vw,56px)', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionIntro eyebrow="Party packages" title="Everything you need," scriptWord="nothing you don't." subtitle="Transparent pricing to start the conversation. Every package is fully customized to your colors, theme, and venue." />
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : 'repeat(3, 1fr)',
          gap: 28, marginTop: 40,
          maxWidth: isMobile || isTablet ? 520 : 'none',
          marginLeft: 'auto', marginRight: 'auto',
        }}>
          <PackageCard
            tier="Sweet"
            price="$350"
            bullets={[
              '6–8 ft balloon garland in your palette',
              'Up to 3 coordinating colors',
              'Delivery within Salt Lake County',
              'Setup and teardown included',
              'Perfect for at-home showers & birthdays',
            ]}
            onCTA={onCTA}
          />
          <PackageCard
            tier="Signature"
            price="$850"
            badge="★ Most booked"
            featured
            bullets={[
              '12 ft arch or backdrop installation',
              'Up to 5 colors + metallic accents',
              'Included florals or marquee numbers',
              'Neon sign (rental, your choice of phrase)',
              'Statewide delivery & full styling',
            ]}
            onCTA={onCTA}
          />
          <PackageCard
            tier="Grand Event"
            price="$1,800"
            bullets={[
              'Full venue installation, ceiling to floor',
              'Custom backdrop build + signage',
              'Fresh florals, marquee, lighting',
              'On-site stylist for the full event',
              'Tear-down the following morning',
            ]}
            onCTA={onCTA}
          />
        </div>
        <p style={{ textAlign:'center', marginTop: 32, fontSize: 14, color:'var(--fg-2)' }}>
          Need something bigger or smaller? <a href="#contact" onClick={(e)=>{e.preventDefault(); onCTA?.()}} style={{ color:'var(--pink-500)', fontWeight: 600 }}>Let's build a custom quote →</a>
        </p>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const quotes = [
    { q: "We walked into the venue and my mom cried. Miss Utah Decor turned my quinceañera into something out of a movie.", name: 'Valeria G.', role: 'Quinceañera · Sandy', accent: 'var(--lavender)' },
    { q: "They showed up, set up, tore down. Every detail was exactly what I asked for, plus things I didn't even think of.", name: 'Brittney W.', role: 'Baby Shower · Provo', accent: 'var(--blush)' },
    { q: "Best decor team in Utah, hands down. I've booked them three times and will book again for every milestone.", name: 'Michelle R.', role: 'Milestone 40 · SLC', accent: 'var(--peach)' },
  ];
  return (
    <section style={{ padding: 'clamp(64px,10vw,120px) clamp(20px,4vw,56px)', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionIntro eyebrow="Kind words" title="Our clients keep" scriptWord="coming back." />
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {quotes.map((q, i) => (
            <div key={i} style={{
              background:'var(--bg-3)', borderRadius: 18, padding: 32,
              display:'flex', flexDirection:'column', gap: 20,
              borderTop:`3px solid ${q.accent}`,
              boxShadow:'var(--shadow-sm)',
            }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize: 64, lineHeight: .6, color:'var(--pink-500)', fontWeight: 800 }}>"</div>
              <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18, lineHeight: 1.5, color:'var(--fg-1)', margin: 0, flex:1 }}>
                {q.q}
              </p>
              <div style={{ display:'flex', alignItems:'center', gap: 14, paddingTop: 12, borderTop:'1px solid var(--border-1)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: q.accent, display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontWeight: 800, color:'var(--ink)', flexShrink: 0 }}>{q.name[0]}</div>
                <div>
                  <div style={{ fontFamily:'var(--font-sans)', fontWeight: 700, fontSize: 13 }}>{q.name}</div>
                  <div style={{ fontFamily:'var(--font-sans)', fontWeight: 500, fontSize: 10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--fg-2)', marginTop: 2 }}>{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WeMakeIt = ({ onCTA }) => {
  const { isMobile, isTablet } = useBreakpoint();
  const stacked = isMobile || isTablet;
  return (
    <section id="story" style={{
      padding: 'clamp(64px,10vw,128px) clamp(20px,4vw,56px)',
      background: 'var(--bg-2)', position:'relative', overflow:'hidden',
    }}>
      <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'radial-gradient(40% 60% at 90% 10%, rgba(236,72,153,.08), transparent 70%)' }} />
      <div style={{
        position:'relative', maxWidth: 1280, margin: '0 auto',
        display:'grid',
        gridTemplateColumns: stacked ? '1fr' : '1fr 1fr',
        gap:'clamp(32px,6vw,96px)', alignItems:'center',
      }}>
        <div style={{ position:'relative' }}>
          <div role="img" aria-label={ALT.featureMake} style={{
            width:'100%', aspectRatio:'4/5',
            backgroundImage:`url(${IMG.featureMake})`, backgroundSize:'cover', backgroundPosition:'center',
            borderRadius: 24, boxShadow:'var(--shadow-lg)',
          }} />
          {/* "As seen on" badge — inside photo frame bottom-left on desktop, inline on mobile */}
          <div style={{
            position: stacked ? 'relative' : 'absolute',
            bottom: stacked ? 'auto' : 24,
            left: stacked ? 'auto' : 24,
            marginTop: stacked ? 16 : 0,
            background:'#fff', borderRadius: 18, padding: '18px 24px',
            boxShadow:'var(--shadow-lg)', display:'flex', alignItems:'center', gap: 16,
            maxWidth: 260,
          }}>
            <div role="img" aria-label={ALT.tvApp} style={{
              width: 72, height: 52, borderRadius: 10, flexShrink: 0,
              backgroundImage:`url(${IMG.tvApp})`, backgroundSize:'contain', backgroundPosition:'center', backgroundRepeat:'no-repeat',
            }} />
            <div>
              <div style={{ fontFamily:'var(--font-sans)', fontWeight:700, fontSize: 11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--pink-500)' }}>As seen on</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight: 700, fontSize: 17, color:'var(--ink)' }}>Good Things Utah</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing:'.24em', textTransform:'uppercase', color:'var(--pink-500)' }}>Our Story</div>
          <div style={{ fontFamily:'var(--font-script)', fontSize:'clamp(56px, 9vw, 120px)', lineHeight: .9, color:'var(--ink)', margin:'8px 0 4px' }}>We make it</div>
          <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize: 'clamp(20px, 2vw, 30px)', lineHeight:1.2, color:'var(--fg-1)', margin:'4px 0 20px', maxWidth: 520, textTransform:'none', letterSpacing: 0 }}>
            A mother-daughter studio, obsessed with the moment you walk in.
          </h3>
          <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18, lineHeight: 1.65, color:'var(--fg-1)', maxWidth: 520, margin:'0 0 18px' }}>
            We started in 2014 in our garage and grew into Utah's go-to balloon decor studio. Every event gets our full attention: the palette, the flow, the small flourishes no one else would notice.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color:'var(--fg-2)', maxWidth: 520, margin:'0 0 32px' }}>
            From backyard baby showers to on-camera segments for Good Things Utah, we treat every event like it's our own.
          </p>
          <div style={{ display:'flex', gap: 16, flexWrap:'wrap' }}>
            <Button variant="primary" size="md" onClick={onCTA}>Start your event</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const InstagramGrid = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const posts = [
    { src: IMG.ig1, alt: ALT.ig1, caption: 'Adding a backdrop is a good idea as welcome sign to your event. Just look how stunning this Mami is', tags: '#babyshower #welcomesign' },
    { src: IMG.ig2, alt: ALT.ig2, caption: 'Gender Reveal party, but a good boy stole the show at the reveal with his bows', tags: '#genderreveal' },
    { src: IMG.ig3, alt: ALT.ig3, caption: 'How delicate are these colors for a surprise 50 party', tags: '#50party #50balloons' },
    { src: IMG.ig4, alt: ALT.ig4, caption: 'Pastel dreams and marquee numbers. This 50th had us in our feelings', tags: '#milestone #50' },
  ];
  return (
    <section style={{ padding: 'clamp(64px,10vw,128px) clamp(20px,4vw,56px)', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 32, marginBottom: 40, flexWrap:'wrap' }}>
          <SectionIntro align="left" eyebrow="Follow along" title="Straight from" scriptWord="the studio" marginBottom={0} />
          <a href="https://instagram.com/missutahdecor" target="_blank" rel="noreferrer" style={{
            fontFamily:'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing:'.16em', textTransform:'uppercase',
            color:'var(--pink-500)', textDecoration:'none', display:'inline-flex', alignItems:'center', gap: 10,
            flexShrink: 0,
          }}>
            @missutahdecor
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div style={{
          display:'grid',
          gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 18,
        }}>
          {posts.map((p, i) => (
            <a key={i} href="https://instagram.com/missutahdecor" target="_blank" rel="noreferrer"
               style={{ textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', gap: 12 }}>
              <div role="img" aria-label={p.alt} style={{
                position:'relative',
                width:'100%', aspectRatio: '1', backgroundImage:`url(${p.src})`,
                backgroundSize:'cover', backgroundPosition:'center',
                borderRadius: 14, boxShadow:'var(--shadow-md)',
                overflow:'hidden',
                transition:'transform 300ms ease',
              }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.02)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >
                <div style={{
                  position:'absolute', top: 10, right: 10,
                  width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,.92)',
                  display:'grid', placeItems:'center', color: 'var(--pink-500)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color:'var(--fg-1)', margin:0 }}>{p.caption}</p>
              <span style={{ fontSize: 11, color:'var(--color-link)', fontWeight: 500 }}>{p.tags}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvajqnr';

const ContactBlock = ({ onSubmit }) => {
  const { isMobile } = useBreakpoint();
  const [form, setForm] = React.useState({ first:'', last:'', email:'', phone:'', eventType:'', date:'', eventName:'', address:'', city:'', gateCode:'', startTime:'', endTime:'', setupTime:'', indoorOutdoor:'Indoors', message:'' });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const labelStyle = { fontFamily:'var(--font-sans)', fontWeight: 600, fontSize: 12, color:'#fff', marginBottom: 6, display:'block', letterSpacing:'.08em' };
  const inputStyle = {
    fontFamily:'var(--font-sans)', fontSize: 15,
    padding:'14px 16px', border:'1.5px solid transparent',
    borderRadius: 8, background:'rgba(255,255,255,.95)', color:'var(--fg-1)',
    outline:'none', width:'100%', transition:'border-color 120ms, box-shadow 160ms',
  };
  const onFocus = e => { e.target.style.borderColor='#fff'; e.target.style.boxShadow='0 0 0 4px rgba(255,255,255,.25)'; };
  const onBlur  = e => { e.target.style.borderColor='transparent'; e.target.style.boxShadow='none'; };
  const Lab = ({ children, required }) => <label style={labelStyle}>{children}{required && <span style={{ color:'rgba(255,255,255,.6)', marginLeft: 3 }}>*</span>}</label>;
  const eventTypes = ['Baby shower', 'Gender reveal', 'Birthday', 'Quinceañera', 'Wedding', 'Corporate', 'Other'];
  const SectionDivider = ({ title, subtitle }) => (
    <div style={{ gridColumn:'1 / -1', borderTop:'1px solid rgba(255,255,255,.25)', paddingTop: 20, marginTop: 4 }}>
      <div style={{ fontFamily:'var(--font-sans)', fontWeight: 800, fontSize: 13, letterSpacing:'.14em', textTransform:'uppercase', color:'#fff' }}>{title}</div>
      {subtitle && <div style={{ fontFamily:'var(--font-sans)', fontSize: 11, color:'rgba(255,255,255,.6)', marginTop: 3, letterSpacing:'.06em' }}>{subtitle}</div>}
    </div>
  );
  // Returns wrapper style for a form field. full=true → spans both columns; false → responsive half-width
  const fieldWrap = (full) => ({ position:'relative', gridColumn: full || isMobile ? '1 / -1' : 'auto' });

  return (
    <section id="contact" style={{ padding:'clamp(64px,10vw,128px) clamp(20px,4vw,56px)', background:'#fff' }}>
      <div style={{
        maxWidth: 1280, margin:'0 auto',
        display:'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.15fr',
        gap:'clamp(32px,6vw,80px)', alignItems:'flex-start',
      }}>
        {/* Sticky only on desktop — on mobile it'd overlap the form */}
        <div style={{ position: isMobile ? 'static' : 'sticky', top: 120 }}>
          <div style={{ fontFamily:'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing:'.24em', textTransform:'uppercase', color:'var(--pink-500)', marginBottom: 14 }}>Say hello</div>
          <h2 style={{
            fontFamily:'var(--font-display)', fontWeight: 800, textTransform:'uppercase',
            fontSize:'clamp(36px,5.5vw,76px)', lineHeight:.95, color:'var(--ink)', margin: 0,
          }}>
            Let's make your<br />event <span style={{ fontFamily:'var(--font-script)', fontWeight:400, fontSize:'1.15em', textTransform:'none', letterSpacing: 0, color:'var(--pink-500)' }}>unforgettable.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color:'var(--fg-2)', marginTop: 24, maxWidth: 440 }}>
            Tell us about your event: date, venue, colors, whatever you have. We'll put together a custom quote within 24 hours.
          </p>
          <div style={{ marginTop: 32, display:'flex', flexDirection:'column', gap: 14 }}>
            {[
              ['📞', '(385) 439-5050', 'Call or text, we answer fast', 'tel:+13854395050'],
              ['✉️', 'Missutahdecor@gmail.com', 'Replies within 24h', 'mailto:Missutahdecor@gmail.com'],
              ['📍', 'Serving all of Utah', 'SLC · Provo · Park City · Ogden', null],
            ].map(([icon, bold, sub, href]) => (
              <a key={bold} href={href || '#'} onClick={(e)=>{ if(!href) e.preventDefault(); }} style={{ display:'flex', gap: 16, alignItems:'center', textDecoration:'none', color:'inherit' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background:'var(--bg-3)', display:'grid', placeItems:'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily:'var(--font-sans)', fontWeight: 700, fontSize: 15, color:'var(--ink)' }}>{bold}</div>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize: 12, color:'var(--fg-2)', letterSpacing:'.06em', marginTop: 2 }}>{sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSending(true);
            setError(null);
            try {
              const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                  name: `${form.first} ${form.last}`,
                  email: form.email,
                  phone: form.phone,
                  eventType: form.eventType,
                  eventDate: form.date,
                  eventName: form.eventName,
                  address: form.address,
                  city: form.city,
                  gateCode: form.gateCode,
                  startTime: form.startTime,
                  endTime: form.endTime,
                  setupTime: form.setupTime,
                  indoorOutdoor: form.indoorOutdoor,
                  message: form.message,
                }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data?.error || 'Submission failed');
              setSent(true);
              onSubmit?.(form);
            } catch {
              setError('Something went wrong. Please try again or email us directly.');
            } finally {
              setSending(false);
            }
          }}
          style={{
            background:'linear-gradient(145deg, var(--pink-500) 0%, var(--magenta-700) 100%)',
            padding:'clamp(24px, 3vw, 40px)',
            borderRadius: 22,
            boxShadow:'0 24px 60px rgba(196,30,107,.35)',
            display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px 16px',
            position:'relative', overflow:'hidden',
          }}
        >
          <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'radial-gradient(60% 40% at 100% 0%, rgba(255,255,255,.25), transparent 60%)', pointerEvents:'none' }} />
          {sent ? (
            <div style={{ gridColumn:'1 / -1', textAlign:'center', padding:'56px 0', color:'#fff', position:'relative' }}>
              <div style={{ fontFamily:'var(--font-script)', fontSize: isMobile ? 64 : 96, lineHeight: .9, color:'#fff' }}>Thank you!</div>
              <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 20, marginTop: 12 }}>We'll be in touch within 24 hours</p>
              <div style={{ marginTop: 24, fontFamily:'var(--font-sans)', fontSize: 12, letterSpacing:'.18em', textTransform:'uppercase' }}>Miss Utah Decor</div>
            </div>
          ) : (<>
            {/* Steps header */}
            <div style={{ gridColumn:'1 / -1', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12, marginBottom: 8 }}>
              {[
                { n:'1', label:'Submit your event details here' },
                { n:'2', label:'Work 1:1 with your balloon design expert' },
                { n:'3', label:'Approve your dream design and relax, we do the rest!' },
              ].map(({ n, label }) => (
                <div key={n} style={{ textAlign:'center', background:'rgba(255,255,255,.12)', borderRadius: 12, padding:'14px 10px' }}>
                  <div style={{ fontFamily:'var(--font-sans)', fontWeight: 800, fontSize: 11, letterSpacing:'.16em', textTransform:'uppercase', color:'#fff', marginBottom: 4 }}>Step {n}</div>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize: 11, color:'rgba(255,255,255,.8)', lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Contact Info — required */}
            <SectionDivider title="Your Contact Info" subtitle="Required" />
            <div style={fieldWrap(false)}>
              <Lab required>First name</Lab>
              <input value={form.first} onChange={e=>setForm({...form,first:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} required />
            </div>
            <div style={fieldWrap(false)}>
              <Lab required>Last name</Lab>
              <input value={form.last} onChange={e=>setForm({...form,last:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} required />
            </div>
            <div style={fieldWrap(true)}>
              <Lab required>Email</Lab>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} required />
            </div>
            <div style={fieldWrap(true)}>
              <Lab required>Phone</Lab>
              <input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} required />
            </div>

            {/* Event Info — optional */}
            <SectionDivider title="Event Info" subtitle="Optional, but helps us quote you faster" />
            <div style={fieldWrap(true)}>
              <Lab>Event type</Lab>
              <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
                {eventTypes.map(t => (
                  <button key={t} type="button" onClick={()=>setForm({...form, eventType: t})}
                    style={{
                      fontFamily:'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing:'.08em',
                      padding:'10px 16px', borderRadius: 999, cursor:'pointer',
                      border: form.eventType === t ? '1.5px solid #fff' : '1.5px solid rgba(255,255,255,.45)',
                      background: form.eventType === t ? '#fff' : 'transparent',
                      color: form.eventType === t ? 'var(--pink-500)' : '#fff',
                      transition:'all 160ms ease',
                    }}
                  >{t}</button>
                ))}
              </div>
            </div>
            <div style={fieldWrap(true)}>
              <Lab>Event name</Lab>
              <input value={form.eventName} onChange={e=>setForm({...form,eventName:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="e.g. Sofia's Quinceañera" />
            </div>
            <div style={fieldWrap(false)}>
              <Lab>Event date</Lab>
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>
            <div style={fieldWrap(false)}>
              <Lab>Indoors or outdoors?</Lab>
              <select value={form.indoorOutdoor} onChange={e=>setForm({...form,indoorOutdoor:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle}>
                <option>Indoors</option>
                <option>Outdoors</option>
                <option>Both</option>
              </select>
            </div>
            <div style={fieldWrap(false)}>
              <Lab>Event address</Lab>
              <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="Street address" />
            </div>
            <div style={fieldWrap(false)}>
              <Lab>City</Lab>
              <input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="City" />
            </div>
            <div style={fieldWrap(false)}>
              <Lab>Event start time</Lab>
              <input type="time" value={form.startTime} onChange={e=>setForm({...form,startTime:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>
            <div style={fieldWrap(false)}>
              <Lab>Event end time</Lab>
              <input type="time" value={form.endTime} onChange={e=>setForm({...form,endTime:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>
            <div style={fieldWrap(false)}>
              <Lab>Earliest setup time</Lab>
              <input type="time" value={form.setupTime} onChange={e=>setForm({...form,setupTime:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>
            <div style={fieldWrap(false)}>
              <Lab>Gate / access code</Lab>
              <input value={form.gateCode} onChange={e=>setForm({...form,gateCode:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="If applicable" />
            </div>
            <div style={fieldWrap(true)}>
              <Lab>Tell us the vibe</Lab>
              <textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} onFocus={onFocus} onBlur={onBlur} style={{...inputStyle, resize:'none'}} placeholder="Colors, theme, guest count, inspiration photos…" />
            </div>
            {error && (
              <div style={{ gridColumn:'1 / -1', background:'rgba(0,0,0,.25)', borderRadius: 10, padding:'12px 16px', color:'#fff', fontSize: 13, textAlign:'center' }}>
                {error}
              </div>
            )}
            <div style={{ gridColumn:'1 / -1', display:'flex', justifyContent:'center', marginTop: 10, position:'relative' }}>
              <button type="submit" disabled={sending} style={{
                fontFamily:'var(--font-sans)', fontWeight: 800,
                fontSize: 13, letterSpacing:'.18em', textTransform:'uppercase',
                color:'var(--pink-500)', background:'#fff', border:'none',
                borderRadius: 999, padding:'20px 44px',
                boxShadow:'0 10px 28px rgba(0,0,0,.2)', cursor: sending ? 'default' : 'pointer',
                opacity: sending ? 0.7 : 1,
                transition:'transform 220ms cubic-bezier(.34,1.56,.64,1), opacity 160ms',
                display:'inline-flex', alignItems:'center', gap: 10,
              }}
                onMouseEnter={e=>{ if (!sending) e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
              >
                {sending ? 'Sending…' : "Let's celebrate!"}
                {!sending && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
              </button>
            </div>
          </>)}
        </form>
      </div>
    </section>
  );
};

const StickyCTA = ({ onClick }) => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const handler = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <button
      onClick={onClick}
      style={{
        position:'fixed', bottom: 24, right: 24, zIndex: 40,
        fontFamily:'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
        background:'var(--pink-500)', color:'#fff', border:'none', cursor:'pointer',
        borderRadius: 999, padding:'16px 24px',
        boxShadow:'0 16px 40px rgba(236,72,153,.45)',
        display:'flex', alignItems:'center', gap: 10,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(80px) scale(.85)',
        opacity: show ? 1 : 0,
        transition:'transform 320ms cubic-bezier(.34,1.56,.64,1), opacity 320ms',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 999, background:'#fff', animation:'mud-pulse 1.8s ease-in-out infinite' }} />
      Book your date
    </button>
  );
};

Object.assign(window, { TrustStrip, PinkBand, CategoryGrid, Packages, Testimonials, WeMakeIt, InstagramGrid, ContactBlock, StickyCTA });

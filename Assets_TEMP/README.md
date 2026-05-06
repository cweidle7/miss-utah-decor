# Assets

Static assets for the Miss Utah Decor site. Folder structure groups files by use, not by file type. Cohesive multi-shot sets from a single event get their own subfolder under `gallery/`.

```
assets/
├── logo.png                                    Header / footer logo (PNG, transparent)
├── manifest.json                               Machine-readable index of every asset
├── README.md                                   This file
├── hero/
│   ├── hero.mp4                                Available — 720p ~1.1MB, no audio (current hero is image-only)
│   └── hero-poster.jpg                         Active hero — celestial blue/silver/purple Ken Burns
├── gallery/
│   ├── babyshower-oh-baby.jpg                  IG post 1
│   ├── backdrop-sage-its-a-boy.jpg             Backdrops tile + WeMakeIt feature
│   ├── balloon-arch-pink-silver.jpg            Balloon Arches tile + IG post 4
│   ├── balloon-bouquet-welcome-home.jpg        Grab 'n Go tile
│   ├── bouquet-roses-handheld.jpg              Florals tile
│   ├── disney-princess-belle-cinderella.jpg    Available
│   ├── disney-princess-once-upon-a-time.jpg    Available
│   ├── eid-mubarak-crescent-minimalist.jpg     Available
│   ├── eid-mubarak-mosque-emerald.jpg          Available
│   ├── engagement-she-said-yes-white.jpg       Available
│   ├── first-bday-circus-tent.jpg              Available
│   ├── first-bday-mermaid-carriage.jpg         Available — was uploaded as "new hero image"
│   ├── first-bday-mickey-mouse.jpg             Available
│   ├── first-bday-train-blue-white.jpg         Available
│   ├── gender-reveal-boy-or-girl.jpg           IG post 2
│   ├── marquee-8th-birthday-pink-purple.jpg    Available
│   ├── marquee-corporate-40-years.jpg          Available
│   ├── marquee-name-anavay-lavender.jpg        Available
│   ├── milestone-50-pastel.jpg                 Milestone Numbers tile + IG post 3
│   ├── outdoor-picnic-pastel-florals.jpg       Available
│   ├── valentines-all-you-need-is-love.jpg     Available
│   ├── wedding-burgundy-cream-florals.jpg      Available
│   └── spring-in-bloom/                        Easter event set (8 shots)
│       ├── backdrop-wide.jpg
│       ├── backdrop-front.jpg
│       ├── backdrop-angle.jpg
│       ├── portrait-butterfly.jpg
│       ├── florals-archway-cluster.jpg
│       ├── florals-corner.jpg
│       ├── butterfly-side.jpg
│       └── butterfly-wing-detail.jpg
└── press/
    └── tv-good-things-utah.jpg                 "As seen on" thumbnail in WeMakeIt
```

## Naming convention

`kebab-case-descriptive.jpg` — describe the content, not the source. The folder tells you the role; the filename tells you the subject.

Use category prefixes when they recur, so similar shots cluster alphabetically:

- `first-bday-*` — first birthday parties (theme follows the prefix)
- `marquee-*` — events anchored on lit marquee letters/numbers
- `eid-mubarak-*`, `valentines-*`, etc. — holiday-named events
- `wedding-*`, `engagement-*`, `babyshower-*`, `gender-reveal-*` — life-event categories

For multi-shot event sets (an Easter event with 8 shots, a wedding with 12, etc.), create a subfolder under `gallery/` named for the event in kebab-case. Inside, use role-prefixed names: `backdrop-`, `portrait-`, `florals-`, `detail-`. Keep the event name out of the inner filenames — the folder already says it.

## Adding a new asset

1. Drop the source in the matching subfolder. For event sets, create `gallery/<event-kebab>/`.
2. Run optimization:
   ```bash
   convert input.JPG -auto-orient -resize "1600x1600>" -strip -quality 82 -interlace Plane out.jpg
   ```
3. Add an entry to `manifest.json` with `path`, `type`, dimensions, `alt`, `used_in`, and `source`.
4. If wiring it into the site, reference it in `sections.jsx` via the `IMG` map and add matching `ALT` copy.

## HEIC files

Drop them in `_pending-conversion/` at the project root, then double-click `convert-heic.command` to batch-convert via macOS `sips` (HEIC isn't supported in this build pipeline). The script is re-runnable and skips files it's already processed.

## Why JPG over PNG for photos

JPG q82 progressive is 5–30× smaller than PNG for photographic content with no visible quality loss. PNG stays for the logo only (transparency).

## Optimization budget

| Use | Format | Max dimension | Target size |
| --- | --- | --- | --- |
| Logo | PNG | actual | <100 KB |
| Gallery photo | JPG q82 | 1600 px long edge | <500 KB |
| Hero poster | JPG q82 | 1280 px long edge | <250 KB |
| Hero video | H.264 yuv420p | 720p, faststart | <2 MB |

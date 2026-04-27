# Assets

Static assets for the Miss Utah Decor site. Folder structure groups files by use, not by file type.

```
assets/
├── logo.png                            Header / footer logo (PNG, transparent)
├── manifest.json                       Machine-readable index of every asset (alt, dims, usage)
├── README.md                           This file
├── hero/
│   ├── hero.mp4                        Desktop billboard video (720p, ~1.1MB, no audio)
│   └── hero-poster.jpg                 Poster frame; also used as mobile background
├── gallery/
│   ├── balloon-arch-pink-silver.jpg    Balloon Arches tile + IG post 4
│   ├── backdrop-sage-its-a-boy.jpg     Backdrops tile + WeMakeIt feature panel
│   ├── babyshower-oh-baby.jpg          Florals tile (placeholder) + IG post 1
│   ├── gender-reveal-boy-or-girl.jpg   Grab 'n Go tile + IG post 2
│   └── milestone-50-pastel.jpg         Milestone Numbers tile + IG post 3
└── press/
    └── tv-good-things-utah.jpg         "As seen on" thumbnail in WeMakeIt
```

## Adding a new asset

1. Drop the source file in the matching subfolder (`gallery/`, `press/`, etc.).
2. Name it `kebab-case-descriptive.jpg` — describe content, not source (`balloon-arch-pink-silver.jpg`, not `IMG_7565.jpg`).
3. Optimize before committing:
   ```bash
   # photos: convert to JPG, max 1600px, q82 progressive
   convert input.png -resize "1600x1600>" -strip -quality 82 -interlace Plane out.jpg
   ```
4. Add an entry to `manifest.json` with width, height, alt text, and where it's used.
5. Reference it in `sections.jsx` via the `IMG` map and add matching `ALT` copy.

## Why JPG over PNG for photos

The originals were 2.7–6 MB PNGs of photographs — PNGs are lossless and bloated for that content. The optimized JPGs are 220–340 KB at the same display quality. Total assets dropped from 25 MB to 2.9 MB.

PNG stays for the logo only (transparency required, already small).

## Why a separate `hero/` folder

The hero video and its poster are tightly coupled — the poster is the fallback for the `<video>` tag and the mobile background. Keeping them adjacent makes that relationship obvious at a glance.

## Open slots

Two category tiles currently reuse gallery photos because there's no dedicated shot yet — see `open_slots` in `manifest.json`. Replace when better photography is available.

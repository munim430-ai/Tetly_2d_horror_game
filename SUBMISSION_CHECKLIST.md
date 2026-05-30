# Echoes of Ward 13 — Submission Checklist

## Project Files

| File | Description | Status |
|------|-------------|--------|
| `index.html` | Complete HTML5 game (2,200+ lines, zero dependencies) | ✅ |
| `game_story.html` | One-page gothic story with classified patient file | ✅ |
| `poster.html` | Movie poster with animated SVG hospital corridor | ✅ |
| `UNITY_INSTRUCTIONS.md` | Unity launcher walkthrough + Launcher.cs + APK guide | ✅ |
| `manifest.json` | PWA manifest — installable to home screen | ✅ |
| `sw.js` | Service worker — offline play | ✅ |
| `assets/` | 9 SVG game art assets | ✅ |
| `icons/` | PWA icons (192×192, 512×512) | ✅ |

## Game Features

- [x] 5 distinct levels (The Morgue → Basement → Corridors → Theatre → Rooftop)
- [x] Flashlight system with battery drain per level
- [x] Fear meter (HUD bar + vignette + heartbeat escalation)
- [x] Blind entity AI with 3-second hunt memory and wall collision
- [x] Level 5 dual-entity (second entity covers full level)
- [x] Locker hide mechanic (5s hide / 10s cooldown)
- [x] 3 keys + exit door per level
- [x] Web Audio API: drone, heartbeat, footsteps, proximity panning, screech, chase music
- [x] Virtual joystick + touch buttons (mobile-first)
- [x] Pause menu (ESC)
- [x] Level select (unlockable)
- [x] How-to-play screen
- [x] Credits screen
- [x] localStorage progress save
- [x] Level intro overlay per ward
- [x] Death screenshake + red flash
- [x] Film grain + vignette effects
- [x] PWA installable (manifest + service worker)

## How to Run

### Browser (instant)
Open `index.html` in Chrome, Firefox, or Safari. No server needed for basic play.

> **Note:** Service worker and PWA features require a local server or HTTPS host.
> Run: `npx serve .` or `python3 -m http.server 8080`

### Mobile Install (PWA)
1. Host on HTTPS (GitHub Pages, Netlify, itch.io)
2. Open in Chrome/Safari on phone
3. "Add to Home Screen" prompt appears

### Unity Launcher
See `UNITY_INSTRUCTIONS.md` — attach `GameLauncher.cs` to open the game from Unity Play button.

### Android APK
See "Android APK via Capacitor" section in `UNITY_INSTRUCTIONS.md`.

## Quick Hosting (5 minutes)

```bash
# Option 1: Netlify Drop
# Drag entire project folder to netlify.com/drop

# Option 2: GitHub Pages
git push origin main
# Enable Pages in repo Settings → Pages → Deploy from branch

# Option 3: Local server with PWA
npx serve . --listen 8080
# Open http://localhost:8080
```

## Submission ZIP

To create the submission ZIP:
```bash
zip -r EchoesOfWard13_Submission.zip . \
  --exclude "*.git*" \
  --exclude "node_modules/*" \
  --exclude ".claude/*" \
  --exclude ".claude-flow/*"
```

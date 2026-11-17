---
name: invitation-web-design
description: Use when building a digital invitation website (wedding, engagement, birthday, event). Design is the star: immersive 3D effects, deliberate motion, and sound, while staying clean, tidy, and free of generic "AI slop".
---

# Digital Invitation Website Skill

You are the design lead at a studio known for invitation sites that feel like a small film: memorable, tidy, and unmistakably specific to the couple or the event. The design, motion, and sound are the product. Every choice must come from this event's theme, names, place, culture, and mood, never from a generic template.

## 1. Before designing: lock the concept

If the brief does not say, propose one concrete answer for each and state it:
- **Event type:** wedding, engagement, birthday, aqiqah, graduation, etc.
- **Theme and mood:** for example garden at dusk, traditional Javanese, minimalist modern, starry night, ocean, vintage cinema.
- **Concept sentence:** one sentence describing the experience, for example "Opening a night-blooming garden gate that reveals the couple's story."
- **Language:** default to Indonesian unless told otherwise. Use correct, polite Indonesian in all visible copy.

The concept drives color, type, 3D scene, motion, and sound. If you cannot connect a design choice to the concept, remove it.

## 2. Plan first, then code

Write a short plan before any code:
- **Color:** 4 to 6 named hex values drawn from the theme.
- **Type:** one display face and one text face, clearly different, with a defined scale. Choose faces that fit the theme (Google Fonts is fine). Do not default to Inter, Roboto, or system-ui. Names must be readable at large size and on mobile.
- **Experience flow:** list the sections in order, and the one signature moment (see section 4).
- **3D and motion plan:** what is 3D, what moves, what triggers it.
- **Sound plan:** background music, effect sounds, and when each plays.

Then review the plan: if any part is what you would produce for any other invitation, revise it and say what changed. Only then write code.

## 3. Structure of the invitation

Adapt to the event. A typical wedding flow:
1. **Cover (opening screen):** couple's names, date, and a clear "Buka Undangan" button. Guest name is read from the URL (`?to=Nama+Tamu`) and shown as "Kepada Yth." with a safe fallback if missing. Escape the name before inserting into the page (use `textContent`, never `innerHTML`). The tap on this button also starts the music (see section 6).
2. **Opening greeting:** salam, short verse or quote if the brief gives one.
3. **The couple:** names, parents' names, short photo or illustration of each.
4. **Our story** (only if the brief gives one): a real timeline.
5. **Event details:** akad/ceremony and reception, with date, time, venue, address, and a "Buka peta" link to Google Maps. Add an "Simpan ke kalender" option if possible.
6. **Countdown** to the event.
7. **Gallery:** real photos from the brief, or tasteful placeholders.
8. **RSVP and wishes:** name, attendance, number of guests, message. If there is no backend, clearly state how responses will be sent (for example to WhatsApp via a prefilled link) and implement that.
9. **Digital gift** (only if the brief asks): bank or e-wallet details with a copy button.
10. **Closing:** thanks, family names.

Do not add sections the brief does not support. Do not invent stats, testimonials, or fake content. Use realistic placeholder content that fits the theme, never lorem ipsum.

## 4. 3D and motion: be bold, but with intent

Motion and 3D are welcome here. The rule is not "less", it is "meaningful and polished".

**Signature moment.** Design one unforgettable moment, usually the cover opening: doors, curtains, an envelope, a gate, a book, a lantern, petals, or a 3D object that reacts to the tap. Give it the most craft.

**3D techniques (pick what the device can handle):**
- CSS 3D transforms (`perspective`, `rotateX/Y`, `translateZ`, `transform-style: preserve-3d`) for cards, doors, flipping panels, tilt-on-pointer, and layered parallax depth.
- Layered parallax with several depth planes, moving by scroll or device tilt.
- Three.js (UMD build from cdnjs or jsDelivr, pinned to an exact version) only when a real 3D scene is needed, such as floating particles, petals, a rotating ornament, or a starfield. Keep it to one canvas, cap pixel ratio at 2, pause rendering when the tab is hidden or the canvas is off screen.
- GSAP with ScrollTrigger (pinned version) is a good choice for sequenced scroll storytelling.

**Motion principles:**
- One consistent motion language: same easing family and similar durations throughout (for example 300 to 900 ms, ease-out for entrances).
- Sequence and stagger deliberately so the eye is guided to what matters.
- Scroll-driven reveals should have a purpose: reveal a story, build a scene, change the mood. Not a fade-up on every block.
- Ambient motion (floating petals, drifting light, slow parallax) must be subtle and must never reduce text legibility.
- Interactive responses (tap, hover, drag, tilt) should feel physical.

**Performance and safety (mandatory):**
- Target smooth 60 fps on a mid-range Android phone. Animate only `transform` and `opacity`. Avoid animating `box-shadow`, `filter: blur()` on large areas, and layout properties.
- Limit particle counts (for example under 60 on mobile). Detect low-end devices (`navigator.hardwareConcurrency`, small screens) and reduce effects.
- Respect `prefers-reduced-motion`: replace big motion with simple fades and no parallax or particles.
- Compress and size images appropriately (WebP, responsive sizes). Lazy-load images below the fold.
- The page must remain fully usable if 3D or WebGL fails. Always provide a fallback.

## 5. Visual quality: avoiding slop

Even with rich effects, avoid these generic tells unless the brief asks for them:
- Cream background with serif and terracotta accent as a reflex, or near-black with one acid accent.
- Purple/blue or pink/orange gradient washes as decoration.
- Identical rounded cards in a grid with the same soft shadow everywhere.
- Gold glitter, generic floral clip-art, and stock "elegant" ornaments pasted on without a concept.
- Accenting a single word in each headline; ALL-CAPS tracked eyebrow labels above every heading; "A · B · C" middle-dot strings; arrows (→) on every button; emoji as icons.
- Numbered markers (01 / 02 / 03) on content that is not a real sequence.
- Everything centered with equal weight. Use hierarchy, asymmetry, scale contrast, and whitespace.

Instead:
- Build a palette and ornament system from the theme (for example batik or songket motifs for a Javanese theme, real botanical illustration for a garden theme). Draw ornaments as clean SVG that fit the type and color system.
- Use scale and typography as the main design device: large names, generous spacing, deliberate line lengths (under 80 characters for body text).
- Spend boldness in one place: the signature moment and the cover. Keep the information sections calm, legible, and well spaced so guests can find date, time, and place instantly.
- Ensure text contrast of at least 4.5:1 on top of images and animated backgrounds (use a scrim if needed).

## 6. Sound design

Sound should add atmosphere, not annoy.

**Rules:**
- Browsers block autoplay with sound. Start audio only after a user gesture: the "Buka Undangan" tap. Do not try to autoplay on load.
- Provide a clear, always-visible mute/unmute button (floating, reachable by thumb, with an accessible label and state). Remember the choice for the session.
- Background music: one looping track, starting at low volume with a gentle fade-in (for example to 0.4 to 0.6), looped without audible gap. Pause when the tab is hidden and resume when visible.
- Effect sounds (soft and short, under 1 second): door/curtain opening on the cover, a gentle chime on the countdown reaching zero, a soft tap on buttons, a light sparkle on key reveals. Keep them quiet and consistent in style. Do not add a sound to every element.
- Use the Web Audio API or `<audio>` elements. Preload small effects; load the music file lazily after the opening tap if it is large.
- Respect the mute state for all effects. Never play sound when muted.
- Only use audio files provided in the brief or clearly licensed/royalty-free. Do not hotlink random audio. Put audio files in a local folder (for example `assets/audio/`) and reference them with relative paths. If no audio files are provided, build the audio system and clearly mark placeholder file names to replace.

## 7. Code quality floor

- Mobile first. Most guests open the invitation from WhatsApp on a phone. Design for 360px width first, then scale up. Test layout with the mobile browser address bar (use `100dvh`, not `100vh`).
- Semantic HTML, visible keyboard focus, meaningful `alt` text, labeled buttons, `lang="id"`.
- Define colors, spacing, radii, durations, and easings as CSS variables at `:root` and reuse them.
- Keep CSS selector specificity simple; avoid rules that cancel each other, especially for section padding and margin.
- Include proper meta tags and Open Graph tags (title, description, image) so the link previews nicely when shared on WhatsApp.
- Total page weight should stay reasonable: aim for a fast first paint, with a lightweight loading state if assets are heavy.
- If the project uses a framework (React, Vue, Next, Tailwind), follow its conventions. Do not rewrite it in a different stack.
- No leftover template comments, dead code, or placeholder links without a reason.

## 8. Final self-critique

Before delivering, check and fix:
1. Could this invitation belong to a different couple or event with only the names changed? If yes, strengthen the concept.
2. Is there one clear signature moment, and is it polished?
3. Is date, time, and place findable within seconds of scrolling?
4. Does music start only after the tap, with a visible mute button?
5. Does it stay smooth on a mid-range phone and degrade gracefully with reduced motion or no WebGL?
6. Is every visible word correct, polite Indonesian, specific, and free of hype?
7. Remove one decoration you like least.

When delivering, state the concept and design plan in a few lines, then the code. Do not add long explanations.

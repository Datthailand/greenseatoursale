# FITDAD01 Material System — Elevation & Depth / Gradient Border Shell

**Project:** Greensea Tour website  
**Page:** `/?tour=fitdad01&mode=landing`  
**Date:** 2026-08-20  
**Source:** Anh Đạt provided elevation/depth recipe  
**Purpose:** Ghi lại material system mới để áp dụng nhất quán cho hero panels, cards, FAQ, pricing terminal, controls và sales-kit blocks.

---

## 1. Design direction

Depth should be communicated through:

- outlined surfaces
- border contrast
- reusable shadow / blur treatments
- consistent card/control recipes

The page should read as **one material system**, not separate unrelated blocks.

---

## 2. Core tokens

### Surface style

```text
outlined
```

### Border style

```text
1px #52525B
```

### Main premium edge treatment

Use a **thin gradient border shell** around important panels/cards.

Outer shell:

```css
padding: 1px;
border-radius: 0px;
background: linear-gradient(
  to right bottom,
  rgba(99, 102, 241, 0.3),
  rgba(39, 39, 42, 0.4),
  rgba(24, 24, 27, 0.4)
);
```

Inner surface:

```css
background: rgba(15, 23, 42, 0.92);
box-shadow: none;
box-sizing: border-box;
```

Important: the outer wrapper carries the gradient edge. The inner panel carries the true surface fill. The actual stroke should stay understated so the gradient shell remains the hero edge treatment.

---

## 3. Reference HTML provided

```html
<div style="display:inline-block; padding:1px; border-radius:0px; background:linear-gradient(to right bottom, rgba(99, 102, 241, 0.3), rgba(39, 39, 42, 0.4), rgba(24, 24, 27, 0.4));">
  <div style="min-width:240px; padding:18px 20px; border-radius:0px; background:rgba(15, 23, 42, 0.92); box-shadow:none; box-sizing:border-box;">
    <strong style="display:block; margin-bottom:8px;">Gradient border shell</strong>
    <span style="display:block; opacity:0.72;">Outer wrapper carries the gradient edge. Inner panel carries the true surface fill.</span>
  </div>
</div>
```

---

## 4. React implementation recipe

For this codebase, prefer reusable style constants before extracting a component.

### Style constants

```jsx
const gradientShellStyle = {
  padding: '1px',
  borderRadius: '0px',
  background: 'linear-gradient(to right bottom, rgba(99, 102, 241, 0.3), rgba(39, 39, 42, 0.4), rgba(24, 24, 27, 0.4))'
};

const darkPanelSurfaceStyle = {
  borderRadius: '0px',
  background: 'rgba(15, 23, 42, 0.92)',
  border: '1px solid rgba(82, 82, 91, 0.55)',
  boxShadow: 'none',
  boxSizing: 'border-box'
};
```

### Usage pattern

```jsx
<div style={gradientShellStyle}>
  <div style={{ ...darkPanelSurfaceStyle, padding: '18px 20px' }}>
    {/* content */}
  </div>
</div>
```

### Optional component later

If this pattern repeats across many sections, extract later:

```jsx
const GradientBorderPanel = ({ children, style, innerStyle }) => (
  <div style={{ ...gradientShellStyle, ...style }}>
    <div style={{ ...darkPanelSurfaceStyle, ...innerStyle }}>
      {children}
    </div>
  </div>
);
```

Do not extract too early if only 1–2 sections use it.

---

## 5. Where to apply on FITDAD01

Recommended priority:

1. **Hero premium card / main B2B positioning card**  
   Use gradient shell as the strongest depth signal.

2. **Pricing terminal main container**  
   Good fit because pricing is a high-value conversion module.

3. **B2B Agent Sales Kit block**  
   Use the same shell but slightly softer opacity if the page starts feeling too dark/heavy.

4. **New FAQ section topic cards**  
   Use outlined cards with the same border language. Avoid overusing the full gradient shell on every FAQ item; reserve it for the FAQ section container or topic cards.

5. **CTA cards near quotation form**  
   Use the premium edge treatment to signal action zone.

---

## 6. What not to do

- Do not apply gradient shell to every small element. It will become noisy.
- Do not mix too many unrelated shadows with the shell.
- Do not combine heavy blur + heavy shadow + gradient border on the same card unless intentionally making a hero surface.
- Do not use random border colors outside the material system.
- Do not switch radius values randomly. If `0px` is chosen for this system, keep it deliberate and consistent.

---

## 7. Suggested integration with FAQ section

For the FAQ section inspired by Neuform:

- section wrapper: subtle gradient shell or outlined surface
- overview stat cards: plain outlined cards
- topic cards: optional gradient shell only on hover/active topic, not all by default
- accordion items: `1px #52525B` / dark or white variant depending on final page mood
- bottom CTA: use gradient shell to make it feel like the next step

If the rest of FITDAD01 remains mostly light, convert the same recipe into a light-mode version:

```css
background: linear-gradient(
  to right bottom,
  rgba(99, 102, 241, 0.25),
  rgba(203, 213, 225, 0.5),
  rgba(148, 163, 184, 0.35)
);
```

Inner surface:

```css
background: rgba(255, 255, 255, 0.96);
border: 1px solid rgba(82, 82, 91, 0.18);
```

This keeps the same material logic without forcing the whole travel page into dark SaaS styling.

---

## 8. Em Cún's take

This recipe is strong, but should be used as a **system accent**, not everywhere.

For FITDAD01, the best use is:

- one premium shell around the most important B2B trust/pricing surface
- a softer version for FAQ/topic cards
- CTA card using the same material language

That will make the page feel more premium and unified without looking like copied SaaS UI.

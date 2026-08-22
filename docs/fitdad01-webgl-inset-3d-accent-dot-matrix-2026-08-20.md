# FITDAD01 — WebGL Inset 3D Accent / Dot-Matrix Particle Field

**Project:** Greensea Tour website  
**Page:** `/?tour=fitdad01&mode=landing`  
**Date:** 2026-08-20  
**Source:** Anh Đạt provided WebGL direction  
**Feature ID:** `webgl`  
**Label:** WebGL  
**Stack:** ThreeJS, WebGL  
**Purpose:** Ghi lại hướng WebGL accent để áp dụng như một chi tiết 3D inset cao cấp cho FITDAD01 landing page.

---

## 1. Design direction

Reconstruct the graphics as an **inset 3D accent** using WebGL.

The effect should read as:

- retro-futurist
- technical
- meditative
- premium but understated

Visual language:

- gray-on-black
- sparse dot-matrix particle field
- soft depth fade
- slow breathing pulse
- subtle pointer-reactive drift
- DOM fallback preserved

This should be an **accent**, not the whole identity of the page.

---

## 2. Core WebGL requirements

### Scene

```text
Inset 3D accent
```

### Effect

```text
Dot-matrix particle field
```

### Primitives

```text
Dot particles + soft depth fade
```

### Motion

```text
Slow breathing pulse
```

### Interaction

```text
Pointer-reactive drift
```

### Render

```text
WebGL renderer with alpha + antialias
```

### Techniques

- Dot matrix
- Breathing pulse
- Pointer parallax
- DOM fallback

---

## 3. Code evidence / reference snippets

### HTML reference

```html
<canvas width="600" height="600" style="display: block; width: 600px; height: 600px;"></canvas>
```

### Renderer setup reference

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
```

### Scene setup reference

```js
function initWebGL() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  // ...
}
```

---

## 4. Current repo compatibility note

Checked package dependencies on 2026-08-20:

- React/Vite exists.
- `three` is **not currently installed** in `package.json`.
- Existing canvas usage in `FITDAD01LandingPage.jsx` is only for poster export around lines `283–506`; no current ThreeJS/WebGL scene exists.

Implementation will require adding:

```bash
npm install three
```

or equivalent package update.

Do not silently introduce WebGL without confirming bundle impact and testing build.

---

## 5. Recommended component architecture

Create a dedicated component instead of embedding raw WebGL code into the landing page body.

Suggested file:

```text
src/components/FITDAD01WebGLAccent.jsx
```

Suggested usage:

```jsx
<FITDAD01WebGLAccent />
```

Recommended props:

```jsx
<FITDAD01WebGLAccent
  variant="dot-matrix"
  intensity="subtle"
  className="..."
/>
```

Initial V1 can be simpler:

```jsx
const FITDAD01WebGLAccent = () => { ... }
```

---

## 6. DOM fallback rule

Fallback is mandatory.

If any of these fail:

- `window.WebGLRenderingContext` unavailable
- `three` import fails
- renderer creation throws
- container has zero width/height
- user has reduced motion enabled, if we decide to honor it strictly

Then show a static DOM fallback:

```jsx
<div aria-hidden="true" style={fallbackDotMatrixStyle}>
  {/* CSS dot grid / radial gradient fallback */}
</div>
```

Fallback visual should preserve the design intent:

- black/dark inset panel
- sparse gray dot grid
- faint depth/fade
- no interaction required

---

## 7. Suggested visual placement on FITDAD01

Best placements:

### Option A — Hero right-side inset accent

Use WebGL as a hero side panel behind/near B2B positioning copy.

Pros:

- High perceived premium value.
- Makes page feel more modern.
- Strong first impression.

Risk:

- Could make travel page feel too SaaS/AI if overdone.

### Option B — Pricing terminal accent background

Use inset WebGL inside pricing/calculator section.

Pros:

- Technical look matches calculator/NET rate logic.
- Less risky than hero because it supports the data/product area.

Recommended V1 placement:

```text
Pricing terminal / B2B tool zone
```

### Option C — FAQ / Sales Kit decorative card

Use as a smaller decorative card beside FAQ or B2B Agent Sales Kit.

Pros:

- Safer visually.
- Easy to remove if performance or aesthetic feels wrong.

Recommendation:

Start with Option B or C. Avoid making WebGL the main hero until the travel/B2B feel is verified.

---

## 8. Implementation sketch

```jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FITDAD01WebGLAccent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    if (!window.WebGLRenderingContext) {
      container.dataset.webglFallback = 'true';
      return;
    }

    let frameId;
    let renderer;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      camera.position.z = 8;

      // Build sparse dot-matrix particles.
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];

      const grid = 28;
      const spacing = 0.26;

      for (let x = -grid; x <= grid; x += 1) {
        for (let y = -grid; y <= grid; y += 1) {
          if ((x + y) % 2 !== 0) continue;

          const z = Math.sin(x * 0.25) * 0.5 + Math.cos(y * 0.25) * 0.5;
          const fade = Math.max(0.12, 1 - Math.abs(z) * 0.28);

          positions.push(x * spacing, y * spacing, z);
          colors.push(fade, fade, fade);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        depthWrite: false
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event) => {
        const rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.18;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;
      };

      container.addEventListener('pointermove', onPointerMove);

      const animate = (time) => {
        const t = time * 0.001;
        const breath = 1 + Math.sin(t * 0.55) * 0.035;

        points.scale.setScalar(breath);
        points.rotation.x += (pointer.y - points.rotation.x) * 0.025;
        points.rotation.y += (pointer.x - points.rotation.y) * 0.025;

        material.opacity = 0.58 + Math.sin(t * 0.55) * 0.08;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);

      const onResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', onResize);
        container.removeEventListener('pointermove', onPointerMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement?.remove();
      };
    } catch (error) {
      container.dataset.webglFallback = 'true';
      if (renderer?.domElement) renderer.domElement.remove();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '280px',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.92)',
        border: '1px solid #52525B'
      }}
    >
      <div style={fallbackDotMatrixStyle} />
    </div>
  );
};
```

Important: if `renderer.domElement` is successfully appended, it should visually cover the fallback. The fallback can remain under the canvas.

---

## 9. Styling with the new material system

Combine with the gradient border shell from the elevation/depth note:

```jsx
<div style={gradientShellStyle}>
  <div style={{ ...darkPanelSurfaceStyle, padding: 0, overflow: 'hidden' }}>
    <FITDAD01WebGLAccent />
  </div>
</div>
```

This fits the provided material direction:

- outlined
- thin premium edge
- inset 3D accent
- no heavy shadow required

---

## 10. Performance guardrails

- Clamp pixel ratio: `Math.min(window.devicePixelRatio || 1, 2)`.
- Keep particle count modest. Suggested V1: around `1,500–2,000` points max.
- Avoid postprocessing in V1.
- Avoid large textures.
- Pause or simplify if container is offscreen later, if performance becomes a concern.
- Respect `prefers-reduced-motion` if the animation feels too much.

---

## 11. QA checklist

Before calling this done:

- `npm run build` passes.
- Page loads without console errors.
- WebGL canvas sizes correctly on desktop/mobile.
- Fallback appears if WebGL fails.
- Animation is slow and meditative, not distracting.
- Pointer interaction is subtle drift, not a game-like effect.
- Does not obscure text or CTA.
- Does not make FITDAD01 feel less like a travel/DMC B2B page.

---

## 12. Em Cún's take

This is a strong enhancement if used carefully.

Best V1 use: **inset accent inside the pricing / B2B tool zone**, not full hero takeover. It will make the calculator and sales-kit area feel more technical and premium while keeping the page grounded as a Vietnam DMC product page.

Do not overuse this across the page. One well-placed WebGL accent is enough.

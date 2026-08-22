# FITDAD01 — ThreeJS Inset 3D Accent / Icosahedron Object Layer

**Project:** Greensea Tour website  
**Page:** `/?tour=fitdad01&mode=landing`  
**Date:** 2026-08-20  
**Source:** Anh Đạt provided ThreeJS direction  
**Feature ID:** `threejs`  
**Label:** ThreeJS  
**Stack:** ThreeJS, WebGL  
**Purpose:** Ghi lại hướng ThreeJS object layer để áp dụng như một inset 3D accent technical/premium cho FITDAD01 landing page.

---

## 1. Design direction

Reconstruct the Three.js layer as an **inset 3D accent**.

The visual should feel:

- retro-futurist
- technical
- calm / meditative
- premium but not flashy
- compatible with B2B DMC positioning

This is different from the dot-matrix WebGL field note. This direction uses a **single PBR-shaded icosahedron object** with slow orbital drift.

---

## 2. Core ThreeJS requirements

### Scene

```text
Inset 3D accent
```

### Renderer

```js
new THREE.WebGLRenderer({ alpha: true, antialias: true })
```

### Camera

```text
Perspective camera, around 45deg FOV
```

Suggested:

```js
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
```

### Lighting

```text
Ambient light + directional light
```

Suggested:

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
directionalLight.position.set(4, 6, 8);
scene.add(ambientLight, directionalLight);
```

### Materials

```text
MeshPhysicalMaterial
```

Recommended qualities:

- dark graphite / gray metal
- slight roughness
- subtle metalness
- clearcoat low-to-medium
- transparent enough only if needed

### Geometry

```text
Icosahedron
```

Suggested:

```js
const geometry = new THREE.IcosahedronGeometry(1.8, 1);
```

### Motion

```text
Slow orbital drift
```

The object should not spin like a game object. It should drift slowly, like a technical artifact inside an inset display.

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

As checked in the previous WebGL note:

- React/Vite exists.
- `three` is not currently installed in `package.json`.
- Existing canvas in `FITDAD01LandingPage.jsx` is for poster export only.

Implementation requires adding:

```bash
npm install three
```

or updating package dependencies manually, then running:

```bash
npm run build
```

Do not claim this is implemented until dependency + build + browser smoke are verified.

---

## 5. Recommended component architecture

Create a separate component:

```text
src/components/FITDAD01ThreeJSAccent.jsx
```

Use in landing page:

```jsx
<FITDAD01ThreeJSAccent />
```

Do not inline the full ThreeJS scene inside `FITDAD01LandingPage.jsx` unless doing a quick prototype. The landing page file is already large, so keeping the ThreeJS layer isolated is cleaner.

---

## 6. Poster frame + DOM fallback

This ThreeJS feature must preserve fallback.

### Required fallback layers

1. **Poster frame**  
   A static visual shown before WebGL initializes or when reduced motion is preferred.

2. **DOM fallback**  
   A CSS-rendered placeholder if WebGL fails.

Fallback should look similar to the intended object layer:

- dark inset panel
- faint radial/mesh highlight
- outline / gradient shell
- simple geometric wireframe or dot grid using CSS
- no broken blank black rectangle

Suggested fallback concept:

```jsx
<div aria-hidden="true" style={posterFrameStyle}>
  <div style={cssIcosahedronHintStyle} />
</div>
```

---

## 7. Implementation sketch

```jsx
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const FITDAD01ThreeJSAccent = () => {
  const containerRef = useRef(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    if (!window.WebGLRenderingContext) {
      setIsFallback(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    let renderer;
    let frameId;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );

      camera.position.set(0, 0, 6);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.35);
      directionalLight.position.set(4, 6, 8);
      scene.add(ambientLight, directionalLight);

      const geometry = new THREE.IcosahedronGeometry(1.65, 1);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x9ca3af,
        roughness: 0.42,
        metalness: 0.18,
        clearcoat: 0.35,
        clearcoatRoughness: 0.55,
        transparent: true,
        opacity: 0.88
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(-0.35, 0.55, 0.12);
      scene.add(mesh);

      // Optional wireframe shell for technical feel.
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xd4d4d8,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });
      const wireMesh = new THREE.Mesh(geometry.clone(), wireMaterial);
      wireMesh.scale.setScalar(1.006);
      scene.add(wireMesh);

      const pointer = { x: 0, y: 0 };

      const onPointerMove = (event) => {
        const rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.22;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;
      };

      container.addEventListener('pointermove', onPointerMove);

      const renderPosterFrame = () => {
        renderer.render(scene, camera);
      };

      const animate = (time) => {
        const t = time * 0.001;

        // Slow orbital drift. Keep it meditative, not game-like.
        mesh.rotation.y = 0.55 + Math.sin(t * 0.18) * 0.32 + pointer.x;
        mesh.rotation.x = -0.35 + Math.cos(t * 0.15) * 0.18 + pointer.y;
        mesh.rotation.z = 0.12 + Math.sin(t * 0.12) * 0.08;

        wireMesh.rotation.copy(mesh.rotation);
        wireMesh.rotation.y += 0.04;

        const driftX = Math.sin(t * 0.12) * 0.12;
        const driftY = Math.cos(t * 0.1) * 0.08;
        mesh.position.set(driftX, driftY, 0);
        wireMesh.position.copy(mesh.position);

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      if (prefersReducedMotion) {
        renderPosterFrame();
      } else {
        frameId = requestAnimationFrame(animate);
      }

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
        wireMesh.geometry.dispose();
        material.dispose();
        wireMaterial.dispose();
        renderer.dispose();
        renderer.domElement?.remove();
      };
    } catch (error) {
      setIsFallback(true);
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
        background: 'radial-gradient(circle at 50% 40%, rgba(82,82,91,0.24), rgba(0,0,0,0.92) 58%)',
        border: '1px solid #52525B'
      }}
    >
      <div style={posterFrameStyle} />
      {isFallback && <div style={domFallbackStyle} />}
    </div>
  );
};
```

---

## 8. Material system integration

This ThreeJS accent should sit inside the gradient border shell from the elevation/depth note.

Suggested wrapper:

```jsx
<div style={gradientShellStyle}>
  <div style={{ ...darkPanelSurfaceStyle, padding: 0, overflow: 'hidden' }}>
    <FITDAD01ThreeJSAccent />
  </div>
</div>
```

The shell gives the premium edge. ThreeJS gives the inset technical accent.

Keep the border system consistent:

```text
Surface style: outlined
Border style: 1px #52525B
```

---

## 9. Best placement on FITDAD01

Recommended placement:

```text
B2B pricing / sales-kit tool zone
```

Reason:

- ThreeJS object feels technical and premium.
- Pricing/calculator/sales kit are already tool-like.
- It reinforces B2B sophistication without making the travel hero too abstract.

Secondary placement:

```text
Hero side accent
```

Only use hero placement if the object does not overpower destination imagery / DMC trust copy.

Avoid:

- repeating multiple ThreeJS objects across the page
- placing it behind body text
- making it the dominant visual over tour photos

---

## 10. Comparison with dot-matrix WebGL note

There are now two related accent directions:

### Option 1 — Dot-matrix particle field

- More meditative/data-grid
- Works well as background/inset panel
- Less object-like
- Good for FAQ/pricing ambient texture

### Option 2 — ThreeJS icosahedron object

- More iconic/object-driven
- Stronger premium technical signal
- Better as a hero/pricing side card
- Slightly higher risk of looking too SaaS if overused

Recommendation:

Do **not** implement both at full strength on the same page in V1.

Choose one main WebGL accent:

- If page needs calm background: choose dot-matrix.
- If page needs signature premium object: choose icosahedron.

For FITDAD01, em nghiêng về **ThreeJS icosahedron as one inset card in the pricing/sales-kit zone**, and keep dot-matrix only as fallback or very subtle texture.

---

## 11. Performance guardrails

- Clamp pixel ratio to max `2`.
- Keep geometry simple: `IcosahedronGeometry(1.65, 1)` is enough.
- No postprocessing in V1.
- One renderer only on the page.
- Dispose geometry/material/renderer on unmount.
- Keep animation slow.
- Respect `prefers-reduced-motion` with poster frame.
- Do not block page content if ThreeJS fails.

---

## 12. QA checklist

Before calling done:

- `npm install three` completed or dependency exists.
- `npm run build` passes.
- No console errors.
- Canvas sizes correctly in desktop/tablet/mobile.
- Poster frame visible before/without animation.
- DOM fallback works if WebGL unsupported or error thrown.
- Object motion is slow orbital drift, not fast spin.
- Pointer drift is subtle.
- Accent does not obscure CTAs or important text.
- Overall page still feels like premium Vietnam inbound DMC, not generic SaaS template.

---

## 13. Em Cún's take

This ThreeJS direction is stronger than the dot-matrix version as a **signature premium accent**.

But for FITDAD01, one object is enough. Best V1: put the icosahedron inset panel beside/inside the **pricing terminal or B2B sales-kit area**. That gives the page a technical premium feel while still keeping the travel product and Green Sea Tour trust copy in front.

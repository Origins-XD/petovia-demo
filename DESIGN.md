# Design System Specification: The Tactile Editorial
 
## 1. Overview & Creative North Star
**Creative North Star: "The Modern Caretaker"**
 
This design system moves away from the sterile, rigid layouts of traditional service directories. Instead, it adopts a "Tactile Editorial" approach—a style that feels like a premium lifestyle magazine transitioned into a living digital interface. 
 
We break the "template" look through **intentional asymmetry** and **tonal depth**. Rather than boxing content into uniform grids, we use overlapping elements, exaggerated whitespace, and a sophisticated layering system. The result is a platform that feels as warm and organic as the pets it serves, yet remains undeniably authoritative and high-end.
 
---
 
## 2. Color Strategy & Surface Logic
The palette is rooted in the "Cream" base (#FFFBF5), ensuring the interface never feels clinical.
 
### The "No-Line" Rule
**Borders are a failure of hierarchy.** In this system, 1px solid lines for sectioning are strictly prohibited. Boundaries must be defined through:
*   **Background Shifts:** Use `surface-container-low` (#f7f3ed) against the `background` (#fdf9f3) to denote section changes.
*   **Soft Teal Shadows:** Use a teal-tinted ambient shadow (`rgba(26, 173, 160, 0.08)`) to lift cards without hard edges.
 
### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
1.  **Level 0 (Base):** `background` (#fdf9f3).
2.  **Level 1 (Sections):** `surface-container` (#f1ede7) for large content areas.
3.  **Level 2 (Interaction):** `Card` (#FFFFFF) for interactive elements, providing a "pop" of clean white against the cream.
 
### The Glass & Gradient Rule
To add "soul" to functional areas:
*   **Signature Gradients:** For Primary CTAs, transition from `primary` (#006a62) to `primary_container` (#1aada0) at a 135-degree angle.
*   **Floating Navigation:** Use Glassmorphism (Background: `rgba(255, 251, 245, 0.8)` with a 20px backdrop-blur) for sticky headers to maintain a sense of airiness.
 
---
 
## 3. Typography: The Editorial Voice
We utilize **Plus Jakarta Sans** for its friendly yet geometric precision.
 
*   **Display & Headlines:** (Bold 700 to Black 900). Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create an authoritative, editorial impact.
*   **Body Text:** (Regular 400 to Medium 500). Set in `Ink` (#1A1A1A). The high contrast against the `Cream` background ensures premium readability.
*   **Numerics:** Always use **Tabular Figures** at weight 600. This is critical for price points and ratings to ensure alignment and a "pro-tool" feel.
 
---
 
## 4. Elevation & Depth
Hierarchy is achieved through **Tonal Layering** rather than structural lines.
 
*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card atop a `surface-container-low` (#f7f3ed) background. This creates a natural, soft lift.
*   **Ambient Shadows:** For floating modals or "Featured" cards, use a diffused shadow: `0px 12px 32px rgba(26, 173, 160, 0.06)`. This teal-tinted shadow mimics natural light filtering through the brand's primary color.
*   **The Ghost Border Fallback:** If a divider is mandatory for accessibility, use the `Border` token (#EEE8DD) at **40% opacity**. Never use 100% opaque lines.
 
---
 
## 5. Components & Primitives
 
### Buttons & Interaction
*   **Primary Button:** Pill-shaped (999px), `primary` background. Transitions to `Teal Deep` (#138A80) on hover. 
*   **Secondary Button:** Pill-shaped, `Teal Soft` (#E8F8F6) background with `primary` text. No border.
*   **Tactile Feedback:** On click, buttons should scale slightly (98%) to provide a physical "press" sensation.
 
### Inputs & Selection
*   **Text Fields:** 16px corner radius. Background: `surface-container-highest`. No border on idle; `primary` 2px "Ghost Border" on focus.
*   **Chips:** Pill-shaped. Use `Amber Soft` (#FDF1E2) for category tags and `Amber Primary` (#E8973A) for active filters to maintain warmth.
 
### Specialized Petovia Components
*   **The Map Pin:** Custom teal teardrop with a white paw silhouette. Pins should have the same 6% teal shadow to appear integrated into the map surface.
*   **The Discovery Card:** 16px radius. Forbid the use of dividers between the image and text. Use vertical white space (24px) to separate the service title from the description.
 
---
 
## 6. Do’s and Don’ts
 
### Do:
*   **Do** overlap images over container edges slightly (5-10px) to break the grid.
*   **Do** use `Brown Dark` (#1F1208) for footers to "ground" the light interface with a sense of established professionalism.
*   **Do** use `Gold Text` (#F0C87A) exclusively on `Brown Dark` backgrounds for a luxury touch.
 
### Don't:
*   **Don’t** use pure black (#000000) or pure white (#FFFFFF) for backgrounds. Stick to `Ink` and `Cream`.
*   **Don’t** use standard 8px rounding. Stick to the scale: 16px (Cards), 24px (Containers), 999px (Pills).
*   **Don’t** use "Drop Shadows" that are grey. If it's not tinted with the Primary Teal, it doesn't belong in this system.
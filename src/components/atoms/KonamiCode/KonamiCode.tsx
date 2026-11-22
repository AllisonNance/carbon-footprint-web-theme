"use client";

import { useEffect } from "react";

/** ↑ ↑ ↓ ↓ ← → ← → B A */
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Attribute on <html> that switches on the theme in src/styles/konami.css. */
export const KONAMI_ATTRIBUTE = "data-konami";
export const KONAMI_STORAGE_KEY = "konami-theme";

/**
 * Inline script for <head>: re-applies the theme before first paint on
 * later visits, so the page doesn't flash the normal look first.
 */
export const KONAMI_RESTORE_SCRIPT = `try{if(localStorage.getItem("${KONAMI_STORAGE_KEY}")==="on")document.documentElement.setAttribute("${KONAMI_ATTRIBUTE}","")}catch(e){}`;

/**
 * KonamiCode — listens for the Konami Code anywhere on the site and
 * toggles a dark, early-2000s scene-profile theme (see konami.css).
 * Entering the code again switches it off. The choice is remembered in
 * this browser. Renders nothing.
 */
export function KonamiCode() {
  useEffect(() => {
    let progress = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      // Don't hijack typing in fields (e.g. the case study password).
      const target = event.target as HTMLElement | null;
      if (
        target?.closest("input, textarea, select, [contenteditable='true']")
      ) {
        progress = 0;
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === SEQUENCE[progress]) {
        progress += 1;
      } else {
        progress = key === SEQUENCE[0] ? 1 : 0;
      }

      if (progress === SEQUENCE.length) {
        progress = 0;
        const root = document.documentElement;
        const on = !root.hasAttribute(KONAMI_ATTRIBUTE);
        root.toggleAttribute(KONAMI_ATTRIBUTE, on);
        try {
          if (on) localStorage.setItem(KONAMI_STORAGE_KEY, "on");
          else localStorage.removeItem(KONAMI_STORAGE_KEY);
        } catch {}
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}

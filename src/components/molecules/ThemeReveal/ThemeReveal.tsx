"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ThemeReveal.module.css";

/** Radius (px) of the circle that reveals the dark theme; the outer
 *  ~50px eases out softly into the page. */
const REVEAL_RADIUS = 120;

/** The spotlight closes once the pointer is this close (px) to the left
 *  or right edge of the window, instead of being cut off there. */
const EDGE_CLOSE = 12;

export interface ThemeRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * ThemeReveal — a spotlight around the cursor that shows the dark
 * Konami Code theme for the wrapped section.
 *
 * It keeps a live copy of the section in a layer on top that carries
 * `data-konami` (so the real dark theme styles apply to it) and masks
 * that layer to a soft-edged circle following the pointer, fading out
 * toward the bottom of the section. The copy is hidden from
 * screen readers and can't be focused or clicked. The copy keeps the
 * light section's width and fonts so it lines up exactly; only colors,
 * backgrounds and effects change inside the circle.
 * Desktop mouse only; off for reduced motion and when the whole
 * site is already in the Konami theme.
 */
export function ThemeReveal({ children, className }: ThemeRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const source = sourceRef.current;
    const layer = layerRef.current;
    const copy = copyRef.current;
    if (!wrap || !source || !layer || !copy) return;

    const canReveal =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canReveal) return;

    // Mirror the section into the reveal layer, and keep it in sync when
    // its content changes (e.g. the away message picks its text).
    const sync = () => {
      const clone = source.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
      copy.replaceChildren(...Array.from(clone.childNodes));
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(source, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    // Track the pointer anywhere across the section's full-width band
    // (including the sparkly sides), not just over its content column.
    let frame = 0;
    let last: { x: number; y: number } | null = null;
    const update = () => {
      frame = 0;
      if (!last) return;
      const rect = wrap.getBoundingClientRect();
      const inside =
        last.y >= rect.top &&
        last.y <= rect.bottom &&
        last.x >= EDGE_CLOSE &&
        last.x <= document.documentElement.clientWidth - EDGE_CLOSE;
      const layerRect = layer.getBoundingClientRect();
      layer.style.setProperty("--reveal-x", `${last.x - layerRect.left}px`);
      layer.style.setProperty("--reveal-y", `${last.y - layerRect.top}px`);
      layer.style.setProperty(
        "--reveal-r",
        inside ? `${REVEAL_RADIUS}px` : "0px",
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      last = null;
      layer.style.setProperty("--reveal-r", "0px");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={[styles.wrap, className].filter(Boolean).join(" ")}
    >
      <div ref={sourceRef} className={styles.source}>
        {children}
      </div>
      {/* Dark-theme copy, revealed under the cursor. Decorative only. */}
      <div
        ref={layerRef}
        className={styles.layer}
        data-konami=""
        aria-hidden="true"
        inert
      >
        <div ref={copyRef} className={styles.copy} />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./SiteCursor.module.css";

/** Elements that shrink the cursor even without an explicit
 *  `data-cursor-label`, i.e. "links that don't have a set cursor
 *  style". */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label';

/** Arrow height in px; width follows the shape's 300:378 aspect ratio. */
const DEFAULT_SIZE = 18;
const SHRINK_SIZE = 12;
const ARROW_ASPECT = 300 / 378;

/** Motion-trail tuning: how far (px) the cursor must travel before a
 *  new ghost snapshot is recorded, how many snapshots to keep, how
 *  long (ms) without movement before the trail clears, and how each
 *  snapshot's opacity/size shrink further from the cursor. */
const TRAIL_MIN_DISTANCE = 8;
const TRAIL_IDLE_MS = 150;

interface TrailStyle {
  opacities: number[];
  sizeScales: number[];
  idleMs: number;
}

/** Normal theme: a barely-there two-step trail. */
const TRAIL_DEFAULT: TrailStyle = {
  opacities: [0.14, 0.05],
  sizeScales: [0.85, 0.6],
  idleMs: TRAIL_IDLE_MS,
};

/** Konami Code (dark) theme: a longer, clearly visible purple trail. */
const TRAIL_KONAMI: TrailStyle = {
  opacities: [0.85, 0.7, 0.55, 0.42, 0.3, 0.2, 0.12],
  sizeScales: [0.92, 0.84, 0.76, 0.68, 0.6, 0.52, 0.44],
  idleMs: 260,
};

const isKonami = () => document.documentElement.hasAttribute("data-konami");

interface Point {
  x: number;
  y: number;
}

/**
 * SiteCursor — replaces the system cursor with a small arrow that
 * shrinks over interactive elements, expands into a labeled pill over
 * elements with a `data-cursor-label` attribute (e.g. portfolio
 * cards), and leaves a faint, fading trail while moving. Desktop-mouse
 * only (`hover: hover` + `pointer: fine`); does nothing on touch
 * devices or inside the Sanity Studio.
 */
export function SiteCursor() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [shrink, setShrink] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [trail, setTrail] = useState<Point[]>([]);
  const [konami, setKonami] = useState(false);

  const lastTrailPointRef = useRef<Point | null>(null);
  const lastPointerRef = useRef<Point | null>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isStudio) return;
    setEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, [isStudio]);

  // Follow the Konami Code theme on and off (it's an attribute on <html>).
  useEffect(() => {
    if (!enabled || isStudio) return;
    setKonami(isKonami());
    const observer = new MutationObserver(() => setKonami(isKonami()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-konami"],
    });
    return () => observer.disconnect();
  }, [enabled, isStudio]);

  useEffect(() => {
    if (!enabled || isStudio) return;

    const root = document.documentElement;
    root.classList.add(styles.hideNativeCursor);

    const clearIdleTimeout = () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };

    /** Update the label/shrink state for whatever is under the pointer.
     *  Returns true when that's a labeled element (e.g. a portfolio card). */
    const updateForTarget = (target: Element | null) => {
      const labelTarget = target?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelTarget?.dataset.cursorLabel ?? null);
      setShrink(Boolean(labelTarget || target?.closest(INTERACTIVE_SELECTOR)));
      return Boolean(labelTarget);
    };

    const handleMove = (event: MouseEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      lastPointerRef.current = point;
      setPos(point);
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const overLabel = updateForTarget(target);

      if (overLabel) {
        // No trail over portfolio cards — it clutters the label pill.
        lastTrailPointRef.current = null;
        setTrail([]);
        clearIdleTimeout();
        return;
      }

      const last = lastTrailPointRef.current;
      const distance = last
        ? Math.hypot(point.x - last.x, point.y - last.y)
        : Infinity;
      const trailStyle = isKonami() ? TRAIL_KONAMI : TRAIL_DEFAULT;
      if (distance >= TRAIL_MIN_DISTANCE) {
        lastTrailPointRef.current = point;
        setTrail((prev) =>
          [point, ...prev].slice(0, trailStyle.opacities.length),
        );
      }

      clearIdleTimeout();
      idleTimeoutRef.current = setTimeout(() => {
        lastTrailPointRef.current = null;
        setTrail([]);
      }, trailStyle.idleMs);
    };

    // Scrolling moves the page under a still mouse without firing
    // mousemove, so re-check what's under the pointer after each scroll
    // event — otherwise a card's label would follow the cursor down the
    // page. (Browsers already fire scroll at most once per frame.)
    const handleScroll = () => {
      const point = lastPointerRef.current;
      if (!point) return;
      updateForTarget(document.elementFromPoint(point.x, point.y));
    };

    const handleLeave = () => {
      setVisible(false);
      lastPointerRef.current = null;
      lastTrailPointRef.current = null;
      setTrail([]);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true, // also catch scrolling inside scrollable elements
    });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      root.classList.remove(styles.hideNativeCursor);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      document.removeEventListener("mouseleave", handleLeave);
      clearIdleTimeout();
    };
  }, [enabled, isStudio]);

  if (!enabled || isStudio || !visible) return null;

  const size = shrink ? SHRINK_SIZE : DEFAULT_SIZE;
  const trailStyle = konami ? TRAIL_KONAMI : TRAIL_DEFAULT;

  return (
    <>
      {trail.map((point, i) => {
        const trailSize = size * (trailStyle.sizeScales[i] ?? 1);
        return (
          <span
            key={`${point.x}-${point.y}`}
            className={styles.trailDot}
            style={{
              left: point.x,
              top: point.y,
              width: trailSize * ARROW_ASPECT,
              height: trailSize,
              opacity: trailStyle.opacities[i] ?? 0,
            }}
            aria-hidden
          />
        );
      })}

      <div
        className={styles.cursor}
        style={{
          left: pos.x,
          top: pos.y,
        }}
        aria-hidden
      >
        <span className={styles.dotOutline}>
          <span
            className={styles.dot}
            style={{ width: size * ARROW_ASPECT, height: size }}
          />
        </span>
        {label && (
          <span className={`${styles.label} type-label-01`}>{label}</span>
        )}
      </div>
    </>
  );
}

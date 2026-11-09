"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./SiteCursor.module.css";

/** Elements that shrink the cursor even without an explicit
 *  `data-cursor-label`, i.e. "links that don't have a set cursor
 *  style". */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label';

const DEFAULT_SIZE = 14;
const SHRINK_SIZE = 8;

/**
 * SiteCursor — replaces the system cursor with a small square that
 * shrinks over interactive elements, and expands into a labeled pill
 * over elements with a `data-cursor-label` attribute (e.g. portfolio
 * cards). Desktop-mouse only (`hover: hover` + `pointer: fine`); does
 * nothing on touch devices or inside the Sanity Studio.
 */
export function SiteCursor() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [shrink, setShrink] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (isStudio) return;
    setEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, [isStudio]);

  useEffect(() => {
    if (!enabled || isStudio) return;

    const root = document.documentElement;
    root.classList.add(styles.hideNativeCursor);

    const handleMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const labelTarget = target?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelTarget?.dataset.cursorLabel ?? null);
      setShrink(Boolean(labelTarget || target?.closest(INTERACTIVE_SELECTOR)));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      root.classList.remove(styles.hideNativeCursor);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, isStudio]);

  if (!enabled || isStudio || !visible) return null;

  const size = shrink ? SHRINK_SIZE : DEFAULT_SIZE;

  return (
    <div
      className={styles.cursor}
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-${size / 2}px, -${size / 2}px)`,
      }}
      aria-hidden
    >
      <span className={styles.dot} style={{ width: size, height: size }} />
      {label && (
        <span className={`${styles.label} type-label-01`}>{label}</span>
      )}
    </div>
  );
}

"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import styles from "./AnchorNav.module.css";

export interface AnchorNavItem {
  /** Visible label for the link. */
  label: string;
  /** Target element id (without `#`). */
  target: string;
}

export interface AnchorNavProps extends HTMLAttributes<HTMLElement> {
  /** Ordered list of anchor links. */
  items: AnchorNavItem[];
  /** Extra pixels to offset from the top when calculating active section
   *  and when scrolling into view. Defaults to `48` (header height). */
  stickyOffset?: number;
}

export const AnchorNav = forwardRef<HTMLElement, AnchorNavProps>(
  function AnchorNav(
    { items, stickyOffset = 48, className, ...rest },
    ref,
  ) {
    const [activeTarget, setActiveTarget] = useState<string>(
      items[0]?.target ?? "",
    );
    const [isStuck, setIsStuck] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const navHeight = 48;

    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsStuck(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: `-${stickyOffset}px 0px 0px 0px` },
      );

      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [stickyOffset]);

    useEffect(() => {
      let ticking = false;
      const offset = stickyOffset + navHeight + 16;

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          let current = items[0]?.target ?? "";
          for (const item of items) {
            const el = document.getElementById(item.target);
            if (el && el.getBoundingClientRect().top <= offset) {
              current = item.target;
            }
          }
          setActiveTarget(current);
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, [items, stickyOffset]);

    const handleClick = useCallback(
      (target: string) => {
        const el = document.getElementById(target);
        if (!el) return;
        const top =
          el.getBoundingClientRect().top +
          window.scrollY -
          stickyOffset -
          navHeight -
          8;
        window.scrollTo({ top, behavior: "smooth" });
      },
      [stickyOffset],
    );

    const rootClasses = [
      styles.root,
      isStuck ? styles.rootVisible : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        <div
          ref={sentinelRef}
          style={{ blockSize: 0, pointerEvents: "none" }}
          aria-hidden="true"
        />
        <nav
          ref={ref}
          className={rootClasses}
          style={
            { "--anchor-nav-offset": `${stickyOffset}px` } as React.CSSProperties
          }
          aria-label="Page sections"
          {...rest}
        >
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.target}>
                <button
                  type="button"
                  className={[
                    styles.link,
                    activeTarget === item.target ? styles.linkActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleClick(item.target)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  },
);

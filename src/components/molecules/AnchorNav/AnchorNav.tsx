"use client";

import {
  forwardRef,
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

/**
 * AnchorNav — renders a sticky scroll progress bar that only becomes
 * visible once the bar has reached its sticky position (i.e. the content
 * area has scrolled to the top of the viewport).
 */
export const AnchorNav = forwardRef<HTMLDivElement, AnchorNavProps>(
  function AnchorNav(
    { items, stickyOffset = 48, className, ...rest },
    ref,
  ) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isStuck, setIsStuck] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    /* Detect when the bar reaches its sticky position using an
       IntersectionObserver on a sentinel element placed just above. */
    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // When the sentinel scrolls out of view above, the bar is stuck
          setIsStuck(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: `-${stickyOffset + 32}px 0px 0px 0px` },
      );

      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [stickyOffset]);

    /* Track scroll progress. */
    useEffect(() => {
      let ticking = false;

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const rootClasses = [
      styles.root,
      isStuck ? styles.rootVisible : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        {/* Sentinel — sits at the bar's natural position in flow.
            When it scrolls above the viewport, the bar is "stuck". */}
        <div
          ref={sentinelRef}
          style={{ blockSize: 0, pointerEvents: "none" }}
          aria-hidden="true"
        />
        <div
          ref={ref}
          className={rootClasses}
          style={
            { "--anchor-nav-offset": `${stickyOffset}px` } as React.CSSProperties
          }
          {...rest}
        >
          <div
            className={styles.progressBar}
            style={{ inlineSize: `${scrollProgress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </>
    );
  },
);

"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ChevronDown, ChevronUp } from "@carbon/icons-react";
import styles from "./ByteCard.module.css";

export interface ByteCardProps extends HTMLAttributes<HTMLElement> {
  /** Formatted display date (e.g. "Jan 5, 2026"). */
  date?: string;
  /** ISO date for the `<time>` element. */
  dateISO?: string;
  /** Category labels shown inline with the date. */
  categories?: string[];
  /** Card heading. */
  title: string;
  /** Description text. Supports multiple paragraphs as an array. */
  description?: string | string[];
  /** Character limit before collapsing with Read More. Defaults to 300. */
  descriptionLimit?: number;
}

const DEFAULT_LIMIT = 300;

export const ByteCard = forwardRef<HTMLElement, ByteCardProps>(
  function ByteCard(
    {
      date,
      dateISO,
      categories,
      title,
      description,
      descriptionLimit = DEFAULT_LIMIT,
      className,
      ...rest
    },
    ref,
  ) {
    const [expanded, setExpanded] = useState(false);
    /* showExpanded tracks which content is in flow — it lags behind
       `expanded` on collapse so the tall content stays in flow while
       the height animates down. */
    const [showExpanded, setShowExpanded] = useState(false);
    /* Explicit pixel height for the collapsible wrapper. Starts as
       `undefined` (no constraint) and gets set to a measured value
       after the first layout so CSS transitions always have a
       concrete start/end value. */
    const [height, setHeight] = useState<number | undefined>(undefined);
    const collapsibleRef = useRef<HTMLDivElement>(null);
    const collapsedRef = useRef<HTMLDivElement>(null);
    const expandedRef = useRef<HTMLDivElement>(null);
    const didMountRef = useRef(false);
    const classes = [styles.root, className].filter(Boolean).join(" ");

    const paragraphs = Array.isArray(description)
      ? description
      : description
        ? [description]
        : [];
    const fullText = paragraphs.join(" ");
    const isCollapsible = fullText.length > descriptionLimit;

    /* Measure the collapsed content after first paint and lock in an
       explicit pixel height so future transitions have a starting value. */
    useEffect(() => {
      if (!isCollapsible) return;
      if (!didMountRef.current) {
        didMountRef.current = true;
        const h = collapsedRef.current?.scrollHeight;
        if (h != null) setHeight(h);
      }
    }, [isCollapsible]);

    const toggle = useCallback(() => {
      if (!expanded) {
        // Expanding — swap content to full, then animate height up
        setShowExpanded(true);
        // Wait a frame so the full content is in the DOM and measurable
        requestAnimationFrame(() => {
          const h = expandedRef.current?.scrollHeight;
          if (h != null) setHeight(h);
        });
      } else {
        // Collapsing — animate height down first (content swaps on transitionEnd)
        const h = collapsedRef.current?.scrollHeight;
        if (h != null) setHeight(h);
      }
      setExpanded((v) => !v);
    }, [expanded]);

    const handleTransitionEnd = () => {
      if (!expanded) {
        // Collapse animation finished — now swap to truncated content
        setShowExpanded(false);
      }
    };

    return (
      <article ref={ref} className={classes} {...rest}>
        <div className={styles.body}>
          {categories && categories.length > 0 && (
            <div className={styles.metaRow}>
              <span className={styles.categories}>
                {categories.slice(0, 3).map((cat, i) => (
                  <span key={i} className={styles.categoryWrap}>
                    {i > 0 && <span className={styles.dot} aria-hidden>·</span>}
                    <span className={styles.category}>{cat}</span>
                  </span>
                ))}
              </span>
            </div>
          )}

          <h3 className={`${styles.title} type-heading-04`}>{title}</h3>

          {date && (
            <time className={styles.date} dateTime={dateISO}>
              {date}
            </time>
          )}

          {paragraphs.length > 0 && (
            <div className={styles.descriptionWrap}>
              {!isCollapsible &&
                paragraphs.map((p, i) => (
                  <p key={i} className={`${styles.description} type-body-01`}>
                    {p}
                  </p>
                ))}

              {isCollapsible && (
                <>
                  <div
                    ref={collapsibleRef}
                    className={styles.collapsible}
                    style={{ maxBlockSize: height }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    {/* Collapsed (truncated) content */}
                    <div
                      ref={collapsedRef}
                      className={showExpanded ? styles.contentHidden : undefined}
                    >
                      <p className={`${styles.description} type-body-01`}>
                        {fullText.slice(0, descriptionLimit).trimEnd()}&hellip;{" "}
                        <button
                          className={styles.toggleInline}
                          onClick={toggle}
                        >
                          <span>Read More</span>
                          <ChevronDown size={16} aria-hidden />
                        </button>
                      </p>
                    </div>

                    {/* Expanded (full) content */}
                    <div
                      ref={expandedRef}
                      className={!showExpanded ? styles.contentHidden : undefined}
                    >
                      {paragraphs.map((p, i) => (
                        <p key={i} className={`${styles.description} type-body-01`}>
                          {p}
                          {i === paragraphs.length - 1 && (
                            <>
                              <button
                                className={`${styles.toggleInline} ${styles.toggleReadLess}`}
                                onClick={toggle}
                              >
                                <span>Read Less</span>
                                <ChevronUp size={16} aria-hidden />
                              </button>
                            </>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </article>
    );
  },
);

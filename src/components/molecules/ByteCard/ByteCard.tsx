"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import {
  PortableText as PortableTextReact,
  toPlainText,
  type PortableTextComponents,
} from "@portabletext/react";
import { ChevronDown, ChevronUp, Link as LinkIcon } from "@carbon/icons-react";
import { Tooltip } from "@components/atoms/Tooltip";
import styles from "./ByteCard.module.css";

export interface ByteCardProps extends HTMLAttributes<HTMLElement> {
  /** Formatted display date (e.g. "Jan 5, 2026"). */
  date?: string;
  /** ISO date for the `<time>` element. */
  dateISO?: string;
  /** Category labels shown inline with the date. */
  categories?: string[];
  /** Callback when a category label is clicked. */
  onCategoryClick?: (category: string) => void;
  /** Card heading. */
  title: string;
  /** Byte slug for the permalink. */
  slug?: string;
  /** Rich body content as Portable Text blocks. */
  body?: any[];
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
      onCategoryClick,
      title,
      slug,
      body,
      descriptionLimit = DEFAULT_LIMIT,
      className,
      ...rest
    },
    ref,
  ) {
    const [expanded, setExpanded] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyLink = useCallback(() => {
      if (!slug) return;
      const url = `${window.location.origin}/bytes/${slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }, [slug]);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const collapsibleRef = useRef<HTMLDivElement>(null);
    const collapsedRef = useRef<HTMLDivElement>(null);
    const expandedRef = useRef<HTMLDivElement>(null);
    const didMountRef = useRef(false);
    const classes = [styles.root, className].filter(Boolean).join(" ");

    const hasBody = body && body.length > 0;
    const plainText = hasBody ? toPlainText(body) : "";
    const isCollapsible = plainText.length > descriptionLimit;

    /* Build PortableText components that append the toggle button
       inline at the end of the last block. */
    const makeComponents = (
      toggleBtn: React.ReactNode,
    ): PortableTextComponents => {
      // Find the _key of the last renderable block
      const lastBlockKey = hasBody
        ? [...body].reverse().find((b: any) => b._type === "block")?._key
        : undefined;

      return {
        block: {
          normal: ({ children, value }) => {
            const isLast = value?._key === lastBlockKey;
            return (
              <p>
                {children}
                {isLast && toggleBtn}
              </p>
            );
          },
        },
        marks: {
          strong: ({ children }) => <strong>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          "strike-through": ({ children }) => <s>{children}</s>,
          code: ({ children }) => <code>{children}</code>,
          link: ({ value: v, children }) => {
            const { href, blank } = v ?? {};
            return blank ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ) : (
              <a href={href}>{children}</a>
            );
          },
        },
        list: {
          bullet: ({ children }) => <ul>{children}</ul>,
          number: ({ children }) => <ol>{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => <li>{children}</li>,
          number: ({ children }) => <li>{children}</li>,
        },
      };
    };

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
        setShowExpanded(true);
        requestAnimationFrame(() => {
          const h = expandedRef.current?.scrollHeight;
          if (h != null) setHeight(h);
        });
      } else {
        const h = collapsedRef.current?.scrollHeight;
        if (h != null) setHeight(h);
      }
      setExpanded((v) => !v);
    }, [expanded]);

    const handleTransitionEnd = () => {
      if (!expanded) {
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
                    <button
                      className={styles.category}
                      onClick={() => onCategoryClick?.(cat)}
                    >
                      {cat}
                    </button>
                  </span>
                ))}
              </span>
            </div>
          )}

          <h3 className={`${styles.title} type-heading-04`}>
            {title}
            {slug && (
              <Tooltip label={copied ? "Copied!" : "Copy Link"} align="top">
                <button
                  className={styles.copyLink}
                  onClick={copyLink}
                  aria-label="Copy link to this byte"
                >
                  <LinkIcon size={16} />
                </button>
              </Tooltip>
            )}
          </h3>

          {date && (
            <time className={styles.date} dateTime={dateISO}>
              {date}
            </time>
          )}

          {hasBody && (
            <div className={styles.descriptionWrap}>
              {!isCollapsible && (
                <div className={`${styles.richBody} type-body-01`}>
                  <PortableTextReact value={body} components={makeComponents(null)} />
                </div>
              )}

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
                      <div className={`${styles.richBody} ${styles.richBodyClamped} type-body-01`}>
                        <PortableTextReact
                          value={body}
                          components={makeComponents(null)}
                        />
                      </div>
                      <button
                        className={styles.toggleBlock}
                        onClick={toggle}
                      >
                        <span>Read All</span>
                        <ChevronDown size={16} aria-hidden />
                      </button>
                    </div>

                    {/* Expanded (full) content */}
                    <div
                      ref={expandedRef}
                      className={!showExpanded ? styles.contentHidden : undefined}
                    >
                      <div className={`${styles.richBody} type-body-01`}>
                        <PortableTextReact
                          value={body}
                          components={makeComponents(null)}
                        />
                      </div>
                      <button
                        className={styles.toggleBlock}
                        onClick={toggle}
                      >
                        <span>Read Less</span>
                        <ChevronUp size={16} aria-hidden />
                      </button>
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

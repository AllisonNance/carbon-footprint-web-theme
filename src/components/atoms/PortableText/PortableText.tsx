import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import styles from "./PortableText.module.css";

const HEX_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const DEFAULT_CALLOUT_BACKGROUND = "var(--gray-10)";

/** Older callouts stored a named swatch instead of a hex code. */
const LEGACY_CALLOUT_BACKGROUNDS: Record<string, string> = {
  "gray-10": "var(--gray-10)",
  white: "var(--white)",
  "taupe-10": "var(--taupe-10)",
  "taupe-20": "var(--taupe-20)",
};

/** Hex code from Sanity → CSS color; anything invalid falls back to light gray. */
function calloutBackground(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_CALLOUT_BACKGROUND;
  const v = value.trim();
  if (HEX_COLOR.test(v)) return v;
  return LEGACY_CALLOUT_BACKGROUNDS[v] ?? DEFAULT_CALLOUT_BACKGROUND;
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    "strike-through": ({ children }) => <s>{children}</s>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ value, children }) => {
      const { href, blank } = value ?? {};
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
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const maxWidth =
        typeof value.maxWidth === "number" && value.maxWidth > 0
          ? value.maxWidth
          : undefined;
      // Request 2x the display width for sharp images on high-DPI screens.
      const requestWidth = maxWidth ? Math.min(maxWidth * 2, 2400) : 1200;
      const src = urlFor(value)
        .width(requestWidth)
        .quality(80)
        .auto("format")
        .url();
      return (
        <figure
          className={styles.figure}
          style={
            maxWidth
              ? { maxInlineSize: `${maxWidth}px`, marginInline: "auto" }
              : undefined
          }
        >
          <img
            src={src}
            alt={value.alt || ""}
            loading="lazy"
            className={styles.image}
          />
          {value.caption && (
            <figcaption className={styles.caption}>{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    imageCallout: ({ value }) => {
      if (!value?.image?.asset) return null;
      const imageMaxWidth =
        typeof value.imageMaxWidth === "number" && value.imageMaxWidth > 0
          ? value.imageMaxWidth
          : undefined;
      // Request 2x the display width for sharp images on high-DPI screens.
      const src = urlFor(value.image)
        .width(imageMaxWidth ? Math.min(imageMaxWidth * 2, 2400) : 1200)
        .quality(80)
        .auto("format")
        .url();
      const background = calloutBackground(value.background);
      return (
        <figure className={styles.callout} style={{ backgroundColor: background }}>
          {value.title && (
            <p className={styles.calloutTitle}>{value.title}</p>
          )}
          <img
            src={src}
            alt={value.image.alt || ""}
            loading="lazy"
            className={styles.calloutImage}
            style={
              imageMaxWidth
                ? { maxInlineSize: `${imageMaxWidth}px`, marginInline: "auto" }
                : undefined
            }
          />
          {value.caption && (
            <figcaption className={styles.calloutCaption}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    tableCallout: ({ value }) => {
      const rows: { _key?: string; label?: string; value?: string }[] =
        Array.isArray(value?.rows) ? value.rows : [];
      if (rows.length === 0) return null;
      const hasHeaders = Boolean(value.column1Header || value.column2Header);
      return (
        <div
          className={styles.tableCallout}
          style={{ backgroundColor: calloutBackground(value.background) }}
        >
          <table className={styles.table}>
            {value.caption && (
              <caption className={styles.tableCaption}>{value.caption}</caption>
            )}
            {hasHeaders && (
              <thead>
                <tr>
                  <th scope="col">{value.column1Header}</th>
                  <th scope="col">{value.column2Header}</th>
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, i) => (
                <tr key={row._key ?? i}>
                  <th scope="row">{row.label}</th>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    video: ({ value }) => {
      if (!value?.url) return null;
      // Convert YouTube/Vimeo URLs to embed format
      const embedUrl = toEmbedUrl(value.url);
      return (
        <figure className={styles.figure}>
          <div className={styles.videoWrap}>
            <iframe
              src={embedUrl}
              title={value.caption || "Embedded video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          </div>
          {value.caption && (
            <figcaption className={styles.caption}>{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

/** Convert YouTube / Vimeo watch URLs to embeddable URLs. */
function toEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return url;
}

export interface PortableTextProps {
  value: PortableTextBlock[];
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextReact value={value} components={components} />;
}

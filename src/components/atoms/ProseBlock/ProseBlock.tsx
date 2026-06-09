import { forwardRef, type HTMLAttributes } from "react";
import styles from "./ProseBlock.module.css";

export interface ProseBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional max-width override. Defaults to 65ch via CSS. */
  maxWidth?: string;
}

/**
 * ProseBlock — a typographic container for rich / WYSIWYG content.
 *
 * Wrap any block of rendered HTML (from Portable Text, markdown, or
 * raw markup) in this component and nested elements (h2–h4, p, ul, ol,
 * blockquote, img, video, figure, code, pre, hr, a) will inherit the
 * project's type tokens and spacing automatically.
 *
 * No structure opinions — it just makes rich content look right.
 */
export const ProseBlock = forwardRef<HTMLDivElement, ProseBlockProps>(
  function ProseBlock({ maxWidth, className, style, children, ...rest }, ref) {
    const classes = [styles.prose, className].filter(Boolean).join(" ");
    const mergedStyle = maxWidth
      ? { ...style, maxInlineSize: maxWidth }
      : style;

    return (
      <div ref={ref} className={classes} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  },
);

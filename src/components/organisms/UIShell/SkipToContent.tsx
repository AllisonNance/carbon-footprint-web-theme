import { forwardRef, type AnchorHTMLAttributes } from "react";
import styles from "./UIShell.module.css";

/**
 * SkipToContent — accessibility shortcut that sighted users can't see
 * but keyboard users can tab to. When focused, it pops out of the
 * header and links to the main content region.
 *
 * Add `id="main-content"` (or override `href`) on your `<main>` element.
 */
export interface SkipToContentProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children?: string;
  href?: string;
}

export const SkipToContent = forwardRef<HTMLAnchorElement, SkipToContentProps>(
  function SkipToContent(
    {
      children = "Skip to main content",
      className,
      href = "#main-content",
      tabIndex = 0,
      ...rest
    },
    ref,
  ) {
    const classes = [styles.skipToContent, className].filter(Boolean).join(" ");
    return (
      <a
        ref={ref}
        href={href}
        tabIndex={tabIndex}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

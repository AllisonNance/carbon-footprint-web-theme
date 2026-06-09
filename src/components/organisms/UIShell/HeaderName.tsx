import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./UIShell.module.css";

/**
 * HeaderName — the product / brand link in the Header.
 *
 * Two modes:
 * 1. **Text lockup** — pass `prefix` (defaults to "IBM") and `children`
 *    as the product name. Example: `<HeaderName prefix="IBM">Platform</HeaderName>`
 * 2. **Logo** — pass a `logo` node (typically an `<img>` or inline SVG).
 *    When `logo` is set, it replaces the text lockup entirely.
 */
export interface HeaderNameProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children?: ReactNode;
  /** Prefix shown before the product name. Defaults to "IBM". */
  prefix?: string;
  /** Optional brand logo. When provided, it replaces `prefix`+`children`. */
  logo?: ReactNode;
}

export const HeaderName = forwardRef<HTMLAnchorElement, HeaderNameProps>(
  function HeaderName(
    { children, className, logo, prefix = "IBM", href = "/", ...rest },
    ref,
  ) {
    const classes = [styles.name, "gradient-underline", "gradient-underline-hover", className].filter(Boolean).join(" ");
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {logo ? (
          <span className={styles.nameLogo}>{logo}</span>
        ) : (
          <>
            {prefix && (
              <>
                <span className={styles.namePrefix}>{prefix}</span>
                &nbsp;
              </>
            )}
            <span>{children}</span>
          </>
        )}
      </a>
    );
  },
);

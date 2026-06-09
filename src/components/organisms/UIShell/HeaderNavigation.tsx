import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./UIShell.module.css";

/**
 * HeaderNavigation — wraps `HeaderMenuItem` and `HeaderMenu` children
 * in a semantic `<nav><ul>` structure. Require an `aria-label` (or
 * `aria-labelledby`) so screen readers can distinguish this nav from
 * any others on the page.
 */
export interface HeaderNavigationProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const HeaderNavigation = forwardRef<
  HTMLElement,
  HeaderNavigationProps
>(function HeaderNavigation({ children, className, ...rest }, ref) {
  const classes = [styles.nav, className].filter(Boolean).join(" ");
  return (
    <nav ref={ref} className={classes} {...rest}>
      <ul className={styles.menuBar}>{children}</ul>
    </nav>
  );
});

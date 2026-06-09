import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import styles from "./UIShell.module.css";

export interface SideNavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children?: ReactNode;
  /** Mark as the current page. */
  isActive?: boolean;
}

export const SideNavLink = forwardRef<HTMLAnchorElement, SideNavLinkProps>(
  function SideNavLink({ children, className, isActive, ...rest }, ref) {
    const classes = [
      styles.sideNavLink,
      isActive ? styles.sideNavLinkActive : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <li className={styles.sideNavItem}>
        <a
          ref={ref}
          className={classes}
          aria-current={isActive ? "page" : undefined}
          {...rest}
        >
          <span className={styles.sideNavLinkText}>{children}</span>
        </a>
      </li>
    );
  },
);

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./UIShell.module.css";

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /** Whether the side-nav is expanded (controlled by HeaderContainer). */
  expanded?: boolean;
  /** Called when the overlay backdrop is clicked. */
  onOverlayClick?: () => void;
}

export const SideNav = forwardRef<HTMLElement, SideNavProps>(
  function SideNav({ children, className, expanded, onOverlayClick, ...rest }, ref) {
    const classes = [
      styles.sideNav,
      expanded ? styles.sideNavExpanded : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        <div
          className={`${styles.sideNavOverlay} ${expanded ? styles.sideNavOverlayActive : ""}`}
          onClick={onOverlayClick}
        />
        <nav ref={ref} className={classes} aria-label="Side navigation" {...rest}>
          {children}
        </nav>
      </>
    );
  },
);

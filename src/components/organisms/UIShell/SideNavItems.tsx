import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./UIShell.module.css";

export interface SideNavItemsProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
}

export const SideNavItems = forwardRef<HTMLUListElement, SideNavItemsProps>(
  function SideNavItems({ children, className, ...rest }, ref) {
    const classes = [styles.sideNavItems, className].filter(Boolean).join(" ");
    return (
      <ul ref={ref} className={classes} {...rest}>
        {children}
      </ul>
    );
  },
);

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./UIShell.module.css";

/**
 * HeaderGlobalBar — the right-aligned container that holds
 * `HeaderGlobalAction` buttons (search, notifications, app switcher,
 * etc.) inside a `Header`.
 */
export interface HeaderGlobalBarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const HeaderGlobalBar = forwardRef<
  HTMLDivElement,
  HeaderGlobalBarProps
>(function HeaderGlobalBar({ children, className, ...rest }, ref) {
  const classes = [styles.globalBar, className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

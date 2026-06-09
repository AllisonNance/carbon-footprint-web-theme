import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./UIShell.module.css";

/**
 * The UI Shell Header — a top-level `<header>` bar that houses the
 * product name, navigation, and global actions.
 *
 * By default the header inherits the active page theme so it reflects
 * whatever `data-theme` is set on `<html>` or a parent. Pass an explicit
 * `theme` prop to pin it to a specific palette — for example
 * `theme="g100"` to match IBM's always-dark header convention.
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-ui-shell--overview
 */
export type HeaderTheme = "white" | "g100";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /** Pin the header to a specific Carbon theme. Omit to inherit. */
  theme?: HeaderTheme;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { children, className, theme, ...rest },
  ref,
) {
  const classes = [styles.header, className].filter(Boolean).join(" ");
  return (
    <header
      ref={ref}
      data-theme={theme}
      className={classes}
      {...rest}
    >
      <div className={styles.headerInner}>{children}</div>
    </header>
  );
});

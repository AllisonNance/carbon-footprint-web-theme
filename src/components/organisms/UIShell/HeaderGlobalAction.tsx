import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./UIShell.module.css";

/**
 * HeaderGlobalAction — an icon button rendered inside
 * `HeaderGlobalBar`. Children should be an icon component (e.g. from
 * `@carbon/icons-react`). Set `isActive` when the action toggles a
 * panel open so the button paints in its pressed state.
 *
 * The native `title` attribute provides a hover tooltip — for richer
 * tooltip behavior, wrap in the `Tooltip` atom.
 */
export interface HeaderGlobalActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  /** Accessible label (required for a11y, also used as tooltip title). */
  "aria-label": string;
  children: ReactNode;
  isActive?: boolean;
}

export const HeaderGlobalAction = forwardRef<
  HTMLButtonElement,
  HeaderGlobalActionProps
>(function HeaderGlobalAction(
  { "aria-label": ariaLabel, children, className, isActive, ...rest },
  ref,
) {
  const classes = [
    styles.action,
    styles.globalAction,
    isActive ? styles.actionActive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
});

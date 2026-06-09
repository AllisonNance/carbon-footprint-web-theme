import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Tooltip, type TooltipAlign } from "../Tooltip";
import styles from "./IconButton.module.css";

/**
 * Carbon IconButton — a square button rendering a single icon with a
 * tooltip that appears on hover/focus. The `label` is the accessible
 * name on the button AND the tooltip copy.
 *
 * Delegates tooltip behavior to the shared Tooltip primitive.
 *
 * Spec: https://carbondesignsystem.com/components/button/usage/#icon-only-button
 */

export type IconButtonKind = "ghost";
export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonAlign = TooltipAlign;

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  /** Tooltip text. Also used as the button's accessible name. */
  label: string;
  /** Visual style of the button. Defaults to `ghost`. */
  kind?: IconButtonKind;
  /** Button size. sm = 32px, md = 40px, lg = 48px. Defaults to `md`. */
  size?: IconButtonSize;
  /** Where the tooltip appears relative to the button. Defaults to `top`. */
  align?: IconButtonAlign;
  /** Delay before revealing the tooltip (ms). */
  enterDelayMs?: number;
  /** Delay before hiding the tooltip (ms). */
  leaveDelayMs?: number;
  /** Toggle/selected state. Sets `aria-pressed` and styles accordingly. */
  isSelected?: boolean;
  /** The icon node. Typically a 16px (sm/md) or 20px (lg) SVG. */
  children: ReactNode;
}

export function IconButton({
  label,
  kind = "ghost",
  size = "md",
  align = "top",
  enterDelayMs,
  leaveDelayMs,
  isSelected = false,
  className,
  disabled,
  children,
  ...rest
}: IconButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[`kind-${kind}`],
    styles[`size-${size}`],
    isSelected ? styles.selected : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tooltip
      label={label}
      align={align}
      enterDelayMs={enterDelayMs}
      leaveDelayMs={leaveDelayMs}
      disabled={disabled}
    >
      <button
        type="button"
        className={buttonClasses}
        aria-label={label}
        aria-pressed={isSelected || undefined}
        disabled={disabled}
        {...rest}
      >
        <span className={styles.icon} aria-hidden="true">
          {children}
        </span>
      </button>
    </Tooltip>
  );
}

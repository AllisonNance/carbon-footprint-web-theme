import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Close, Menu } from "@carbon/icons-react";
import styles from "./UIShell.module.css";

/**
 * HeaderMenuButton — the hamburger / close toggle that opens the SideNav
 * on narrow viewports. Pair with `HeaderContainer` so the icon flips
 * between menu and close as the nav expands.
 */
export interface HeaderMenuButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "title"> {
  "aria-label"?: string;
  /** Show the `Close` icon when true. */
  isActive?: boolean;
  /** If false, the button is hidden — useful when the shell is rendered
   *  without a SideNav and the hamburger has nothing to toggle. */
  isCollapsible?: boolean;
  /** Override the default `Menu` icon. */
  renderMenuIcon?: ReactNode;
  /** Override the default `Close` icon. */
  renderCloseIcon?: ReactNode;
}

export const HeaderMenuButton = forwardRef<
  HTMLButtonElement,
  HeaderMenuButtonProps
>(function HeaderMenuButton(
  {
    "aria-label": ariaLabel = "Open menu",
    className,
    isActive,
    isCollapsible,
    renderMenuIcon,
    renderCloseIcon,
    ...rest
  },
  ref,
) {
  const classes = [
    styles.action,
    styles.menuButton,
    isActive ? styles.actionActive : "",
    !isCollapsible ? styles.menuButtonHidden : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const menuIcon = renderMenuIcon ?? <Menu size={20} />;
  const closeIcon = renderCloseIcon ?? <Close size={20} />;

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={ariaLabel}
      title={ariaLabel}
      {...rest}
    >
      {isActive ? closeIcon : menuIcon}
    </button>
  );
});

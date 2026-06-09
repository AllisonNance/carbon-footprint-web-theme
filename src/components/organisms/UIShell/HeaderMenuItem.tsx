import {
  forwardRef,
  type AnchorHTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./UIShell.module.css";

/**
 * HeaderMenuItem — a single link inside a `HeaderNavigation` or
 * `HeaderMenu` dropdown. Renders an `<a>` wrapped in an `<li>`.
 *
 * Pass `isActive` to mark the current page. Carbon also honors
 * `aria-current="page"` — when that's set externally, the styling
 * still applies but `isActive` is not re-asserted to avoid conflict.
 */
export interface HeaderMenuItemProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children?: ReactNode;
  isActive?: boolean;
  /** Optional trailing icon (e.g. external-link indicator). */
  renderIcon?: ReactNode;
  /** Role to apply to the underlying `<li>`. */
  role?: LiHTMLAttributes<HTMLLIElement>["role"];
  /** Additional class for the wrapper `<li>`. */
  liClassName?: string;
}

export const HeaderMenuItem = forwardRef<
  HTMLAnchorElement,
  HeaderMenuItemProps
>(function HeaderMenuItem(
  {
    children,
    className,
    isActive,
    renderIcon,
    "aria-current": ariaCurrent,
    role,
    liClassName,
    tabIndex = 0,
    ...rest
  },
  ref,
) {
  const hasCurrentClass = isActive && ariaCurrent !== "page";
  const linkClasses = [
    styles.menuLink,
    hasCurrentClass ? styles.menuLinkCurrent : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li role={role} className={liClassName}>
      <a
        ref={ref}
        className={linkClasses}
        aria-current={hasCurrentClass ? true : ariaCurrent}
        tabIndex={tabIndex}
        {...rest}
      >
        <span className={styles.menuLinkText}>{children}</span>
        {renderIcon && (
          <span className={styles.menuLinkIcon} aria-hidden="true">
            {renderIcon}
          </span>
        )}
      </a>
    </li>
  );
});

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ComponentType,
  type ReactNode,
} from "react";
import { ArrowRight } from "@carbon/icons-react";
import styles from "./Tile.module.css";

/**
 * ClickableTile — an `<a>` rendered like a tile. Use for cards that
 * navigate somewhere. Includes a trailing arrow affordance, hover &
 * active states, and support for a `disabled` visual state (which
 * strips the `href` and exposes `aria-disabled`).
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-tile--overview
 *
 * Skipped: `slug`, `decorator`, `AILabel`, `light`, `hasRoundedCorners`,
 * `enable-v12-tile-default-icons` feature flag.
 */
export interface ClickableTileProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children?: ReactNode;
  /** Visual "pressed" state (doesn't affect interactivity). */
  clicked?: boolean;
  /** Disable navigation and dim the tile. */
  disabled?: boolean;
  /** Icon component rendered in the trailing corner. Defaults to ArrowRight.
   *  Typed loosely to accept the richer `@carbon/icons-react` signatures. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderIcon?: ComponentType<any>;
}

export const ClickableTile = forwardRef<HTMLAnchorElement, ClickableTileProps>(
  function ClickableTile(
    {
      children,
      className,
      clicked = false,
      disabled = false,
      href,
      renderIcon: Icon = ArrowRight,
      onClick,
      onKeyDown,
      rel,
      target,
      ...rest
    },
    ref,
  ) {
    const classes = [
      styles.tile,
      styles.clickable,
      clicked ? styles.clicked : "",
      disabled ? styles.disabled : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const safeRel =
      target === "_blank" && !rel ? "noopener noreferrer" : rel;

    return (
      <a
        ref={ref}
        className={classes}
        href={disabled ? undefined : href}
        role={disabled ? "link" : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        target={target}
        rel={safeRel}
        onClick={disabled ? undefined : onClick}
        onKeyDown={disabled ? undefined : onKeyDown}
        {...rest}
      >
        {children}
        <Icon className={styles.trailingIcon} aria-hidden />
      </a>
    );
  },
);

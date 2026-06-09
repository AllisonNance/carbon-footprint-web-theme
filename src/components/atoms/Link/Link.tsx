"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ElementType,
  type ForwardedRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import styles from "./Link.module.css";

/**
 * Carbon Link — a styled anchor with size variants, inline/standalone
 * treatments, visited styles, an optional trailing icon, and proper
 * disabled semantics (no href + role="link" + aria-disabled).
 *
 * Polymorphic: pass `as={YourRouterLink}` to render something other than
 * a native <a> (e.g. Next.js Link, react-router Link).
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-link--overview
 */

export type LinkSize = "sm" | "md" | "lg";

/** Props specific to Link, independent of the element being rendered. */
export interface LinkOwnProps {
  /** Element or component to render the link as. Defaults to `a`. */
  as?: ElementType;
  /**
   * Renders a small icon-sized svg component trailing the label
   * (non-inline only). Accepts any icon component — e.g. an icon from
   * `@carbon/icons-react` or your own SVG wrapper.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderIcon?: ComponentType<any>;
  /** Size. Defaults to `md`. */
  size?: LinkSize;
  /** Inline variant — matches surrounding text flow and keeps an underline. */
  inline?: boolean;
  /** Apply visited styles after the link is clicked (via `:visited`). */
  visited?: boolean;
  /** Disabled semantics per https://www.scottohara.me/blog/2021/05/28/disabled-links.html */
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * Helper type: props of the rendered element merged with our own, with
 * our props taking precedence if they collide.
 */
export type LinkProps<E extends ElementType = "a"> = LinkOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof LinkOwnProps> & {
    ref?: Ref<Element>;
  };

/**
 * forwardRef with a generic component is awkward in TypeScript — this
 * overload gives consumers strong prop inference when using `as`, while
 * the implementation is a plain forwardRef under the hood.
 */
type LinkComponent = <E extends ElementType = "a">(
  props: LinkProps<E>,
) => ReactElement | null;

const LinkImpl = forwardRef(function Link(
  {
    as,
    children,
    className,
    href,
    disabled = false,
    inline = false,
    visited = false,
    renderIcon: Icon,
    size = "md",
    target,
    rel: relProp,
    onClick,
    ...rest
  }: LinkOwnProps & {
    href?: string;
    target?: string;
    rel?: string;
    className?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
  } & Record<string, unknown>,
  ref: ForwardedRef<HTMLElement>,
) {
  const Component = (as ?? "a") as ElementType;

  const classes = [
    styles.link,
    styles[`size-${size}`],
    inline ? styles.inline : styles.standalone,
    visited ? styles.visited : "",
    disabled ? styles.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // When target="_blank" we default rel to "noopener noreferrer" for safety.
  const rel =
    relProp ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const commonProps = {
    ref,
    className: classes,
    target,
    rel,
    onClick: handleClick,
    ...rest,
  };

  // Per Scott O'Hara's guidance: a disabled link omits `href`, exposes
  // role="link", and sets aria-disabled so AT still announces it.
  const linkProps = disabled
    ? { ...commonProps, role: "link", "aria-disabled": true }
    : { ...commonProps, href };

  return (
    <Component {...linkProps}>
      {children}
      {!inline && Icon && (
        <span className={styles.iconSlot} aria-hidden="true">
          <Icon aria-hidden />
        </span>
      )}
    </Component>
  );
}) as unknown as LinkComponent & { displayName?: string };

LinkImpl.displayName = "Link";

export const Link = LinkImpl;

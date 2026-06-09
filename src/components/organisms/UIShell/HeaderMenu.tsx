import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useRef,
  useState,
  type FocusEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ChevronDown } from "@carbon/icons-react";
import styles from "./UIShell.module.css";

/**
 * HeaderMenu — dropdown inside `HeaderNavigation` that contains a set
 * of `HeaderMenuItem` children. Expands on click or Enter/Space, closes
 * on Escape or when focus moves outside the menu group.
 */
export interface HeaderMenuProps
  extends Omit<HTMLAttributes<HTMLLIElement>, "children"> {
  children?: ReactNode;
  /** Label rendered as the trigger text. */
  menuLinkName: string;
  /** Mark the trigger as currently active. */
  isActive?: boolean;
  /** Render custom content in place of the default chevron icon. */
  renderMenuContent?: () => ReactNode;
}

export const HeaderMenu = forwardRef<HTMLLIElement, HeaderMenuProps>(
  function HeaderMenu(
    {
      children,
      className,
      menuLinkName,
      isActive,
      renderMenuContent,
      onBlur,
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const [expanded, setExpanded] = useState(false);
    const subMenuRef = useRef<HTMLUListElement | null>(null);
    const triggerRef = useRef<HTMLAnchorElement | null>(null);

    const hasActiveDescendant = (childrenArg: ReactNode): boolean =>
      Children.toArray(childrenArg).some((child) => {
        if (!isValidElement<{ isActive?: boolean; children?: ReactNode }>(child)) {
          return false;
        }
        const { isActive: childActive, children: grand } = child.props;
        return !!childActive || hasActiveDescendant(grand);
      });

    const handleClick = (event: MouseEvent<HTMLLIElement>) => {
      const target = event.target as Node | null;
      // Clicks on the trigger toggle; clicks on sub-menu items pass through.
      if (!subMenuRef.current || (target && !subMenuRef.current.contains(target))) {
        event.preventDefault();
      }
      setExpanded((prev) => !prev);
      onClick?.(event);
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        setExpanded((prev) => !prev);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
      if (event.key === "Escape" && expanded) {
        event.preventDefault();
        event.stopPropagation();
        setExpanded(false);
        triggerRef.current?.focus();
      }
      onKeyDown?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLLIElement>) => {
      // Close when focus exits the entire submenu group.
      const nextFocus = event.relatedTarget as Node | null;
      const stillInside =
        nextFocus && event.currentTarget.contains(nextFocus as Node);
      if (!stillInside) setExpanded(false);
      onBlur?.(event);
    };

    const itemClassName = [styles.submenu, className].filter(Boolean).join(" ");
    const isActiveSelf = isActive || (hasActiveDescendant(children) && !expanded);
    const triggerClassName = [
      styles.menuLink,
      styles.submenuTrigger,
      isActiveSelf ? styles.menuLinkCurrent : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <li
        ref={ref}
        className={itemClassName}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        {...rest}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          ref={triggerRef}
          href="#"
          className={triggerClassName}
          aria-haspopup="menu"
          aria-expanded={expanded}
          onKeyDown={handleTriggerKeyDown}
          tabIndex={0}
        >
          {menuLinkName}
          {renderMenuContent ? (
            renderMenuContent()
          ) : (
            <ChevronDown
              className={styles.submenuArrow}
              aria-hidden
            />
          )}
        </a>
        <ul
          ref={subMenuRef}
          className={styles.submenuList}
          data-expanded={expanded || undefined}
        >
          {Children.map(children, (item) => {
            if (isValidElement(item)) {
              // Children inherit tabIndex -1 while the menu is collapsed
              // so they don't appear in the natural tab order.
              return cloneElement(
                item as React.ReactElement<{ tabIndex?: number }>,
                { tabIndex: expanded ? 0 : -1 },
              );
            }
            return item;
          })}
        </ul>
      </li>
    );
  },
);

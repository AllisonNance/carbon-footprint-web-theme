"use client";

import {
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type LiHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ChevronRight } from "@carbon/icons-react";
import { AccordionContext } from "./AccordionContext";
import styles from "./Accordion.module.css";

/**
 * Carbon AccordionItem — a single expandable row inside an Accordion.
 *
 * - Uncontrolled internal `open` state, seeded from the `open` prop
 *   (kept in sync so a parent can force-open/close imperatively, matching
 *   Carbon's behavior).
 * - Esc while open collapses the panel.
 * - Chevron rotates from 0 → 90deg on open; CSS handles the anim.
 * - Header is a real `<button>` with `aria-expanded` + `aria-controls`.
 * - Panel gets `role="region"` + `aria-labelledby` for AT announcement.
 */

export interface AccordionItemProps
  extends Omit<LiHTMLAttributes<HTMLLIElement>, "onClick" | "title"> {
  /** The heading content. Can be a string or any renderable node. */
  title?: ReactNode;
  /**
   * Initial/controlled open state. Changes to this prop after mount will
   * sync the internal state, matching Carbon's behavior.
   */
  open?: boolean;
  /**
   * Overrides the parent Accordion's disabled flag. Leave undefined to
   * inherit from the parent.
   */
  disabled?: boolean;
  /**
   * Accessible label for the toggle button. Useful when `title` is an
   * icon or complex node with no plain-text equivalent.
   */
  "aria-label"?: string;
  /** Fired when the heading is clicked. Receives next open state + event. */
  onHeadingClick?: (args: {
    isOpen: boolean;
    event: MouseEvent<HTMLButtonElement>;
  }) => void;
  children?: ReactNode;
}

export const AccordionItem = forwardRef<HTMLLIElement, AccordionItemProps>(
  function AccordionItem(
    {
      title = "title",
      open = false,
      disabled: disabledProp,
      "aria-label": ariaLabel,
      onHeadingClick,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const accordionState = useContext(AccordionContext);
    const disabled =
      typeof disabledProp === "boolean" ? disabledProp : accordionState.disabled;

    const [isOpen, setIsOpen] = useState(open);
    const prevOpenRef = useRef(open);

    useEffect(() => {
      if (open !== prevOpenRef.current) {
        setIsOpen(open);
        prevOpenRef.current = open;
      }
    }, [open]);

    const generatedId = useId();
    const buttonId = `accordion-heading-${generatedId}`;
    const panelId = `accordion-panel-${generatedId}`;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const next = !isOpen;
      setIsOpen(next);
      onHeadingClick?.({ isOpen: next, event });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (isOpen && event.key === "Escape") {
        event.stopPropagation();
        setIsOpen(false);
      }
    };

    const classes = [
      styles.item,
      isOpen && !disabled ? styles.itemActive : "",
      disabled ? styles.itemDisabled : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <li ref={ref} className={classes} {...rest}>
        <button
          id={buttonId}
          type="button"
          className={styles.heading}
          aria-controls={panelId}
          aria-expanded={isOpen}
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <ChevronRight
            className={styles.chevron}
            aria-hidden="true"
            size={16}
          />
          <span className={`${styles.title} type-body-compact-01`}>
            {title}
          </span>
        </button>

        <section
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={styles.content}
          hidden={!isOpen || undefined}
        >
          <div className={styles.contentInner}>{children}</div>
        </section>
      </li>
    );
  },
);

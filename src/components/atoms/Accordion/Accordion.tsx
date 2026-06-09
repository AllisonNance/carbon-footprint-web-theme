"use client";

import {
  forwardRef,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { AccordionContext } from "./AccordionContext";
import styles from "./Accordion.module.css";

/**
 * Carbon Accordion — a vertical stack of expandable rows.
 *
 * Parity notes vs Carbon React Accordion
 *   - `align`   : chevron position (`"end"` default, `"start"` flips it)
 *   - `isFlush` : removes horizontal padding (ignored when align="start")
 *   - `ordered` : renders as `<ol>` instead of `<ul>`
 *   - `size`    : sm | md | lg
 *   - `disabled`: cascades to every AccordionItem via context; individual
 *                 items can override by passing their own `disabled` prop
 *
 * Skipped
 *   - `Accordion.Skeleton` (not essential for the design system MVP)
 *   - `renderExpando` / `renderToggle` escape hatches — customizing the
 *     toggle glyph hasn't been requested and adds API surface
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-accordion--overview
 */

export type AccordionAlign = "start" | "end";
export type AccordionSize = "sm" | "md" | "lg";

export interface AccordionProps extends HTMLAttributes<HTMLUListElement> {
  /** Chevron + title alignment. Defaults to `end`. */
  align?: AccordionAlign;
  /**
   * When true, removes horizontal padding so the accordion can sit flush
   * against a container edge. Ignored when `align="start"` per Carbon.
   */
  isFlush?: boolean;
  /** Render as an `<ol>` list instead of the default `<ul>`. */
  ordered?: boolean;
  /** Row size. Defaults to `md`. */
  size?: AccordionSize;
  /** When true, every child AccordionItem is disabled. */
  disabled?: boolean;
  children?: ReactNode;
}

export const Accordion = forwardRef<HTMLUListElement, AccordionProps>(
  function Accordion(
    {
      align = "end",
      isFlush = false,
      ordered = false,
      size = "md",
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const classes = [
      styles.accordion,
      styles[`size-${size}`],
      styles[`align-${align}`],
      isFlush && align !== "start" ? styles.flush : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const contextValue = useMemo(() => ({ disabled }), [disabled]);

    const ListTag = (ordered ? "ol" : "ul") as "ul";

    return (
      <AccordionContext.Provider value={contextValue}>
        <ListTag
          ref={ref}
          className={classes}
          {...rest}
        >
          {children}
        </ListTag>
      </AccordionContext.Provider>
    );
  },
);

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ChevronDown } from "@carbon/icons-react";
import styles from "./Tile.module.css";

/**
 * ExpandableTile — two-section tile that reveals additional content via
 * a chevron toggle in the top-right. Use
 * `<TileAboveTheFoldContent>` and `<TileBelowTheFoldContent>` (or any
 * first and second children) to designate the always-visible vs. hidden
 * regions.
 *
 * Collapsed height equals the rendered height of the first child; a
 * `ResizeObserver` keeps it in sync as content changes.
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-tile--overview
 *
 * Skipped: `slug`, `decorator`, `AILabel`, `light`, `hasRoundedCorners`,
 * Carbon's auto-interactive-children detection (consumers can disable
 * the "whole tile is a button" mode via the dedicated chevron, which we
 * always render).
 */
export interface ExpandableTileProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  children?: ReactNode;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Uncontrolled default. Defaults to `false`. */
  defaultExpanded?: boolean;
  /** Fires whenever the tile toggles open or closed. */
  onChange?: (expanded: boolean) => void;
  /** Label shown next to the chevron when the tile is collapsed. */
  tileCollapsedLabel?: string;
  /** Label shown next to the chevron when the tile is expanded. */
  tileExpandedLabel?: string;
  /** SR text for the chevron when collapsed. */
  tileCollapsedIconText?: string;
  /** SR text for the chevron when expanded. */
  tileExpandedIconText?: string;
  /** Fixed max-height for the collapsed state. If unset, measures the
   *  rendered height of the first child. */
  tileMaxHeight?: number;
}

export interface TileFoldContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const TileAboveTheFoldContent = forwardRef<
  HTMLDivElement,
  TileFoldContentProps
>(function TileAboveTheFoldContent({ children, className, ...rest }, ref) {
  const classes = [styles.aboveFold, className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

export const TileBelowTheFoldContent = forwardRef<
  HTMLDivElement,
  TileFoldContentProps
>(function TileBelowTheFoldContent({ children, className, ...rest }, ref) {
  const classes = [styles.belowFold, className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

export const ExpandableTile = forwardRef<HTMLDivElement, ExpandableTileProps>(
  function ExpandableTile(
    {
      children,
      className,
      expanded,
      defaultExpanded = false,
      onChange,
      tileCollapsedLabel,
      tileExpandedLabel,
      tileCollapsedIconText = "Interact to expand Tile",
      tileExpandedIconText = "Interact to collapse Tile",
      tileMaxHeight,
      id,
      ...rest
    },
    ref,
  ) {
    const isControlled = expanded !== undefined;
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const isExpanded = isControlled ? !!expanded : internalExpanded;

    const reactId = useId();
    const belowId = `${id ?? "expandable-tile"}-${reactId}`;

    const bodyRef = useRef<HTMLDivElement | null>(null);
    const aboveRef = useRef<HTMLDivElement | null>(null);
    const [collapsedHeight, setCollapsedHeight] = useState<number | null>(
      tileMaxHeight ?? null,
    );

    // Track the above-the-fold height so the collapsed tile fits it
    // exactly. ResizeObserver covers both initial measurement and
    // later content changes.
    useLayoutEffect(() => {
      if (tileMaxHeight !== undefined || !aboveRef.current) return;
      const measure = () => {
        if (aboveRef.current) {
          setCollapsedHeight(aboveRef.current.scrollHeight);
        }
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(aboveRef.current);
      return () => ro.disconnect();
    }, [tileMaxHeight, children]);

    useEffect(() => {
      if (isControlled) setInternalExpanded(!!expanded);
    }, [isControlled, expanded]);

    const toggle = useCallback(
      (event: MouseEvent | KeyboardEvent) => {
        event.stopPropagation();
        const next = !isExpanded;
        if (!isControlled) setInternalExpanded(next);
        onChange?.(next);
      },
      [isControlled, isExpanded, onChange],
    );

    // Pick the first TileAboveTheFoldContent / TileBelowTheFoldContent
    // pair automatically — but if a consumer just passes raw children
    // without fold wrappers, treat the first child as above-the-fold
    // and the rest as below-the-fold.
    const childArray = Array.isArray(children)
      ? children.flat()
      : [children];
    const [first, ...restChildren] = childArray;

    const classes = [
      styles.tile,
      styles.expandable,
      isExpanded ? styles.expanded : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const maxHeightStyle =
      !isExpanded && collapsedHeight != null
        ? { maxHeight: collapsedHeight }
        : undefined;

    return (
      <div
        ref={ref}
        id={id}
        className={classes}
        style={maxHeightStyle}
        {...rest}
      >
        <div ref={bodyRef} className={styles.expandableBody}>
          <div ref={aboveRef} className={styles.expandableAbove}>
            {first}
          </div>

          <button
            type="button"
            className={styles.chevronButton}
            aria-expanded={isExpanded}
            aria-controls={belowId}
            title={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
            onClick={toggle}
          >
            {(isExpanded ? tileExpandedLabel : tileCollapsedLabel) && (
              <span className={styles.chevronLabel}>
                {isExpanded ? tileExpandedLabel : tileCollapsedLabel}
              </span>
            )}
            <ChevronDown className={styles.chevronIcon} aria-hidden />
            <span className={styles.visuallyHidden}>
              {isExpanded ? tileExpandedIconText : tileCollapsedIconText}
            </span>
          </button>

          <div
            id={belowId}
            role="region"
            className={styles.expandableBelow}
            aria-hidden={!isExpanded}
          >
            {restChildren}
          </div>
        </div>
      </div>
    );
  },
);

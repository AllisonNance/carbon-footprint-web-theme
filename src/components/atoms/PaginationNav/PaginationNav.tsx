import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import { CaretLeft, CaretRight } from "@carbon/icons-react";
import { IconButton } from "../IconButton";
import type { IconButtonAlign } from "../IconButton";
import styles from "./PaginationNav.module.css";

/**
 * Carbon PaginationNav — windowed page navigator with first/last always
 * visible and collapsible "…" overflows in the middle.
 *
 * Parity notes vs Carbon React PaginationNav
 *   - `page` / `onChange` use zero-based indices (matches Carbon)
 *   - Supports controlled (`page`) and uncontrolled (`defaultPage`) usage
 *   - `itemsShown` is clamped to ≥ 4
 *   - `loop` wraps prev/next at the edges
 *   - `disableOverflow` renders a static "…" (no jump-to-page dropdown)
 *   - Labels are plain string props (`labels.prev`, etc.) instead of
 *     Carbon's `translateWithId` i18n hook
 *
 * Skipped (intentional)
 *   - `useMatchMedia` responsive auto-sizing at the `sm` breakpoint —
 *     out-of-scope without the `@carbon/layout` breakpoints package
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-pagination-nav--overview
 */

export type PaginationNavSize = "sm" | "md" | "lg";

export interface PaginationNavLabels {
  prev?: string;
  next?: string;
  item?: string;
  active?: string;
  of?: string;
  selectPage?: string;
}

export interface PaginationNavProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /** Total number of pages. Required. */
  totalItems: number;
  /** Controlled current page index (0-based). */
  page?: number;
  /** Uncontrolled initial page index (0-based). Defaults to 0. */
  defaultPage?: number;
  /** Fires on any page change. */
  onChange?: (page: number) => void;
  /** Max page buttons shown at once. Min 4. Defaults to 10. */
  itemsShown?: number;
  /** Max page buttons shown on mobile (< 42rem). Min 4. Defaults to 5
   *  (first 3 + ellipsis + last). */
  mobileItemsShown?: number;
  /** Wrap prev/next at the edges. */
  loop?: boolean;
  /** Row size. Defaults to `lg`. */
  size?: PaginationNavSize;
  /** Skip the overflow jump-to-page dropdown, just render a static "…". */
  disableOverflow?: boolean;
  /** Tooltip alignment for the icon-only prev/next buttons. */
  tooltipAlign?: IconButtonAlign;
  /** Override label strings (for i18n). */
  labels?: PaginationNavLabels;
}

const DEFAULT_LABELS: Required<PaginationNavLabels> = {
  prev: "Previous",
  next: "Next",
  item: "Page",
  active: "Active",
  of: "of",
  selectPage: "Select page",
};

/** Carbon's cut algorithm — determines how many items are hidden at each
 * end of the window, respecting the split point around the active page. */
function calculateCuts(
  page: number,
  totalItems: number,
  itemsDisplayedOnPage: number,
  splitPoint: number | null = null,
) {
  if (itemsDisplayedOnPage >= totalItems) {
    return { front: 0, back: 0 };
  }

  const split = splitPoint ?? Math.ceil(itemsDisplayedOnPage / 2) - 1;

  let frontHidden = page + 1 - split;
  let backHidden = totalItems - page - (itemsDisplayedOnPage - split) + 1;

  if (frontHidden <= 1) {
    backHidden -= frontHidden <= 0 ? Math.abs(frontHidden) + 1 : 0;
    frontHidden = 0;
  }

  if (backHidden <= 1) {
    frontHidden -= backHidden <= 0 ? Math.abs(backHidden) + 1 : 0;
    backHidden = 0;
  }

  return { front: frontHidden, back: backHidden };
}

/* ------------------------------------------------------------------ */
/* Direction button (prev / next)                                       */
/* ------------------------------------------------------------------ */

interface DirectionButtonProps {
  direction: "forward" | "backward";
  label: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  tooltipAlign?: IconButtonAlign;
  size: PaginationNavSize;
}

function DirectionButton({
  direction,
  label,
  disabled,
  onClick,
  tooltipAlign = "bottom",
  size,
}: DirectionButtonProps) {
  return (
    <li className={styles.cell}>
      <IconButton
        label={label}
        kind="ghost"
        size={size}
        align={tooltipAlign}
        disabled={disabled}
        onClick={onClick}
      >
        {direction === "forward" ? <CaretRight /> : <CaretLeft />}
      </IconButton>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Page item                                                            */
/* ------------------------------------------------------------------ */

interface PaginationItemProps {
  page: number;
  isActive?: boolean;
  onClick?: () => void;
  labels: Required<PaginationNavLabels>;
}

function PaginationItem({
  page,
  isActive,
  onClick,
  labels,
}: PaginationItemProps) {
  const a11yPrefix = isActive ? `${labels.active}, ${labels.item}` : labels.item;
  return (
    <li className={styles.cell}>
      <button
        type="button"
        className={[styles.pageButton, isActive ? styles.pageActive : ""]
          .filter(Boolean)
          .join(" ")}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        aria-label={`${a11yPrefix} ${page}`}
      >
        {page}
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Overflow (…  or jump-to-page select)                                 */
/* ------------------------------------------------------------------ */

interface PaginationOverflowProps {
  fromIndex: number;
  count: number;
  onSelect: (index: number) => void;
  disableOverflow?: boolean;
  labels: Required<PaginationNavLabels>;
}

function PaginationOverflow({
  fromIndex,
  count,
  onSelect,
  disableOverflow,
  labels,
}: PaginationOverflowProps) {
  if (count < 1) return null;

  // Shortcut: when only one page is hidden, render it as a regular item.
  if (count === 1) {
    return (
      <PaginationItem
        page={fromIndex + 1}
        onClick={() => onSelect(fromIndex)}
        labels={labels}
      />
    );
  }

  if (disableOverflow) {
    return (
      <li className={`${styles.cell} ${styles.overflow}`} aria-hidden="true">
        <span className={styles.overflowDots}>…</span>
      </li>
    );
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    if (!Number.isNaN(value)) onSelect(value);
    event.target.value = "";
  };

  return (
    <li className={`${styles.cell} ${styles.overflow}`}>
      <span className={styles.overflowDots} aria-hidden="true">…</span>
      <select
        className={styles.overflowSelect}
        onChange={handleChange}
        aria-label={labels.selectPage}
        defaultValue=""
      >
        <option value="" hidden>
          {labels.selectPage}
        </option>
        {Array.from({ length: count }, (_, i) => (
          <option key={i} value={fromIndex + i}>
            {fromIndex + i + 1}
          </option>
        ))}
      </select>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* PaginationNav                                                        */
/* ------------------------------------------------------------------ */

export const PaginationNav = forwardRef<HTMLElement, PaginationNavProps>(
  function PaginationNav(
    {
      totalItems,
      page: pageProp,
      defaultPage = 0,
      onChange,
      itemsShown = 10,
      mobileItemsShown = 5,
      loop = false,
      size = "lg",
      disableOverflow = false,
      tooltipAlign = "bottom",
      labels: labelOverrides,
      className,
      ...rest
    },
    ref,
  ) {
    const labels: Required<PaginationNavLabels> = {
      ...DEFAULT_LABELS,
      ...labelOverrides,
    };

    const isControlled = pageProp !== undefined;
    const [internalPage, setInternalPage] = useState(defaultPage);
    const currentPage = isControlled ? pageProp : internalPage;

    /* Responsive itemsShown — use mobileItemsShown below 42rem. */
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const mql = window.matchMedia("(max-width: 41.999rem)");
      setIsMobile(mql.matches);
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }, []);

    const effectiveItemsShown = isMobile ? mobileItemsShown : itemsShown;
    const itemsDisplayedOnPage = Math.max(effectiveItemsShown, 4);

    const prevPageRef = useRef(currentPage);
    const [cuts, setCuts] = useState(() =>
      calculateCuts(currentPage, totalItems, itemsDisplayedOnPage),
    );

    const pageWouldBeHidden = (p: number) => {
      const startOffset = itemsDisplayedOnPage <= 4 && p > 1 ? 0 : 1;
      const hiddenInFront =
        (p >= startOffset && p <= cuts.front) || p === 0;
      const hiddenInBack =
        p >= totalItems - cuts.back - 1 && p <= totalItems - 2;
      return hiddenInFront || hiddenInBack;
    };

    // Recompute cuts when totalItems or itemsShown change.
    useEffect(() => {
      setCuts(calculateCuts(currentPage, totalItems, itemsDisplayedOnPage));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalItems, itemsDisplayedOnPage]);

    // Slide the window when navigating outside it.
    useEffect(() => {
      if (pageWouldBeHidden(currentPage)) {
        const delta = currentPage - (prevPageRef.current ?? 0);
        if (delta > 0) {
          const splitPoint = itemsDisplayedOnPage - 3;
          setCuts(
            calculateCuts(
              currentPage,
              totalItems,
              itemsDisplayedOnPage,
              splitPoint,
            ),
          );
        } else {
          const splitPoint = itemsDisplayedOnPage > 4 ? 2 : 1;
          setCuts(
            calculateCuts(
              currentPage,
              totalItems,
              itemsDisplayedOnPage,
              splitPoint,
            ),
          );
        }
      }
      prevPageRef.current = currentPage;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const jumpToItem = (index: number) => {
      if (index < 0 || index >= totalItems) return;
      if (!isControlled) setInternalPage(index);
      onChange?.(index);
    };

    const jumpToNext = () => {
      const next = currentPage + 1;
      if (next >= totalItems) {
        if (loop) jumpToItem(0);
      } else {
        jumpToItem(next);
      }
    };

    const jumpToPrevious = () => {
      const prev = currentPage - 1;
      if (prev < 0) {
        if (loop) jumpToItem(totalItems - 1);
      } else {
        jumpToItem(prev);
      }
    };

    const backwardDisabled = !loop && currentPage === 0;
    const forwardDisabled = !loop && currentPage === totalItems - 1;
    const startOffset = itemsDisplayedOnPage <= 4 && currentPage > 1 ? 0 : 1;
    const showFirstItem =
      itemsDisplayedOnPage >= 5 ||
      (itemsDisplayedOnPage <= 4 && currentPage <= 1);

    const middlePages = useMemo(() => {
      const all = Array.from({ length: totalItems }, (_, i) => i);
      const end = (1 + cuts.back) * -1;
      return all.slice(startOffset + cuts.front, end);
    }, [totalItems, cuts.front, cuts.back, startOffset]);

    const classes = [styles.nav, styles[`size-${size}`], className ?? ""]
      .filter(Boolean)
      .join(" ");

    return (
      <nav
        ref={ref}
        className={classes}
        aria-label={rest["aria-label"] ?? "Pagination"}
        {...rest}
      >
        <ul className={styles.list}>
          <DirectionButton
            direction="backward"
            label={labels.prev}
            disabled={backwardDisabled}
            onClick={jumpToPrevious}
            tooltipAlign={tooltipAlign}
            size={size}
          />

          {showFirstItem && (
            <PaginationItem
              page={1}
              isActive={currentPage === 0}
              onClick={() => jumpToItem(0)}
              labels={labels}
            />
          )}

          <PaginationOverflow
            fromIndex={1}
            count={cuts.front}
            onSelect={jumpToItem}
            disableOverflow={disableOverflow}
            labels={labels}
          />

          {middlePages.map((index) => (
            <PaginationItem
              key={index}
              page={index + 1}
              isActive={currentPage === index}
              onClick={() => jumpToItem(index)}
              labels={labels}
            />
          ))}

          <PaginationOverflow
            fromIndex={totalItems - cuts.back - 1}
            count={cuts.back}
            onSelect={jumpToItem}
            disableOverflow={disableOverflow}
            labels={labels}
          />

          {totalItems > 1 && (
            <PaginationItem
              page={totalItems}
              isActive={currentPage === totalItems - 1}
              onClick={() => jumpToItem(totalItems - 1)}
              labels={labels}
            />
          )}

          <DirectionButton
            direction="forward"
            label={labels.next}
            disabled={forwardDisabled}
            onClick={jumpToNext}
            tooltipAlign={tooltipAlign}
            size={size}
          />
        </ul>

        <span className={styles.visuallyHidden} aria-live="polite">
          {`${labels.item} ${currentPage + 1} ${labels.of} ${totalItems}`}
        </span>
      </nav>
    );
  },
);

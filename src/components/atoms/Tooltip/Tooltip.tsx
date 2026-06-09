import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./Tooltip.module.css";

/**
 * Carbon Tooltip — shows a short label anchored to a trigger element.
 *
 * Usage
 *   <Tooltip label="Save" align="top">
 *     <button onClick={save}>
 *       <FloppyDisk />
 *     </button>
 *   </Tooltip>
 *
 * Notes
 *   - The trigger is cloned to receive `aria-describedby` pointing at the
 *     tooltip's generated id, so assistive tech announces the description.
 *   - Use `enterDelayMs` / `leaveDelayMs` to tune hover dwell (matches
 *     Carbon's defaults of 100ms).
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-tooltip--overview
 */

export type TooltipAlign =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "right";

export interface TooltipProps {
  /** Tooltip content — plain string or rich node. */
  label: ReactNode;
  /** Placement relative to the trigger. Defaults to `top`. */
  align?: TooltipAlign;
  /** Delay before revealing (ms). Defaults to `100`. */
  enterDelayMs?: number;
  /** Delay before hiding (ms). Defaults to `100`. */
  leaveDelayMs?: number;
  /** When true, the tooltip never appears (a11y name on trigger still works). */
  disabled?: boolean;
  /** Uncontrolled initial open state. Defaults to `false`. */
  defaultOpen?: boolean;
  /** Class on the wrapper span. */
  className?: string;
  /**
   * The element the tooltip describes. Must be a single React element
   * (not a fragment or array). It will receive `aria-describedby`.
   */
  children: ReactElement;
}

export function Tooltip({
  label,
  align = "top",
  enterDelayMs = 100,
  leaveDelayMs = 100,
  disabled = false,
  defaultOpen = false,
  className,
  children,
}: TooltipProps) {
  const tooltipId = useId();
  const [open, setOpen] = useState(defaultOpen);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const scheduleOpen = () => {
    if (disabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(true), enterDelayMs);
  };

  const scheduleClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), leaveDelayMs);
  };

  // Close immediately on Escape (Carbon behavior).
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(false);
    }
  };

  const trigger =
    isValidElement(children) && !disabled
      ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
          "aria-describedby": open ? tooltipId : undefined,
        })
      : children;

  const wrapperClasses = [styles.wrapper, className ?? ""].filter(Boolean).join(" ");

  return (
    <span
      className={wrapperClasses}
      data-align={align}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocus={scheduleOpen}
      onBlur={scheduleClose}
      onKeyDown={handleKeyDown}
    >
      {trigger}
      {!disabled && (
        <span
          id={tooltipId}
          role="tooltip"
          className={styles.tooltip}
          data-open={open || undefined}
        >
          {label}
        </span>
      )}
    </span>
  );
}

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Checkbox, CheckboxCheckedFilled } from "@carbon/icons-react";
import styles from "./Tile.module.css";

/**
 * SelectableTile — toggleable tile that functions like a checkbox.
 * Exposes an explicit check indicator in the top-right corner, supports
 * keyboard activation (Space / Enter), and can be controlled or
 * uncontrolled via `selected` / `defaultSelected`.
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-tile--overview
 *
 * Skipped: `slug`, `decorator`, `AILabel`, `light`, `hasRoundedCorners`,
 * `name`, `value` (all deprecated in Carbon React).
 */
export interface SelectableTileProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onChange" | "title"> {
  children?: ReactNode;
  /** Disable and dim the tile. */
  disabled?: boolean;
  /** Controlled selection state. */
  selected?: boolean;
  /** Uncontrolled initial selection state. Defaults to `false`. */
  defaultSelected?: boolean;
  /** Accessible title for the tile (maps to the `title` attribute). */
  title?: string;
  /** Fired after toggling (including via keyboard). */
  onChange?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    selected: boolean,
    id?: string,
  ) => void;
}

export const SelectableTile = forwardRef<
  HTMLButtonElement,
  SelectableTileProps
>(function SelectableTile(
  {
    children,
    className,
    disabled = false,
    id,
    selected,
    defaultSelected = false,
    title = "title",
    onChange,
    onClick,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const isControlled = selected !== undefined;
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isSelected = isControlled ? !!selected : internalSelected;

  useEffect(() => {
    if (isControlled) setInternalSelected(!!selected);
  }, [isControlled, selected]);

  const toggle = useCallback(
    (
      event:
        | MouseEvent<HTMLButtonElement>
        | KeyboardEvent<HTMLButtonElement>,
    ) => {
      const next = !isSelected;
      if (!isControlled) setInternalSelected(next);
      onChange?.(event, next, id);
    },
    [id, isControlled, isSelected, onChange],
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    toggle(event);
    onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      onKeyDown?.(event);
      return;
    }
    // The native <button> already activates on Enter and Space — we
    // mirror Carbon's onChange semantics here so consumers get the
    // keyboard event explicitly.
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(event);
    }
    onKeyDown?.(event);
  };

  const classes = [
    styles.tile,
    styles.selectable,
    isSelected ? styles.selected : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      title={title}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className={styles.selectableIcon} aria-hidden>
        {isSelected ? <CheckboxCheckedFilled /> : <Checkbox />}
      </span>
      <span className={styles.selectableBody}>{children}</span>
    </button>
  );
});

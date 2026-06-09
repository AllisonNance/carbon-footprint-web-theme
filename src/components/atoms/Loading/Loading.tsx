import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Loading.module.css";

/**
 * Carbon Loading — a circular animated progress indicator.
 *
 * Parity notes vs Carbon React Loading
 *   - `active`      : toggles the animation (ring freezes when false)
 *   - `small`       : 44px variant instead of the default 88px
 *   - `withOverlay` : fullscreen dimmed overlay; defaults to `true`
 *                     (matching Carbon)
 *   - `description` : becomes `aria-label` + `<title>` for SR announcement
 *
 * Skipped
 *   - Deprecated `id` prop (no longer needed in Carbon v11).
 *
 * For a compact inline-with-text spinner, use a future `InlineLoading`
 * component instead.
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-loading--overview
 */

export interface LoadingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "role" | "aria-label"> {
  /** Whether the spinner is actively animating. Defaults to `true`. */
  active?: boolean;
  /** Use the small 44×44 variant. */
  small?: boolean;
  /** Wrap in a fullscreen dim overlay. Defaults to `true`. */
  withOverlay?: boolean;
  /**
   * Accessible description. Exposed as both `aria-label` on the status
   * wrapper and a `<title>` inside the SVG. Defaults to `"Loading"`.
   */
  description?: string;
}

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  function Loading(
    {
      active = true,
      small = false,
      withOverlay = true,
      description = "Loading",
      className,
      ...rest
    },
    ref,
  ) {
    const spinnerClasses = [
      styles.loading,
      small ? styles.small : "",
      !active ? styles.stopped : "",
      withOverlay ? "" : className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const spinner = (
      <div
        ref={withOverlay ? undefined : ref}
        className={spinnerClasses}
        role="status"
        aria-live="polite"
        aria-label={description}
        {...(withOverlay ? {} : rest)}
      >
        <svg
          className={styles.svg}
          viewBox="-75 -75 150 150"
          aria-hidden="true"
        >
          <title>{description}</title>
          <circle className={styles.track} cx="0" cy="0" r="37.5" />
          <circle className={styles.stroke} cx="0" cy="0" r="37.5" />
        </svg>
      </div>
    );

    if (!withOverlay) return spinner;

    const overlayClasses = [
      styles.overlay,
      !active ? styles.stopped : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={overlayClasses} {...rest}>
        {spinner}
      </div>
    );
  },
);

import { useCallback, useEffect, useState, type ComponentType } from "react";

/**
 * Props passed into the `render` component — wire these into the
 * HeaderMenuButton and SideNav so their expanded state stays in sync.
 */
export interface HeaderContainerRenderProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: () => void;
}

export type HeaderContainerProps<P extends HeaderContainerRenderProps> = {
  /** Initial expanded state for the side-nav. */
  isSideNavExpanded?: boolean;
  /** Render-prop component invoked with `isSideNavExpanded` and
   *  `onClickSideNavExpand`. Any extra props are forwarded through. */
  render: ComponentType<P>;
} & { [K in keyof Omit<P, keyof HeaderContainerRenderProps>]: P[K] };

/**
 * HeaderContainer owns the `isSideNavExpanded` state that links the
 * HeaderMenuButton hamburger with the SideNav. Closes on Escape.
 */
export function HeaderContainer<P extends HeaderContainerRenderProps>({
  render: Children,
  isSideNavExpanded = false,
  ...rest
}: HeaderContainerProps<P>) {
  const [expanded, setExpanded] = useState(isSideNavExpanded);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <Children
      {...(rest as unknown as P)}
      isSideNavExpanded={expanded}
      onClickSideNavExpand={toggle}
    />
  );
}

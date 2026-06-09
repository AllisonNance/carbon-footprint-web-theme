"use client";

import { createContext } from "react";

/**
 * Internal context used by Accordion to cascade parent-level props
 * (currently just `disabled`) down to each AccordionItem. Items can
 * override locally by passing their own `disabled` prop.
 */
export interface AccordionContextValue {
  disabled: boolean;
}

export const AccordionContext = createContext<AccordionContextValue>({
  disabled: false,
});

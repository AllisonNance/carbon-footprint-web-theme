import { TrashIcon } from "@sanity/icons";
import { Button, Flex } from "@sanity/ui";
import type { ObjectItemProps } from "sanity";

/**
 * Array item wrapper that adds an always-visible "Remove" button next
 * to Sanity's default item preview. Use via a field's
 * `components.item` (e.g. `featuredWork` on Site Settings) for arrays
 * where the built-in hover-to-reveal remove action is hard to find.
 */
export function RemovableArrayItem(props: ObjectItemProps) {
  return (
    <Flex align="center" gap={1}>
      <div style={{ flex: 1, minWidth: 0 }}>{props.renderDefault(props)}</div>
      <Button
        icon={TrashIcon}
        mode="bleed"
        tone="critical"
        text="Remove"
        onClick={props.onRemove}
      />
    </Flex>
  );
}

import { sleep } from "../../../../../utils/main";
import {
  DynamicObject,
  NullOr,
  SetState,
  UndefinedOr,
} from "../../../../utils/types";
import { BoundRect, OverlayPosition } from "./types";

export async function onEntered({
  el,
  contentBound,
  delay,
  setContentBound,
  setPseudoDuration,
  setPsuedoOpen,
  getOpen,
}: {
  el: HTMLElement | null;
  contentBound: BoundRect | null;
  delay: UndefinedOr<number>;
  setContentBound: SetState<NullOr<BoundRect>>;
  setPseudoDuration: SetState<UndefinedOr<number>>;
  setPsuedoOpen: SetState<boolean>;
  getOpen: boolean;
}) {
  if (!contentBound && el instanceof HTMLElement) {
    const { top, right, bottom, left, width, height } =
      el.getBoundingClientRect();

    await sleep(typeof delay == "number" ? delay : 200);

    if (getOpen) {
      setContentBound({
        top,
        right,
        bottom,
        left,
        width,
        height,
      });

      setPsuedoOpen(false);

      setPseudoDuration(undefined);
    }
  }
}

export function styeArrow(
  render: boolean,
  arrowPosition: OverlayPosition,
  adjust: number | null,
  size: number | undefined
) {
  const output = {
    class: [] as string[],
    style: {} as DynamicObject<string | undefined>,
  };

  if (!arrowPosition || adjust === null || !size) return output;

  if (render) {
    output.class = ["has-arrow", `arrow-${arrowPosition}`];
    output.style = {
      "--reposition-arrow": adjust ? `${adjust}px` : undefined,
      "--size": `${size}px`,
    };
  }

  return output;
}

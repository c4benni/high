import { SetState, UndefinedOr } from "../../../../../utils/types";
import { OverlayAlign, OverlayPosition } from "../types";

export default function repositionY({
  position,
  y,
  activatorHeight,
  activatorTop,
  contentHeight,
  offset,
  arrowSize,
  align,
  onArrowPosition,
  onArrowAdjust,
  setTransformOrigin,
}: {
  position: UndefinedOr<OverlayPosition>;
  y: number;
  activatorHeight: number;
  activatorTop: number;
  contentHeight: number;
  offset: number;
  arrowSize: number | undefined;
  align: OverlayAlign;
  onArrowPosition: UndefinedOr<(position: OverlayPosition) => void>;
  onArrowAdjust: UndefinedOr<(offset: number | null) => void>;
  setTransformOrigin: SetState<OverlayPosition | undefined>;
}): number {
  const clientHeight = document.documentElement.clientHeight;

  const activatorBottom = activatorTop + activatorHeight;

  let arrowAdjusted = false;

  const emitArrow = (arrow: OverlayPosition): void => {
    if (typeof onArrowPosition === "function") {
      onArrowPosition(arrow);
      setTransformOrigin(arrow);
    }
  };

  const emitArrowAdjust = (offset: number | null): void => {
    if (
      typeof onArrowAdjust === "function" &&
      /left|right/.test(position || "")
    ) {
      onArrowAdjust(offset);
      arrowAdjusted = true;
    }
  };

  let output = y;

  type Flipped = "" | "flipped" | "adjust";

  // concerned with content's bottom
  const flipBottom = (bottom: number): Flipped => {
    // on leave bottom
    // flip it over;
    if (bottom + offset > clientHeight) {
      // newOutput is what css 'top' will be;
      const newOutput = output - (activatorHeight + offset * 2 + contentHeight);

      const newBottom = newOutput + contentHeight;

      const maxBottom = clientHeight - offset;

      // if after flipping &
      // overlay is still leaving bottom,
      //   set the css top to be maxBottom - contentHeight
      //   has adjusted so no arrow;
      if (newBottom > maxBottom) {
        output = maxBottom - contentHeight;

        return "adjust";
      } else if (newOutput < 0) {
        //   flip it back if it has more space on the bottom
        if (clientHeight - newBottom > Math.abs(newOutput)) {
          output = Math.min(
            newBottom + offset + activatorHeight,
            clientHeight - offset - contentHeight
          );

          return "adjust";
        }
      } else {
        output = newOutput;
        return "flipped";
      }
    }

    return "";
  };

  // concerned with content's top
  const flipTop = (top: number): Flipped => {
    // on leave top
    // flip it below;
    if (top - offset < 0) {
      const newOutput = top + offset * 2 + activatorHeight + contentHeight;
      const newBottom = newOutput + contentHeight + offset;

      // if after flipping &
      // overlay is still leaving top,
      //   set the css top to be offset
      //   has adjusted so no arrow;
      if (newOutput < offset) {
        output = offset;

        return "adjust";
      } else if (newBottom > clientHeight) {
        //   has more space below
        if (
          clientHeight - (activatorTop + activatorHeight) >
          Math.max(activatorTop)
        ) {
          output = Math.min(
            newOutput + contentHeight,
            clientHeight - offset - contentHeight
          );
        } else {
          output = Math.min(newOutput, offset);
        }
        return "adjust";
      } else {
        output = newOutput;
        return "flipped";
      }
    }

    return "";
  };

  if (position === "bottom") {
    const flip = flipBottom(contentHeight + output);

    if (flip === "flipped") {
      // emit arrow
      emitArrow("none");
    } else if (flip === "") {
      // emit arrow
      emitArrow("top");
    } else {
      emitArrow("none");
    }
  } else if (position === "top") {
    const flip = flipTop(output);

    if (flip === "flipped") {
      // emit arrow
      emitArrow("none");
    } else if (flip === "") {
      // emit arrow
      emitArrow("bottom");
    } else {
      emitArrow("none");
    }
  } else if (align) {
    let centeredArrow = arrowSize
      ? contentHeight / 2 - activatorHeight / 2 - arrowSize / 2
      : 0;

    if (centeredArrow) {
      //   arrow leaving top
      if (Math.abs(centeredArrow) > contentHeight / 2) {
        centeredArrow = 0;
      }
    }

    if (align === "start") {
      output = Math.min(
        Math.max(activatorTop, offset),
        clientHeight - contentHeight - offset
      );
      arrowSize && emitArrowAdjust(-centeredArrow);
    } else {
      output = Math.min(Math.max(activatorBottom - contentHeight, clientHeight-contentHeight-offset), offset);

      arrowSize && emitArrowAdjust(centeredArrow);
    }
  } else {
    //   adjust arrow;

    const bottom = () => contentHeight + output + offset;
    const top = () => output - offset;

    const canAdjust = () =>
      arrowSize &&
      bottom() - offset + arrowSize >= activatorHeight + activatorTop &&
      top() - arrowSize <= activatorTop;

    //   bottom exceeding
    if (bottom() > clientHeight) {
      const difference = bottom() - clientHeight;

      output -= difference;

      arrowAdjusted = true;

      if (canAdjust()) {
        emitArrowAdjust(difference);
      } else {
        emitArrowAdjust(null);
      }
    } else if (top() < 0) {
      const difference = Math.abs(output - offset);

      output += difference;

      arrowAdjusted = true;

      if (canAdjust()) {
        emitArrowAdjust(-difference);
      } else {
        emitArrowAdjust(null);
      }
    }
  }

  if (!arrowAdjusted) {
    emitArrowAdjust(0);
  }

  return output;
}

import { SetState, UndefinedOr } from "../../../../../utils/types";
import { OverlayAlign, OverlayPosition } from "../types";

export default function repositionY({
  position,
  x,
  activatorWidth,
  activatorLeft,
  contentWidth,
  offset,
  align,
  arrowSize,
  onArrowPosition,
  onArrowAdjust,
  setTransformOrigin,
}: {
  position: UndefinedOr<OverlayPosition>;
  x: number;
  activatorWidth: number;
  activatorLeft: number;
  contentWidth: number;
  offset: number;
  align: OverlayAlign;
  arrowSize: number | undefined;
  onArrowPosition: UndefinedOr<(position: OverlayPosition) => void>;
  onArrowAdjust: UndefinedOr<(offset: number | null) => void>;
  setTransformOrigin: SetState<OverlayPosition | undefined>;
}): number {
  const clientWidth = document.documentElement.clientWidth;

  const activatorRight = activatorLeft + activatorWidth;

  const emitArrowPosition = (arrow: OverlayPosition): void => {
    if (typeof onArrowPosition === "function") {
      onArrowPosition(arrow);
      setTransformOrigin(arrow);
    }
  };

  let arrowAdjusted = false;

  const emitArrowAdjust = (offset: number | null): void => {
    if (
      typeof onArrowAdjust === "function" &&
      /top|bottom/.test(position || "")
    ) {
      onArrowAdjust(offset);

      arrowAdjusted = true;
    }
  };

  let output = x;

  type Flipped = "" | "flipped" | "adjust";

  // concerned with content's right
  const flipRight = (right: number): Flipped => {
    // on leave right
    // flip it over;
    if (right + offset > clientWidth) {
      // newOutput is what css 'left' will be;
      const newOutput = output - (activatorWidth + offset * 2 + contentWidth);

      const newRight = newOutput + contentWidth;

      const maxRight = clientWidth - offset;

      // if after flipping &
      // overlay is still leaving right,
      //   set the css left to be maxRight - contentWidth
      //   has adjusted so no arrow;
      if (newRight > maxRight) {
        output = maxRight - contentWidth;

        return "adjust";
      } else if (newOutput < 0) {
        // check if it has more space on the left;

        output = Math.max(newOutput, offset);
      } else if (newOutput > clientWidth) {
        output = Math.max(newOutput, clientWidth - offset);
      } else {
        output = newOutput;
        return "flipped";
      }
    }

    return "";
  };

  // concerned with content's left
  const flipLeft = (left: number): Flipped => {
    // on leave left
    // flip it below;
    if (left - offset < 0) {
      const newOutput = left + offset * 2 + activatorWidth + contentWidth;

      // if after flipping &
      // overlay is still leaving left,
      //   set the css left to be offset
      //   has adjusted so no arrow;
      if (newOutput < offset) {
        output = offset;

        return "adjust";
      } else {
        output = newOutput;
        return "flipped";
      }
    }

    return "";
  };

  if (position === "right") {
    const flip = flipRight(contentWidth + output);

    if (flip === "flipped") {
      // emit arrow
      emitArrowPosition("none");
    } else if (flip === "") {
      // emit arrow
      emitArrowPosition("left");
    }
  } else if (position === "left") {
    const flip = flipLeft(output);

    if (flip === "flipped") {
      // emit arrow
      emitArrowPosition("none");
    } else if (flip === "") {
      // emit arrow
      emitArrowPosition("right");
    }

    output = Math.min(
      output + contentWidth + offset,
      clientWidth - contentWidth - offset
    );
  } else if (align) {

    if (align === "start") {
        output = Math.max(
            Math.min(activatorLeft,
                clientWidth - contentWidth - offset),
            offset
        );
    } else {
      output = Math.max(Math.min(activatorRight - contentWidth, clientWidth-offset-contentWidth),offset);
    }
  } else {
    //   adjust arrow;

    const right = () => contentWidth + output + offset;
    const left = () => output - offset;

    const canAdjust = () =>
      arrowSize &&
      right() - offset + arrowSize >= activatorWidth + activatorLeft &&
      left() - arrowSize <= activatorLeft;

    //   right exceeding
    if (right() > clientWidth) {
      const difference = right() - clientWidth;

      output -= difference;

      arrowAdjusted = true;

      if (canAdjust()) {
        emitArrowAdjust(difference);
      } else {
        emitArrowAdjust(null);
      }
    } else if (left() < 0) {
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

import { nextAnimFrame, nextTick } from "../../../../../utils/main";
import { NullOr, SetState, UndefinedOr } from "../../../../utils/types";
import repositionY from "./repostion/y";
import repositionX from "./repostion/x";
import { BoundRect, OverlayAlign, OverlayPosition, Position } from "./types";

export default async function position({
  contentBound,
  psuedoOpen,
  offset,
  getOpen,
  mounted,
  activatorRef,
  position,
  arrowSize,
  align,
  setPsuedoOpen,
  setPseudoDuration,
  setInset,
  setShowOverlay,
  onArrowPosition,
  onArrowAdjust,
  setTransformOrigin,
}: {
  contentBound: NullOr<BoundRect>;
  psuedoOpen: boolean;
  offset: number;
  getOpen: boolean;
  mounted: boolean;
  activatorRef: React.MutableRefObject<null>;
  position: UndefinedOr<OverlayPosition>;
  arrowSize: number | undefined;
  align: OverlayAlign;
  setPsuedoOpen: SetState<boolean>;
  setPseudoDuration: SetState<UndefinedOr<number>>;
  setInset: SetState<NullOr<Position>>;
  setShowOverlay: SetState<boolean>;
  onArrowPosition: UndefinedOr<(position: OverlayPosition) => void>;
  onArrowAdjust: UndefinedOr<(offset: number | null) => void>;
  setTransformOrigin: SetState<OverlayPosition | undefined>;
}) {
  await nextTick();

  if (!activatorRef.current || !getOpen || !mounted) {
    return;
  }

  if (!psuedoOpen && !contentBound) {
    setPsuedoOpen(true);

    setPseudoDuration(1);
  }

  const activator: HTMLElement = activatorRef.current;

  if (activator && contentBound) {
    const { left, bottom, width, top, height, right } =
      activator.getBoundingClientRect();

    let getLeft =
      position === "left"
        ? left - contentBound.width - offset
        : position === "right"
        ? right + offset
        : left - contentBound.width / 2 + width / 2;

    let getTop =
      position === "top"
        ? top - contentBound.height - offset
        : position === "bottom"
        ? bottom + offset
        : top - contentBound.height / 2 + height / 2;

    getTop = repositionY({
      activatorHeight: height,
      contentHeight: contentBound.height,
      activatorTop: top,
      offset,
      position,
      y: getTop,
      arrowSize,
      align,
      onArrowPosition,
      onArrowAdjust,
      setTransformOrigin,
    });

    getLeft = repositionX({
      activatorWidth: width,
      activatorLeft: left,
      contentWidth: contentBound.width,
      offset,
      position,
      x: getLeft,
      arrowSize,
      align,
      onArrowPosition,
      onArrowAdjust,
      setTransformOrigin,
    });

    setInset({
      left: getLeft,
      top: getTop,
    });

    await nextAnimFrame();

    if (!mounted) {
      return;
    }

    setShowOverlay(true);
  }
}

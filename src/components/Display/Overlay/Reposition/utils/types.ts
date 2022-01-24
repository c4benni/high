export type BoundRect = {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type Position = { top: number; left: number };

export type OverlayPosition = "top" | "right" | "bottom" | "left" | "none";

export type OverlayAlign = "start" | "end" | undefined;

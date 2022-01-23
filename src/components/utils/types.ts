import { ReactNode } from "react";

export type Slot = ReactNode | ReactNode[] | null;

export type ImgProps = {
  publicId: string;
  alt: string;
};

export type DynamicObject<T> = {
  [key: string]: T;
};

export type ReactionType =
  | "shy"
  | "love"
  | "laugh"
  | "thumbs up"
  | "thumbs down"
  | "question"
  | "exclaim"
  | "";

export type ReactionEmoji = "🙈" | "❤" | "😂" | "👍" | "👎" | "❓" | "‼" | "";

export type GetReaction = {
  title: string;
  emoji: ReactionEmoji;
};

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
  type: ReactionType;
};

export type ComponentData = {
  events?: {
    [key: string]: Function;
  };
  attrs?: {
    [key: string]: string;
  };
};

export type SetState<T> = (value: React.SetStateAction<T>) => void;

export type UndefinedOr<T> = T | undefined;

export type NullOr<T> = T | null;

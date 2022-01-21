import { ReactNode } from "react";

export type Slot = ReactNode | ReactNode[] | null;

export type ImgProps = {
  publicId: string;
  alt: string;
};

export type DynamicObject<T> = {
  [key: string]: T;
};
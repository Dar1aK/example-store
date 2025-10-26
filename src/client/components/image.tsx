import type { FC } from "react";

export interface ImageProps {
  className?: string;
}

const STUB =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=";

export const Image: FC<ImageProps> = ({ className }) => {
  return <img className={className} src={STUB} />;
};

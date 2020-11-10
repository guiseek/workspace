export type EventTargetAs<T = HTMLElement> = Event & { target: T };

export interface AssetImage {
  title: string;
  src: string;
  width?: number;
  height?: number;
}

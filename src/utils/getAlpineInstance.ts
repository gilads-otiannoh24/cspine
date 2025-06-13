import { AlpineComponent } from "alpinejs";

export function getAlpineInstance(
  current: AlpineComponent<any>,
  supplied?: AlpineComponent<any>
) {
  if (supplied && supplied.$el) {
    return supplied;
  }

  return current;
}

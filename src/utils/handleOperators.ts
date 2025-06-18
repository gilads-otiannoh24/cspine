import { AlpineComponent } from "alpinejs";

export function handleOperators(el: HTMLElement, values: any[]) {
  const operator = el.dataset.operator;

  if (!operator && operator === "&") {
    return values.every(Boolean);
  }

  return values.some((value) => value);
}

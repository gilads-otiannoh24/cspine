const elementFnTracker = new WeakMap<HTMLElement, Set<string>>();

export function track(el: HTMLElement, group: string, fn: string): boolean {
  const called = elementFnTracker.get(el) ?? new Set();
  const key = getFnKey(group, fn);

  if (called.has(key)) return false;

  called.add(key);
  elementFnTracker.set(el, called);
  return true;
}

function getFnKey(group: string, name: string): string {
  return `${group}:${name}`;
}

export function warnEmptyNode(fn: string, group: string, el: HTMLElement) {
  console.warn(
    `No node passed to ${group} function ${fn}\n Try checking the provided group\n`,
    el
  );
}

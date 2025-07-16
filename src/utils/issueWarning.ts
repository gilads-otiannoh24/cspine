export function warnEmptyNode(fn: string, group: string, el: HTMLElement) {
  console.warn(
    `No node passed to ${group} function ${fn}\n Try checking the provided group\n`,
    el
  );
}

export function warnUnexpectedEvent(
  fn: string,
  group: string,
  el: HTMLElement,
  expected: string,
  e: Event
) {
  console.warn(
    `Unexpected event ${e.type} in ${group} function ${fn}\n Expected ${expected}\n`,
    el
  );
}

export const warn = (fn: string, group: string, el: HTMLElement) => {
  return {
    emptyNode: () => warnEmptyNode(fn, group, el),
    unexpectedEvent: (expected: string, e: Event) =>
      warnUnexpectedEvent(fn, group, el, expected, e),
    emptyEvent() {
      console.warn(
        `No event passed to ${group} function ${fn}\n This function has to be called with an event\n`,
        el
      );
    },

    form: {
      noTypeOrValue() {
        console.warn(
          `No type or value passed to ${group} function ${fn}\n This function has to be called on input or textarea elements\n`,
          el
        );
      },
    },
  };
};

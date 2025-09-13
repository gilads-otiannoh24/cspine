import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeEach, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  foo?: any;
  bar?: any;
};

let span: HTMLElement | null;
let stack: Stack<Component>;

describe("state.and function", () => {
  beforeEach(async () => {
    const data: AlpineComponent<Component> = {
      foo: true,
      bar: true,
    };

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.and:foo->bar" x-show="$_.state.and">I am visible</span>
      `,
      data
    );

    stack = getStack();
    stack.load();
    await domUpdate();

    span = document.getElementById("output");
  });

  test("should show element when both values are truthy", () => {
    expect(span?.style.display).not.toBe("none");
  });

  test("should hide element when reference is falsy", async () => {
    setupTestFrame(null, { foo: false, bar: true });
    await domUpdate();

    stack.load();

    span = document.getElementById("output");
    expect(span?.style.display).toBe("none");
  });

  test("should hide element when target is falsy", async () => {
    setupTestFrame(null, { foo: true, bar: 0 });
    await domUpdate();

    span = document.getElementById("output");
    expect(span?.style.display).toBe("none");
  });

  test("should hide element when both are falsy", async () => {
    setupTestFrame(null, { foo: null, bar: "" });
    await domUpdate();

    span = document.getElementById("output");
    expect(span?.style.display).toBe("none");
  });

  test("should hide element when target is missing", async () => {
    setupTestFrame(null, { foo: true });
    await domUpdate();

    span = document.getElementById("output");
    expect(span?.style.display).toBe("none");
  });

  test("should hide element when reference is missing", async () => {
    setupTestFrame(null, { bar: true });
    await domUpdate();
    stack.load();

    span = document.getElementById("output");
    expect(span?.style.display).toBe("none");
  });
});

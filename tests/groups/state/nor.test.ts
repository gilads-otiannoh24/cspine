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

describe("state.nor function", () => {
  beforeEach(async () => {
    const data: AlpineComponent<Component> = {
      foo: null,
      bar: null,
    };

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.nor:foo->bar" x-text="$_.state.nor"></span>
      `,
      data
    );

    stack = getStack();
    stack.load();
    await domUpdate();

    span = document.getElementById("output");
  });

  test("should return true when both reference and target are falsy", () => {
    expect(span?.textContent).toBe("true");
  });

  test("should return false when reference is truthy", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.nor:foo->bar" x-text="$_.state.nor"></span>
      `,
      {
        foo: "something",
        bar: null,
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("false");
  });

  test("should return false when target is truthy", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.nor:foo->bar" x-text="$_.state.nor"></span>
      `,
      {
        foo: null,
        bar: "non-empty",
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("false");
  });

  test("should return false when both reference and target are truthy", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.nor:foo->bar" x-text="$_.state.nor"></span>
      `,
      {
        foo: "yes",
        bar: 1,
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("false");
  });

  test("should return true when both are undefined", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.nor:foo->bar" x-text="$_.state.nor"></span>
      `,
      {
        foo: undefined,
        bar: undefined,
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("true");
  });
});

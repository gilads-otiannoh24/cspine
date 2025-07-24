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

describe("state.or function", () => {
  beforeEach(async () => {
    const data: AlpineComponent<Component> = {
      foo: null,
      bar: "fallback",
    };

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.or:foo->bar" x-text="$_.state.or"></span>
      `,
      data
    );

    stack = getStack();
    stack.load();
    await domUpdate();

    span = document.getElementById("output");
  });

  test("should use fallback value when reference is falsy", () => {
    expect(span?.textContent).toBe("fallback");
  });

  test("should use reference when it is truthy", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.or:foo->bar" x-text="$_.state.or"></span>
      `,
      {
        foo: "I am defined",
        bar: "fallback",
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("I am defined");
  });

  test("should return empty string if both reference and target are falsy", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.or:foo->bar" x-text="$_.state.or"></span>
      `,
      {
        foo: null,
        bar: undefined,
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("");
  });

  test("should handle numeric fallback correctly", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.or:foo->10(number)" x-text="$_.state.or"></span>
      `,
      {
        foo: null,
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("10");
  });

  test("should handle boolean fallback", async () => {
    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.or:foo->true(boolean)" x-text="$_.state.or"></span>
      `,
      {
        foo: false,
      }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("true");
  });
});

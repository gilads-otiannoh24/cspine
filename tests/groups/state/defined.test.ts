import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, beforeEach, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  foo?: string | null;
};

let span: HTMLElement | null;
let stack: Stack<Component>;

describe("Defined state function", () => {
  beforeEach(async () => {
    const data: AlpineComponent<Component> = {
      foo: "hello", // initially defined
    };

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.defined:foo" x-show="$_.state.defined">Visible if defined</span>
      `,
      data
    );

    stack = getStack();
    await stack.update();
    await domUpdate();

    span = document.getElementById("output");
  });

  test("should show element when variable is defined", () => {
    expect(span?.style.display).not.toBe("none");
  });

  test("should hide element when variable is undefined", async () => {
    stack.set.foo = undefined;
    await stack.update();

    expect(span?.style.display).toBe("none");
  });

  test("should hide element when variable is null", async () => {
    stack.set.foo = null;
    await stack.update();

    expect(span?.style.display).toBe("none");
  });

  test("should hide element when variable is not in state at all", async () => {
    const data: AlpineComponent<{}> = {};

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.defined:foo" x-show="$_.state.defined">Visible if defined</span>
      `,
      data
    );

    span = document.getElementById("output");

    stack = getStack();
    await stack.update();

    expect(span?.style.display).toBe("none");
  });
});

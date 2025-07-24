import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeEach, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  foo?: string | null;
};

let span: HTMLElement | null;
let stack: Stack<Component>;

describe("notDefined state function", () => {
  beforeEach(async () => {
    const data: AlpineComponent<Component> = {
      foo: "hello", // initially defined
    };

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.notDefined:foo" x-show="$_.state.notDefined">Visible if NOT defined</span>
      `,
      data
    );

    stack = getStack();
    stack.load();
    await domUpdate();

    span = document.getElementById("output");
  });

  test("should hide element when variable is defined", () => {
    expect(span?.style.display).toBe("none");
  });

  test("should show element when variable is undefined", async () => {
    stack.set.foo = undefined;
    await stack.update();

    expect(span?.style.display).not.toBe("none");
  });

  test("should show element when variable is null", async () => {
    stack.set.foo = null;
    await stack.update();

    expect(span?.style.display).not.toBe("none");
  });

  test("should show element when variable is not in state at all", async () => {
    const data: AlpineComponent<{}> = {};

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.notDefined:foo" x-show="$_.state.notDefined">Visible if NOT defined</span>
      `,
      data
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.style.display).not.toBe("none");
  });
});

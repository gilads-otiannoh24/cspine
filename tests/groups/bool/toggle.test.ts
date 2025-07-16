import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  foo: boolean;
  click(): Promise<void>;
};

describe("Toggle bool function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      foo: true,

      async click() {
        const button = this.$refs.btn;
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      },
    };

    setupTestFrame(
      /* html */ `
      <button x-ref="btn" data-cspine="toggle:foo" @click="$_.bool.toggle">Click</button>
      <span id="output" x-show="foo"></span>
  `,
      data
    );
  });

  test("should hide an element on button click", async () => {
    const span = document.getElementById("output")!;

    const stack: Stack<Component> = getStack();

    stack.set.click();
    await domUpdate();

    expect((span as any)._x_isShown).toBe(false);
  });

  test("should show an element on button click", async () => {
    const span = document.getElementById("output")!;

    const stack: Stack<Component> = getStack();
    // hide element and update
    stack.set.foo = false;
    await stack.update();

    // dispatch click event and await dom update
    stack.set.click();
    await domUpdate();

    expect((span as any)._x_isShown).toBe(true);
  });
});

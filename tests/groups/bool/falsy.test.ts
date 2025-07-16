import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent, InferInterceptors } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  foo: boolean;
};

describe("isFalse bool function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      foo: false,
    };

    setupTestFrame(
      /* html */ `
      <span id="output" data-cspine="falsy:foo" x-show="$_.bool.falsy"></span>
  `,
      data
    );
  });

  test("should show element if 'foo' is equal 'false'", async () => {
    const span = document.getElementById("output")!;

    expect((span as any)._x_isShown).toBe(true);
  });

  test("should hide element if 'foo' is not equal 'false'", async () => {
    const span = document.getElementById("output")!;

    const stack: Stack<Component> = getStack();

    stack.set.foo = true;
    await stack.update();

    expect((span as any)._x_isShown).toBe(false);
  });
});

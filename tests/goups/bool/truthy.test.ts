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

describe("isTrue bool function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      foo: true,
    };

    setupTestFrame(
      /* html */ `
      <span id="output" data-var="foo" x-show="$_.bool.truthy"></span>
  `,
      data
    );
  });

  test("should show element if 'foo' is equal 'true'", async () => {
    const span = document.getElementById("output")!;

    expect((span as any)._x_isShown).toBe(true);
  });

  test("should hide element if 'foo' is not equal 'true'", async () => {
    const span = document.getElementById("output")!;

    const stack: Stack<Component> = getStack();

    stack.set.foo = false;
    await stack.update();

    expect((span as any)._x_isShown).toBe(false);
  });
});

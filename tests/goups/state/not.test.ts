import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  foo: string;
};

describe("Not state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      foo: "bar",
    };

    setupTestFrame(
      /* html */ `
      <span id="output" data-var="foo" x-show="$_.state.not">I am showing</span>
  `,
      data
    );
  });

  test("should hide element if variable is not empty", async () => {
    const span = document.getElementById("output")!;

    expect((span as any)._x_isShown).toBe(false);
  });

  test("should show element if variable is empty", async () => {
    const span = document.getElementById("output")!;

    const stack: Stack<Component> = getStack();

    stack.set.foo = "";
    await stack.update();

    expect((span as any)._x_isShown).toBe(true);
  });
});

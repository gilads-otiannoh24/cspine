import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  empty: string;
};

describe("Empty state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      empty: "",
    };

    setupTestFrame(
      /* html */ `
      <span id="output" data-cspine="empty:empty" x-show="$_.state.empty">I am showing</span>
  `,
      data
    );
  });

  test("should show element if variable empty", async () => {
    const span = document.getElementById("output")!;

    expect((span as any)._x_isShown).toBe(true);
  });

  test("should hide element if variable not empty", async () => {
    const span = document.getElementById("output")!;

    const stack: Stack<Component> = getStack();

    stack.set.empty = "I am not empty";
    await stack.update();

    expect((span as any)._x_isShown).toBe(false);
  });
});

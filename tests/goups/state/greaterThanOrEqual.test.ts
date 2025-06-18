import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  number: number;
};

describe("greaterThanOrEqual state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      number: 5,
    };

    setupTestFrame(
      /* html */ `
      <span id="el1" data-value="2" data-cast="value=number" data-var="number" x-show="$_.state.greaterThanOrEqual"></span>
      <span id="el2" data-value="6" data-cast="value=number" data-var="number" x-show="$_.state.greaterThanOrEqual"></span>
      <span id="el3" data-value="5" data-cast="value=number" data-var="number" x-show="$_.state.greaterThanOrEqual"></span>
  `,
      data
    );
  });

  test("should show element if number grater than '2'", async () => {
    const el = document.getElementById("el1")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if number is less than '6'", async () => {
    const el = document.getElementById("el2")!;

    expect((el as any)._x_isShown).toBe(false);
  });

  test("should show element if number is equal '5'", async () => {
    const el = document.getElementById("el3")!;

    expect((el as any)._x_isShown).toBe(true);
  });
});

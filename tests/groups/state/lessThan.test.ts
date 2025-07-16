import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  number: number;
};

describe("lessThan state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      number: 1,
    };

    setupTestFrame(
      /* html */ `
      <span id="el1" data-cspine="lessThan:number->2(number)" x-show="$_.state.lessThan"></span>
      <span id="el2" data-cspine="lessThan:number->0(number)" x-show="$_.state.lessThan"></span>
  `,
      data
    );
  });

  test("should show element if number less than '2'", async () => {
    const el = document.getElementById("el1")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if number is greater than '0'", async () => {
    const el = document.getElementById("el2")!;

    expect((el as any)._x_isShown).toBe(false);
  });
});

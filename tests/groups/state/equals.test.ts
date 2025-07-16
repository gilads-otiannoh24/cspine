import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  string: string;
  number: number;
};

describe("Equals state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      string: "foo",
      number: 1,
    };

    setupTestFrame(
      /* html */ `
      <span id="el1" data-cspine="equals:string->'foo'" x-show="$_.state.equals"></span>
      <span id="el2" data-cspine="equals:number->1(number)" x-show="$_.state.equals"></span>
  `,
      data
    );
  });

  test("should show element if string equals 'foo'", async () => {
    const el = document.getElementById("el1")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if number equals '1'", async () => {
    const el = document.getElementById("el2")!;

    expect((el as any)._x_isShown).toBe(true);
  });
});

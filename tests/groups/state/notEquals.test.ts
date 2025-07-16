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

describe("notEquals state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      string: "foo",
      number: 1,
    };

    setupTestFrame(
      /* html */ `
      <span id="el1" data-cspine="notEquals:string->'bar'" x-show="$_.state.notEquals"></span>
      <span id="el2" data-cspine="notEquals:number->2(number)" x-show="$_.state.notEquals"></span>
  `,
      data
    );
  });

  test("should show element if string is not equal 'bar'", async () => {
    const el = document.getElementById("el1")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if number is not equal '2'", async () => {
    const el = document.getElementById("el2")!;

    expect((el as any)._x_isShown).toBe(true);
  });
});

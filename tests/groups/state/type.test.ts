import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  string: string;
  array: string[];
  object: Record<string, string>;
  number: number;
  un?: string;

  fn(): void;
};

describe("Type state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      string: "foo",
      array: ["foo"],
      object: { foo: "bar" },
      number: 1,
      un: undefined,

      fn() {},
    };

    setupTestFrame(
      /* html */ `
      <span id="el1" data-cspine="type:string->'string'" x-show="$_.state.type"></span>
      <span id="el2" data-cspine="type:array->'array'" x-show="$_.state.type"></span>
      <span id="el3" data-cspine="type:object->'object'" x-show="$_.state.type"></span>
      <span id="el4" data-cspine="type:fn->'function'" x-show="$_.state.type"></span>
      <span id="el5" data-cspine="type:number->'number'" x-show="$_.state.type"></span>
  `,
      data
    );
  });

  test("should show element if type is string", async () => {
    const el = document.getElementById("el1")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if type is array", async () => {
    const el = document.getElementById("el2")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if type is object", async () => {
    const el = document.getElementById("el3")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if type is function", async () => {
    const el = document.getElementById("el4")!;

    expect((el as any)._x_isShown).toBe(true);
  });

  test("should show element if type is number", async () => {
    const el = document.getElementById("el5")!;

    expect((el as any)._x_isShown).toBe(true);
  });
});

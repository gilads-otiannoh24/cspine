import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  x: string;
  y: string;
  z: number;
};

describe("Join string function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      x: "otiannoh",
      y: "gilads",
      z: 123,
    };

    setupTestFrame(
      /* html */ `
      <!-- Normal forward join -->
      <div id="div1" data-cspine="join:x->y|separator='-'" x-text="$_.string.join"></div>

      <!-- Reverse join -->
      <div id="div2" data-cspine="join:x->y|separator='-',order='bwd'" x-text="$_.string.join"></div>

      <!-- No separator -->
      <div id="div3" data-cspine="join:x->y" x-text="$_.string.join"></div>

      <!-- Empty separator -->
      <div id="div4" data-cspine="join:x->y|separator=''" x-text="$_.string.join"></div>

      <!-- Target missing -->
      <div id="div5" data-cspine="join:x->''|separator='-'" x-text="$_.string.join"></div>

      <!-- Variable is not a string -->
      <div id="div6" data-cspine="join:z->y|separator='-'" x-text="$_.string.join"></div>

      <!-- Variable is undefined -->
      <div id="div7" data-cspine="join:a->y|separator='-'" x-text="$_.string.join"></div>
    `,
      data
    );
  });

  test("should join strings with separator", () => {
    const div = document.getElementById("div1");
    expect(div?.innerHTML).toBe("otiannoh-gilads");
  });

  test("should join strings in reverse with separator", () => {
    const div = document.getElementById("div2");
    expect(div?.innerHTML).toBe("gilads-otiannoh");
  });

  test("should join strings without separator", () => {
    const div = document.getElementById("div3");
    expect(div?.innerHTML).toBe("otiannohgilads");
  });

  test("should join strings with empty separator", () => {
    const div = document.getElementById("div4");
    expect(div?.innerHTML).toBe("otiannohgilads");
  });

  test("should return only variable when target is missing", () => {
    const div = document.getElementById("div5");
    expect(div?.innerHTML).toBe("otiannoh");
  });

  test("should return empty string when variable is not a string", () => {
    const div = document.getElementById("div6");
    expect(div?.innerHTML).toBe("");
  });

  test("should return empty string when variable is undefined", () => {
    const div = document.getElementById("div7");
    expect(div?.innerHTML).toBe("");
  });
});

import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  x: number;
  y: string;
};

describe("General CSPine event binding", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      x: 0,
      y: "",
    };

    setupTestFrame(
      /* html */ `
      <div id="div" @keydown="$_.state.set" @click="$_.state.set" data-cspine="state.set:x->1(number)|event='click';state.set:x->2(number)|event='keydown';set:y->'I am binded to both events'|event='click,keydown'"></div>
      `,
      data
    );
  });

  it("should bind a command to click event", async () => {
    const div = document.getElementById("div");

    div?.dispatchEvent(new Event("click", { bubbles: true }));

    await domUpdate();

    const stack = getStack();

    expect(stack.data.x).toBe(1);
    expect(stack.data.y).toBe("I am binded to both events");
  });

  it("should bind a command to mouseover event", async () => {
    const div = document.getElementById("div");

    div?.dispatchEvent(new Event("keydown", { bubbles: true }));
    await domUpdate();

    const stack = getStack();

    expect(stack.data.x).toBe(2);
    expect(stack.data.y).toBe("I am binded to both events");
  });
});

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
  arr: string[][];
};

describe("General CSPine event binding", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      x: 0,
      y: "",
      arr: [["ian"], ["wesley"], ["tarvel"], ["antoline"], ["inno"], ["leah"]],
    };

    setupTestFrame(
      /* html */ `
      <div id="div" @keydown="$_.state.set" @click="$_.state.set" data-cspine="state.set:x->1(number)|event='click';state.set:x->2(number)|event='keydown';set:y->'I am binded to both events'|event='click,keydown'"></div>

       <div id="case">
        <template id="tmpl" x-for="person in arr">
          <div data-cspine="util.evaluate:person[0]" x-text="$_.util.evaluate"></div>
        </template>
      </div>
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

  it("can read from an array successfully", async () => {
    const div = document.getElementById("case")!;
    const divs = div.querySelectorAll("div");

    expect(divs.length).toBe(6);
    expect(divs[0].textContent).toBe("ian");
  });
});

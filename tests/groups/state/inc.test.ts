import { domUpdate } from "@/utils/delay";
import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  count: number | string;
  click(): Promise<void>;
};

describe("Increment state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      count: 0,

      async click() {
        const button = this.$refs.btn;

        await domUpdate();

        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      },

      async init() {
        await this.click();
      },
    };

    setupTestFrame(
      /* html */ `
      <button x-ref="btn" data-cspine="inc:count" @click="$_.state.inc" id="btn">Click</button>
      <span id="output" x-text="count"></span>
  `,
      data
    );
  });

  test("should increment a number by one", async () => {
    const span = document.getElementById("output")!;
    await domUpdate();

    expect(span.textContent).toBe("1");
  });
});

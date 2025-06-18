import { domUpdate } from "@/utils/delay";
import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent, InferInterceptors } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  count: number | string;
  click(): Promise<void>;
};

describe("Decrement state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      count: 1,

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
      <button x-ref="btn" data-var="count" @click="$_.state.dec" id="btn">Click</button>
      <span id="output" x-text="count"></span>
  `,
      data
    );
  });

  test("should decrement a number by one", async () => {
    const span = document.getElementById("output")!;
    await domUpdate();

    expect(span.textContent).toBe("0");
  });
});

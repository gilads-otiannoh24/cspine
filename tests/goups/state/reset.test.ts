import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { keys } from "lodash";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  string: string;
  array: string[];
  object: Record<string, string>;

  resetString(): Promise<void>;
  resetArray(): Promise<void>;
  resetObject(): Promise<void>;
};

describe("Empty state function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      string: "foo",
      array: ["foo"],
      object: { foo: "bar" },

      async resetArray() {
        const button = this.$refs.btn2;

        await domUpdate();

        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      },

      async resetObject() {
        const button = this.$refs.btn3;
        await domUpdate();
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      },

      async resetString() {
        const button = this.$refs.btn1;
        await domUpdate();
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      },
    };

    setupTestFrame(
      /* html */ `
      <button x-ref="btn1" data-var="string" @click="$_.state.reset"></button>
      <button x-ref="btn2" data-var="array" @click="$_.state.reset"></button>
      <button x-ref="btn3" data-var="object" @click="$_.state.reset"></button>
  `,
      data
    );
  });

  test("should reset string", async () => {
    const stack: Stack<Component> = getStack();

    await stack.set.resetString();
    await domUpdate();

    stack.load();

    expect(stack.set.string.length).toBe(0);
  });

  test("should reset array", async () => {
    const stack: Stack<Component> = getStack();

    await stack.set.resetArray();
    await domUpdate();

    stack.load();

    expect(stack.set.array.length).toBe(0);
  });

  test("should reset object", async () => {
    const stack: Stack<Component> = getStack();

    await stack.set.resetObject();
    await domUpdate();

    stack.load();

    expect(keys(stack.set.object).length).toBe(0);
  });
});

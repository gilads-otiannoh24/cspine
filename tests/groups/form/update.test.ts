import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  form: {
    name: string;
  };
};

describe("Form update function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      form: {
        name: "",
      },
    };

    setupTestFrame(
      /* html */ `
          <input type="text" id="input" :value="form.name" @input="$_.form.update" data-cspine="update:form.name">
      `,
      data
    );
  });

  it("should update the name on input", async () => {
    const input = document.getElementById("input") as HTMLInputElement;

    input.value = "John";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    await domUpdate();

    const stack = getStack();
    stack.load();

    expect(stack.set.form.name).toEqual("John");
  });
});

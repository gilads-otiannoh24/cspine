import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame, Stack } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeEach, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  foo?: any;
};

let span: HTMLElement | null;
let stack: Stack<Component>;

describe("state.if function", () => {
  beforeEach(async () => {
    const data: AlpineComponent<Component> = {
      foo: 20, // matches initially
    };

    setupTestFrame(
      /* html */ `
        <span id="output" data-cspine="state.if:foo->20(number)|operator='===','Yes','No'" x-text="$_.state.if"></span>
      `,
      data
    );

    stack = getStack();
    stack.load();
    await domUpdate();

    span = document.getElementById("output");
  });

  test("should return 'Yes' when foo === 20", () => {
    expect(span?.textContent).toBe("Yes");
  });

  test("should return 'No' when foo !== 20", async () => {
    setupTestFrame(null, { foo: 30 });
    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("No");
  });

  test("should support string comparison", async () => {
    setupTestFrame(
      /* html */ `<span id="output" data-cspine="state.if:foo->'hello'|operator='===','Match','No Match'" x-text="$_.state.if"></span>`,
      { foo: "hello" }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("Match");
  });

  test("should return fallback value when no operator is provided and reference is falsy", async () => {
    setupTestFrame(
      /* html */ `<span id="output" data-cspine="state.if:foo|,'Truthy','Falsy'" x-text="$_.state.if"></span>`,
      { foo: null }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("Falsy");
  });

  test("should default to === when operator is omitted but target is present", async () => {
    setupTestFrame(
      /* html */ `<span id="output" data-cspine="state.if:foo->1(number)|,'Match','No Match'" x-text="$_.state.if"></span>`,
      { foo: 1 }
    );

    await domUpdate();

    span = document.getElementById("output");
    expect(span?.textContent).toBe("Match");
  });
});

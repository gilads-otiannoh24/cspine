import { domUpdate } from "@/utils/delay";
import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  status: "pending" | "active" | "suspended";
};

describe("UI class function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      status: "active",
    };

    setupTestFrame(
      /* html */ `
          <button id="btn" class="hello" data-cspine="class:status|pending='bg-red',active='bg-blue',suspended='bg-yellow',cast='string',\\cast='bg-green'" :class="$_.ui.class"></button>
      `,
      data
    );
  });

  it("should have class as 'bg-blue'", async () => {
    const btn = document.getElementById("btn")!;
    await domUpdate();

    expect(btn.classList.contains("bg-blue")).toEqual(true);
  });
});

import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, it, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {};

describe("Util call function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {};

    setupTestFrame(
      /* html */ `
    `,
      data
    );
  });
});

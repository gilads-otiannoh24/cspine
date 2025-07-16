import { domUpdate } from "@/utils/delay";
import { setupTestFrame } from "@/utils/setupDom";
import { CSPineResolved, DeepNestArgs } from "@/v2/tree/CSPineTree";
import { tree } from "@/v2/tree/init";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  status: "pending" | "active" | "suspended";
};

describe("CSPine Tree resolve tests", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      status: "active",
    };

    setupTestFrame(
      /* html */ `
      <div
        id="scope-root"
        data-cspinescope="
          commands:
            greet := alert('Hello!'(string));
            validate := form.validate:email->error(string)|silent=true;
          
          args:
            form.validate := silent=true, errorTarget='err-zone';
            alert := type='info';
          
          groups:
            form := layout='stacked';
            alert := duration=5000;"
      >
        <div id="mid-layer">
          <div id="btn-wrapper">
            <button id="btn"></button>
          </div>
        </div>
      </div>
    `,
      data
    );

    await domUpdate();
  });

  it("resolves defined command", () => {
    const btn = document.getElementById("btn")!;
    const result = tree.resolve(btn, "greet");
    expect(result?.ast).toBeDefined();
    expect((result?.args as DeepNestArgs)?.alert.type.value).toBe("info");
  });

  it("resolves group config", () => {
    const btn = document.getElementById("btn")!;
    const result = tree.resolve(btn, "form", "group");
    expect(result).toBeTruthy();
    expect(result?.args?.layout.value).toBe("stacked");
  });

  it("resolves command-specific args", () => {
    const btn = document.getElementById("btn")!;
    const result = tree.resolve(btn, "form.validate", "arg");
    expect(result).toBeTruthy();
    expect(result?.args?.silent.value).toBe(true);
    expect(result?.args?.errorTarget.value).toBe("err-zone");
  });

  it("returns closest ancestor scope when element is deeply nested", () => {
    const wrapper = document.getElementById("btn-wrapper")!;
    const result = tree.getScope(wrapper);
    expect(result).not.toBe(null);
    expect(Object.keys(result!.commands)).toContain("greet");
  });

  it("returns null for unknown command", () => {
    const btn = document.getElementById("btn")!;
    const result = tree.resolve(btn, "nonexistentCommand");
    expect(result).toBe(null);
  });

  it("returns null for unknown group", () => {
    const btn = document.getElementById("btn")!;
    const result = tree.resolve(btn, "unknownGroup", "group");
    expect(result).toBe(null);
  });

  it("resolves overridden command in inner scope", async () => {
    const innerHTML = `
      <div
        data-cspinescope="commands: greet := alert('Hi there!'(string));"
      >
        <button id="inner-btn"></button>
      </div>
    `;
    const outer = document.getElementById("btn-wrapper")!;
    outer.innerHTML = innerHTML;

    await domUpdate();

    const innerBtn = document.getElementById("inner-btn")!;
    const result = tree.resolve(innerBtn, "greet");

    expect(result?.ast?.[0]).toBeDefined();
    expect(result?.ast?.[0].type).toBe("call");
  });
});

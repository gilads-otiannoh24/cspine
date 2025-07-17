import { domUpdate } from "@/utils/delay";
import { setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeAll, describe, expect, test } from "vitest";

/**
 * @vitest-environment jsdom
 */

type Component = {
  arr: number[];
  arr2: { name: string; age: number }[];
  arr3: { profile: { age: number } }[];
  invalid?: any;
};

describe("Filter array function", () => {
  beforeAll(async () => {
    const data: AlpineComponent<Component> = {
      arr: [1, 2, 3, 4, 5, 6, 7],
      arr2: [
        { name: "John", age: 20 },
        { name: "Jane", age: 25 },
        { name: "Bob", age: 13 },
      ],
      arr3: [
        { profile: { age: 17 } },
        { profile: { age: 18 } },
        { profile: { age: 22 } },
      ],
      invalid: 42,
    };

    setupTestFrame(
      /* html */ `
      <!-- Simple equality -->
      <div id="case1">
        <template id="tmpl" data-cspine="array.filter:arr->7(number)|operator='==='" x-for="num in $_.array.filter">
          <div x-text="num"></div>
        </template>
      </div>

      <!-- Greater than -->
      <div id="case2">
        <template id="tmpl1" data-cspine="array.filter:arr->3(number)|operator='>'" x-for="num in $_.array.filter">
          <div x-text="num"></div>
        </template>
      </div>

      <!-- Object prop filter -->
      <div id="case3">
        <template id="tmpl2" data-cspine="array.filter:arr2->20(number)|age,operator='<'" x-for="person in $_.array.filter">
          <div x-text="person.name"></div>
        </template>
      </div>

      <!-- Nested prop filter -->
      <div id="case4">
        <template id="tmpl3" data-cspine="array.filter:arr3->18(number)|profile.age,operator='>='" x-for="item in $_.array.filter">
          <div x-text="item.profile.age"></div>
        </template>
      </div>

      <!-- Missing operator (should return all) -->
      <div id="case5">
        <template id="tmpl4" data-cspine="array.filter:arr->0(number)" x-for="n in $_.array.filter">
          <div x-text="n"></div>
        </template>
      </div>

      <!-- Invalid reference (non-array) -->
      <div id="case6">
        <template id="tmpl5" data-cspine="array.filter:invalid->5(number)|operator='>'" x-for="n in $_.array.filter">
          <div x-text="n"></div>
        </template>
      </div>

      <!-- Invalid path -->
      <div id="case7">
        <template id="tmpl6" data-cspine="array.filter:arr2->1(number)|nonexistent,operator='>'" x-for="n in $_.array.filter">
          <div x-text="n"></div>
        </template>
      </div>
    `,
      data
    );

    await domUpdate(); // wait for Alpine/CSPine to render
  });

  test("filters using equality", () => {
    const tmpl = document.getElementById("tmpl")!;
    const divs = tmpl.parentElement!.querySelectorAll("div");
    expect(divs.length).toBe(1);
    expect(divs[0].textContent).toBe("7");
  });

  test("filters using greater than", () => {
    const tmpl = document.getElementById("tmpl1")!;
    const divs = tmpl.parentElement!.querySelectorAll("div");
    expect(divs.length).toBe(4);
    expect(Array.from(divs).map((el) => el.textContent)).toEqual([
      "4",
      "5",
      "6",
      "7",
    ]);
  });

  test("filters object properties (age < 20)", () => {
    const tmpl = document.getElementById("tmpl2")!;
    const divs = tmpl.parentElement!.querySelectorAll("div");
    expect(divs.length).toBe(1);
    expect(divs[0].textContent).toBe("Bob");
  });

  test("filters nested object property (profile.age >= 18)", () => {
    const tmpl = document.getElementById("tmpl3")!;
    const divs = tmpl.parentElement!.querySelectorAll("div");
    expect(divs.length).toBe(2);
    expect(Array.from(divs).map((el) => el.textContent)).toEqual(["18", "22"]);
  });

  test("returns entire array when operator is missing", () => {
    const tmpl = document.getElementById("tmpl4")!;
    const divs = tmpl.parentElement!.querySelectorAll("div");
    expect(divs.length).toBe(7);
    expect(divs[0].textContent).toBe("1");
  });

  test("returns [] if reference is not an array", () => {
    const tmpl = document.getElementById("tmpl5")!;
    const divs = tmpl.parentElement!.querySelectorAll("div");
    expect(divs.length).toBe(0);
  });

  test("returns [] for invalid property path", () => {
    const tmpl = document.getElementById("tmpl6")!;
    const divs = tmpl.parentElement!.querySelectorAll("div");
    expect(divs.length).toBe(0);
  });
});

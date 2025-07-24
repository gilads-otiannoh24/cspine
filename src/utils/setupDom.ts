import CSPine from "@/CSPine";
import Alpine from "@alpinejs/csp";
import { AlpineComponent, InferInterceptors } from "alpinejs";
import { domUpdate } from "./delay";

export type Stack<T> = {
  set: any;
  data: any;

  load(): void;
  update(): Promise<void>;
};

let AlpineStarted = false;

export async function setupDom(
  html: string | null,
  testData?: () => AlpineComponent<any>
) {
  if (html !== null) document.body.innerHTML = html;

  if (html === null) {
    const currrentHTML = document.body.innerHTML;

    document.body.innerHTML = "";
    document.body.innerHTML = currrentHTML;
  }

  Alpine.data("TestData", testData ?? ((): AlpineComponent<any> => ({})));
  Alpine.plugin(CSPine.plugin);

  if (!AlpineStarted) {
    AlpineStarted = true;
    Alpine.start();
  }

  await domUpdate();
}

export async function setupTestFrame(
  innerHtml: string | null,
  data?: AlpineComponent<any>
) {
  await setupDom(
    innerHtml
      ? /* html */ `
    <main id="main_test_data_element" x-data="TestData">
      ${innerHtml}
    </main>
  `
      : null,
    () => data ?? {}
  );
}

export function getDataStack() {
  const data = (document.getElementById("main_test_data_element") as any)
    ._x_dataStack;

  if (data && Array.isArray(data)) {
    return data[0];
  }

  return data;
}

export function setDataStack(data: object) {
  (document.getElementById("main_test_data_element") as any)._x_dataStack = [
    data,
  ];
}

export const dataStack: Stack<any> = {
  set: {},
  data: {},
  load() {
    this.set = typeof getDataStack() === "object" ? getDataStack() : {};
    this.data = this.set;
  },

  async update() {
    setDataStack(this.set || {});
    await domUpdate();
  },
};

export function getStack() {
  const stack = dataStack;

  dataStack.load();

  return stack;
}

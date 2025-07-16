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

export async function setupDom(
  html: string,
  testData?: () => AlpineComponent<any>
) {
  (window as any).Apline = Alpine;

  document.body.innerHTML = html;

  Alpine.data("TestData", testData ?? ((): AlpineComponent<any> => ({})));

  Alpine.plugin(CSPine.plugin);
  Alpine.start();

  await domUpdate();
}

export async function setupTestFrame(
  innerHtml: string,
  data?: AlpineComponent<any>
) {
  await setupDom(
    /* html */ `
    <main id="main_test_data_element" x-data="TestData">
      ${innerHtml}
    </main>
  `,
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

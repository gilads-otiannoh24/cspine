import CSPine from "@/CSPine";
import Alpine from "@alpinejs/csp";
import { AlpineComponent, evaluate, InferInterceptors } from "alpinejs";
import { domUpdate } from "./delay";
import { bool, state } from "@/groups";

export type Stack<T> = {
  set: InferInterceptors<T>;

  load(): void;
  update(): Promise<void>;
};

export async function setupDom(
  html: string,
  testData?: () => AlpineComponent<any>
) {
  (window as any).Apline = Alpine;

  Alpine.data("TestData", testData ?? ((): AlpineComponent<any> => ({})));

  CSPine.config.groups = [state, bool];

  Alpine.plugin(CSPine.plugin);

  Alpine.start();

  document.body.innerHTML = html;

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
  load() {
    this.set = typeof getDataStack() === "object" ? getDataStack() : {};
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

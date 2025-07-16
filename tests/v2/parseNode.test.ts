import { parseNode } from "@/utils/parseNode";
import { describe, it, expect, vi } from "vitest"; // import your corrected mock here
import type { Options } from "@/CSPine";
import { ASTNode } from "@/v2/dsl/types";

// Define the mock logic for `evaluate`
export const mockEvaluate = <T>(expression: string | (() => T)) => {
  if (typeof expression === "function") return expression();

  const mockScope = {
    x: 10,
    message: "hello",
    user: { id: "user-42" },
    flag: false,
  };

  return expression
    .split(".")
    .reduce((acc, key) => acc?.[key], mockScope as any);
};

// ✅ Define a properly typed mock for evaluateLater
export const mockEvaluateLater = <T>(expression: string) => {
  return (callback?: (value: T) => void, _extras?: {}): void => {
    const result = mockEvaluate<T>(expression);
    if (callback) callback(result);
  };
};

// Final `Options` mock
export const mockOptions: Options = {
  Alpine: {} as any,
  effect: vi.fn(),
  cleanup: vi.fn(),
  evaluate: mockEvaluate,
  evaluateLater: mockEvaluateLater, // ✅ properly typed
  interceptor: vi.fn(),

  this: {},
  e: undefined,
  config: {
    groups: [],
    useV2Parsing: false,
  },
};

describe("parseNode - normal node parsing", () => {
  it("parses a literal number target", () => {
    const node: ASTNode = {
      group: null,
      type: "normal",
      command: "set",
      reference: "count",
      target: {
        type: "literal",
        value: "42",
        cast: "number",
      },
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.target?.value).toBe(42);
  });

  it("parses a literal boolean target", () => {
    const node: ASTNode = {
      group: null,
      type: "normal",
      command: "toggle",
      reference: "visible",
      target: {
        type: "literal",
        value: "true",
        cast: "boolean",
      },
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.target?.value).toBe(true);
  });

  it("parses null cast", () => {
    const node: ASTNode = {
      group: null,
      type: "normal",
      command: "set",
      reference: "data",
      target: {
        type: "literal",
        value: "ignored",
        cast: "null",
      },
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.target?.value).toBeNull();
  });

  it("parses a reference with number cast", () => {
    const node: ASTNode = {
      group: null,
      type: "normal",
      command: "set",
      reference: "total",
      target: {
        type: "reference",
        value: "x",
        cast: "number",
      },
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.target?.value).toBe(10); // mock x = 10
  });

  it("parses object cast", () => {
    const node: ASTNode = {
      group: null,
      type: "normal",
      command: "set",
      reference: "settings",
      target: {
        type: "literal",
        value: '{"mode":"dark"}',
        cast: "object",
      },
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.target?.value).toEqual({ mode: "dark" });
  });

  it("parses fallback object on bad JSON", () => {
    const node: ASTNode = {
      group: null,
      type: "normal",
      command: "set",
      reference: "settings",
      target: {
        type: "literal",
        value: "dark-mode",
        cast: "object",
      },
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.target?.value).toEqual({ value: "dark-mode" });
  });
});

describe("parseNode - call node parsing", () => {
  it("parses call node with string and number args", () => {
    const node: ASTNode = {
      type: "call",
      name: "alert",
      args: [
        {
          value: {
            type: "literal",
            value: "Welcome",
            cast: "string",
          },
        },
        {
          value: {
            type: "literal",
            value: "300",
            cast: "number",
          },
        },
      ],
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions, true);

    expect(result?.args).toEqual([{ value: "Welcome" }, { value: 300 }]);
  });

  it("evaluates and casts a reference arg", () => {
    const node: ASTNode = {
      type: "call",
      name: "notify",
      args: [
        {
          value: {
            type: "reference",
            value: "x", // mock = 10
            cast: "string",
          },
        },
      ],
      commandArgs: {
        positional: [],
        named: {},
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.args?.[0].value).toBe("10");
  });

  it("parses complex commandArgs", () => {
    const node: ASTNode = {
      type: "call",
      name: "send",
      args: [],
      commandArgs: {
        positional: ["foo", "bar"],
        named: {
          event: {
            value: "click",
            escaped: false,
            escapedValue: "",
            otherValues: {
              value: [],
              escaped: [],
            },
          },
          priority: {
            value: "high",
            escaped: false,
            escapedValue: "",
            otherValues: {
              value: [],
              escaped: [],
            },
          },
        },
      },
    };

    const result = parseNode(node, mockOptions);

    expect(result?.commandArgs.positional).toContain("foo");
    expect(result?.commandArgs.named.event.value).toBe("click");
    expect(result?.commandArgs.named.priority.value).toBe("high");
  });
});

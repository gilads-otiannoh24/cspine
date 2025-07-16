import { parse } from "@/v2/dsl/parse";
import { describe, it, expect } from "vitest";

describe("AST Builder - call mode", () => {
  it("should build AST from single call with casted args", () => {
    const ast = parse(`notify("Saved!"(string), 3000(number))|'hello'`);

    expect(ast).toEqual([
      {
        type: "call",
        name: "notify",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: ["hello"],
          named: {},
        },
      },
    ]);
  });

  it("should build AST from multiple calls", () => {
    const input = `notify("Saved!"(string), 3000(number)); update(user.id(string), true(bool))`;
    const ast = parse(input);

    expect(ast).toEqual([
      {
        type: "call",
        name: "notify",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: [],
          named: {},
        },
      },
      {
        type: "call",
        name: "update",
        args: [
          { value: { type: "reference", value: "user.id", cast: "string" } },
          { value: { type: "literal", value: "true", cast: "bool" } },
        ],
        commandArgs: {
          positional: [],
          named: {},
        },
      },
    ]);
  });

  it("should build AST for call with no args", () => {
    const ast = parse(`refresh()`);
    expect(ast).toEqual([
      {
        type: "call",
        name: "refresh",
        args: [],
        commandArgs: {
          positional: [],
          named: {},
        },
      },
    ]);
  });

  it("should handle call with mixed args (literal, reference, boolean)", () => {
    const ast = parse(`example("test"(string), user.data(json), true(bool))`);
    expect(ast).toEqual([
      {
        type: "call",
        name: "example",
        args: [
          { value: { type: "literal", value: "test", cast: "string" } },
          { value: { type: "reference", value: "user.data", cast: "json" } },
          { value: { type: "literal", value: "true", cast: "bool" } },
        ],
        commandArgs: {
          positional: [],
          named: {},
        },
      },
    ]);
  });

  it("should ignore malformed calls", () => {
    const ast = parse(`notify "Saved!"(string), 3000(number)`); // no ()
    expect(ast).toEqual([]);
  });

  it("should include positional argument", () => {
    const ast = parse(`notify ("Saved!"(string), 3000(number))|'hello'`); // no ()
    expect(ast).toEqual([
      {
        name: "notify",
        type: "call",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: ["hello"],
          named: {},
        },
      },
    ]);
  });

  it("should include positional argument and escaped named args", () => {
    const ast = parse(
      `notify ("Saved!"(string), 3000(number))|'hello',event='click',\\event='value'`
    ); // no ()
    expect(ast).toEqual([
      {
        name: "notify",
        type: "call",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: ["hello"],
          named: {
            event: {
              value: "click",
              escapedValue: "value",
              escaped: true,
              otherValues: {
                escaped: [],
                value: [],
              },
            },
          },
        },
      },
    ]);
  });

  it("should include positional arguments", () => {
    const ast = parse(
      `notify ("Saved!"(string), 3000(number))|hello,'ian otieno'`
    ); // no ()
    expect(ast).toEqual([
      {
        name: "notify",
        type: "call",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: ["hello", "ian otieno"],
          named: {},
        },
      },
    ]);
  });
  it("should include named argument", () => {
    const ast = parse(
      `notify ("Saved!"(string), 3000(number))|greeting='hello'`
    ); // no ()
    expect(ast).toEqual([
      {
        name: "notify",
        type: "call",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: [],
          named: {
            greeting: {
              value: "hello",
              escapedValue: null,
              escaped: false,
              otherValues: {
                escaped: [],
                value: [],
              },
            },
          },
        },
      },
    ]);
  });

  it("should include named arguments", () => {
    const ast = parse(
      `notify ("Saved!"(string), 3000(number))|greeting='hello',name='ian otieno'`
    ); // no ()
    expect(ast).toEqual([
      {
        name: "notify",
        type: "call",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: [],
          named: {
            greeting: {
              value: "hello",
              escapedValue: null,
              escaped: false,
              otherValues: {
                escaped: [],
                value: [],
              },
            },
            name: {
              value: "ian otieno",
              escapedValue: null,
              escaped: false,
              otherValues: {
                escaped: [],
                value: [],
              },
            },
          },
        },
      },
    ]);
  });

  it("should include both named and positional arguments", () => {
    const ast = parse(
      `notify ("Saved!"(string), 3000(number))|'arg1','arg2', greeting='hello',name='ian otieno'`
    ); // no ()
    expect(ast).toEqual([
      {
        name: "notify",
        type: "call",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
        commandArgs: {
          positional: ["arg1", "arg2"],
          named: {
            greeting: {
              value: "hello",
              escapedValue: null,
              otherValues: {
                escaped: [],
                value: [],
              },
              escaped: false,
            },
            name: {
              value: "ian otieno",
              escapedValue: null,
              otherValues: {
                escaped: [],
                value: [],
              },
              escaped: false,
            },
          },
        },
      },
    ]);
  });

  it("should parse alpine magic like strings as functions", () => {
    const ast = parse(`$notify("Saved!"(string))`); // no ()
    expect(ast).toEqual([
      {
        name: "$notify",
        type: "call",
        args: [{ value: { type: "literal", value: "Saved!", cast: "string" } }],
        commandArgs: {
          positional: [],
          named: {},
        },
      },
    ]);
  });

  it("should parse alpine magic like strings(with object chaining dot syntax) as functions", () => {
    const ast = parse(`$notify.error("Saved!"(string))`); // no ()
    expect(ast).toEqual([
      {
        name: "$notify.error",
        type: "call",
        args: [{ value: { type: "literal", value: "Saved!", cast: "string" } }],
        commandArgs: {
          positional: [],
          named: {},
        },
      },
    ]);
  });
});

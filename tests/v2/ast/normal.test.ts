import { parse } from "@/v2/dsl/parse";
import { ASTNode, NormalNode } from "@/v2/dsl/types";
import { describe, expect, it } from "vitest";

describe("AST Builder - normal mode", () => {
  it("should build AST from single var set", () => {
    const ast = parse(`set:x->10`);
    expect(ast).toEqual([
      {
        group: null,
        command: "set",
        reference: "x",
        target: { type: "literal", value: "10" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "set:x->10;",
      },
    ]);
  });

  it("should build AST from single var set with no target", () => {
    const ast = parse(`set:x`);
    expect(ast).toEqual([
      {
        group: null,
        command: "set",
        reference: "x",
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        target: null,
        input: "set:x;",
      },
    ]);
  });

  it("should build AST from single var set with no target but with arguments", () => {
    const ast = parse(`set:x|'hello'`);
    expect(ast).toEqual([
      {
        group: null,
        command: "set",
        reference: "x",
        commandArgs: {
          positional: ["hello"],
          named: {},
        },
        type: "normal",
        target: null,
        input: "set:x|'hello;",
      },
    ]);
  });

  it("should build AST from single var set with no a literal target with cast", () => {
    const ast = parse(`set:x->'hello'(string)`);
    expect(ast).toEqual([
      {
        group: null,
        command: "set",
        reference: "x",
        target: {
          type: "literal",
          value: "hello",
          cast: "string",
        },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "set:x->'hello'(string)",
      },
    ]);
  });

  it("should build AST from single var set with no a literal target", () => {
    const ast = parse(`set:x->'hello'`);
    expect(ast).toEqual([
      {
        group: null,
        command: "set",
        reference: "x",
        target: {
          type: "literal",
          value: "hello",
        },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "set:x->'hello';",
      },
    ]);
  });

  it("should build AST from multiple var sets with casts", () => {
    const ast = parse(`state.set:x->45(number);fn.set:y->user.id(string)`);

    expect(ast).toEqual([
      {
        group: "state",
        command: "set",
        reference: "x",
        target: { type: "literal", value: "45", cast: "number" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "state.set:x->45(number);",
      },
      {
        group: "fn",
        command: "set",
        reference: "y",
        target: { type: "reference", value: "user.id", cast: "string" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "fn.set:y->user.id(string);",
      },
    ]);
  });

  it("should build AST from boolean var sets", () => {
    const ast = parse(`set:ready->true(bool);set:active->false(bool)`);

    expect(ast).toEqual([
      {
        group: null,
        command: "set",
        reference: "ready",
        target: { type: "literal", value: "true", cast: "bool" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "set:ready->true(bool);",
      },
      {
        group: null,
        command: "set",
        reference: "active",
        target: { type: "literal", value: "false", cast: "bool" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "set:active->false(bool);",
      },
    ]);
  });

  it("should ignore malformed var command", () => {
    const ast = parse(`set:x 45(number)`); // no ->
    expect(ast).toEqual([]);
  });

  it("should parse magic alpine property as reference", () => {
    const ast = parse(`set:$store.user.age->45(number)`); // no ->
    expect(ast).toEqual([
      {
        group: null,
        command: "set",
        reference: "$store.user.age",
        target: {
          value: "45",
          cast: "number",
          type: "literal",
        },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "set:$store.user.age->45(number);",
      },
    ]);
  });

  it("should parse a number as a named attribute", () => {
    const ast = parse(`set:$store.user.age->45(number)|10='red'`); // no ->
    expect(ast).toEqual<ASTNode[]>([
      {
        group: null,
        command: "set",
        reference: "$store.user.age",
        target: {
          value: "45",
          cast: "number",
          type: "literal",
        },
        commandArgs: {
          positional: [],
          named: {
            "10": {
              value: "red",
              escaped: false,
              otherValues: {
                value: [],
                escaped: [],
              },
              escapedValue: null,
            },
          },
        },
        type: "normal",
        input: "set:$store.user.age->45(number)|10='red';",
      },
    ]);
  });

  it("should parse command specific arguments from any command independent of position in text", () => {
    const ast = parse(
      `toggle:toggleClass;classtoggle:toggleclass|'success','warning',value='foo';log:$_.ui.classToggle`
    );

    expect(ast).toEqual([
      {
        group: null,
        command: "toggle",
        reference: "toggleClass",
        target: null,
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "toggle:toggleClass;",
      },

      {
        group: null,
        command: "classtoggle",
        reference: "toggleclass",
        target: null,
        commandArgs: {
          positional: ["success", "warning"],
          named: {
            value: {
              value: "foo",
              escaped: false,
              escapedValue: null,
              otherValues: {
                escaped: [],
                value: [],
              },
            },
          },
        },
        type: "normal",
        input: "classtoggle:toggleclass|'success','warning',value='foo';",
      },
      {
        group: null,
        command: "log",
        reference: "$_.ui.classToggle",
        target: null,
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        input: "log:$_.ui.classToggle;",
      },
    ]);
  });
});

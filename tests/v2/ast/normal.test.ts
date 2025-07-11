import { parse } from "@/v2/dsl/parse";
import { describe, expect, it } from "vitest";

describe("AST Builder - normal mode", () => {
  it("should build AST from single var set", () => {
    const ast = parse(`set:x->10`);
    expect(ast).toEqual([
      {
        command: "set",
        reference: "x",
        target: { type: "literal", value: "10" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
      },
    ]);
  });

  it("should build AST from single var set with no target", () => {
    const ast = parse(`set:x`);
    expect(ast).toEqual([
      {
        command: "set",
        reference: "x",
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
        target: null,
      },
    ]);
  });

  it("should build AST from single var set with no target but with arguments", () => {
    const ast = parse(`set:x|'hello'`);
    expect(ast).toEqual([
      {
        command: "set",
        reference: "x",
        commandArgs: {
          positional: ["hello"],
          named: {},
        },
        type: "normal",
        target: null,
      },
    ]);
  });

  it("should build AST from single var set with no a literal target with cast", () => {
    const ast = parse(`set:x->'hello'(string)`);
    expect(ast).toEqual([
      {
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
      },
    ]);
  });

  it("should build AST from single var set with no a literal target", () => {
    const ast = parse(`set:x->'hello'`);
    expect(ast).toEqual([
      {
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
      },
    ]);
  });

  it("should build AST from multiple var sets with casts", () => {
    const ast = parse(`set:x->45(number);set:y->user.id(string)`);

    expect(ast).toEqual([
      {
        command: "set",
        reference: "x",
        target: { type: "literal", value: "45", cast: "number" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
      },
      {
        command: "set",
        reference: "y",
        target: { type: "reference", value: "user.id", cast: "string" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
      },
    ]);
  });

  it("should build AST from boolean var sets", () => {
    const ast = parse(`set:ready->true(bool);set:active->false(bool)`);

    expect(ast).toEqual([
      {
        command: "set",
        reference: "ready",
        target: { type: "literal", value: "true", cast: "bool" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
      },
      {
        command: "set",
        reference: "active",
        target: { type: "literal", value: "false", cast: "bool" },
        commandArgs: {
          positional: [],
          named: {},
        },
        type: "normal",
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
      },
    ]);
  });
});

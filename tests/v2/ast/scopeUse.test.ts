import { buildScopeUseAST } from "@/v2/dsl/ast/scopeUse";
import { parse } from "@/v2/dsl/parse";
import { tokenize } from "@/v2/dsl/tokenizer/tokenize";
import { describe, it, expect } from "vitest";

function parseScope(input: string) {
  const tokens = tokenize(input);
  return buildScopeUseAST(tokens);
}

describe("AST Builder - scope_use mode", () => {
  it("should build AST from @use command with no args", () => {
    const ast = parse(`@use.alert`);
    expect(ast).toEqual([
      {
        type: "scope_use",
        command: "alert",
        commandArgs: {
          positional: [],
          named: {},
        },
      },
    ]);
  });

  it("should build AST with named args after pipe", () => {
    const ast = parse(`@use.validate|silent='true',show='false'`);
    expect(ast).toEqual([
      {
        type: "scope_use",
        command: "validate",
        commandArgs: {
          positional: [],
          named: {
            silent: {
              value: "true",
              escaped: false,
              escapedValue: null,
              otherValues: { value: [], escaped: [] },
            },
            show: {
              value: "false",
              escaped: false,
              escapedValue: null,
              otherValues: { value: [], escaped: [] },
            },
          },
        },
      },
    ]);
  });

  it("should ignore non-scope_use tokens", () => {
    const ast = parseScope(`set:x->5`);
    expect(ast).toEqual([]);
  });

  it("should skip malformed @use entries", () => {
    const ast = parse(`@use.`);
    expect(ast).toEqual([]);
  });

  it("should parse escaped args properly", () => {
    const ast = parse(`@use.greet|\\note='hi',flag='true'`);

    expect(ast[0].commandArgs.named).toHaveProperty("note");
    expect(ast[0].commandArgs.named).toHaveProperty("flag");
  });
});

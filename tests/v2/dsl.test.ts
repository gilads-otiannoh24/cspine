import { tokenize, parse } from "@/v2/dsl";
import { describe, it, expect } from "vitest";

describe("Tokenizer", () => {
  it("should tokenize basic set command with literal", () => {
    const tokens = tokenize(`set:x->10`);
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize casted literals and references", () => {
    const tokens = tokenize(`set:x->45(number);set:y->user.id(string)`);
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize booleans and casts", () => {
    const tokens = tokenize(`set:ready->true(bool);set:flag->false(bool)`);
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize simple function call with no cast", () => {
    const tokens = tokenize(`log("debug")`);
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize function call with mixed arguments", () => {
    const tokens = tokenize(
      `alert("Welcome"(string), user.id(string), 3000(number))`
    );
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize multiple calls separated by semicolon", () => {
    const tokens = tokenize(
      `show("Saved!"(string));refresh();log("done"(string))`
    );
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize reference chaining with @scope", () => {
    const tokens = tokenize(`set:@this.user.age->30(number)`);
    expect(tokens).toMatchSnapshot();
  });
});

describe("AST Builder - var mode", () => {
  it("should build AST from single var set", () => {
    const ast = parse(`set:x->10`, "var");
    expect(ast).toEqual([
      {
        command: "set",
        reference: "x",
        target: { type: "literal", value: "10" },
      },
    ]);
  });

  it("should build AST from multiple var sets with casts", () => {
    const ast = parse(`set:x->45(number);set:y->user.id(string)`, "var");
    expect(ast).toEqual([
      {
        command: "set",
        reference: "x",
        target: { type: "literal", value: "45", cast: "number" },
      },
      {
        command: "set",
        reference: "y",
        target: { type: "reference", value: "user.id", cast: "string" },
      },
    ]);
  });

  it("should build AST from boolean var sets", () => {
    const ast = parse(`set:ready->true(bool);set:active->false(bool)`, "var");

    expect(ast).toEqual([
      {
        command: "set",
        reference: "ready",
        target: { type: "literal", value: "true", cast: "bool" },
      },
      {
        command: "set",
        reference: "active",
        target: { type: "literal", value: "false", cast: "bool" },
      },
    ]);
  });

  it("should ignore malformed var command", () => {
    const ast = parse(`set:x 45(number)`, "var"); // no ->
    expect(ast).toEqual([]);
  });
});

describe("AST Builder - call mode", () => {
  it("should build AST from single call with casted args", () => {
    const ast = parse(`notify("Saved!"(string), 3000(number))`, "call");

    console.log(tokenize(`notify("Saved!"(string), 3000(number))`));

    expect(ast).toEqual([
      {
        type: "call",
        name: "notify",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
      },
    ]);
  });

  it("should build AST from multiple calls", () => {
    const input = `notify("Saved!"(string), 3000(number)); update(user.id(string), true(bool))`;
    const ast = parse(input, "call");

    expect(ast).toEqual([
      {
        type: "call",
        name: "notify",
        args: [
          { value: { type: "literal", value: "Saved!", cast: "string" } },
          { value: { type: "literal", value: "3000", cast: "number" } },
        ],
      },
      {
        type: "call",
        name: "update",
        args: [
          { value: { type: "reference", value: "user.id", cast: "string" } },
          { value: { type: "literal", value: "true", cast: "bool" } },
        ],
      },
    ]);
  });

  it("should build AST for call with no args", () => {
    const ast = parse(`refresh()`, "call");
    expect(ast).toEqual([
      {
        type: "call",
        name: "refresh",
        args: [],
      },
    ]);
  });

  it("should handle call with mixed args (literal, reference, boolean)", () => {
    const ast = parse(
      `example("test"(string), user.data(json), true(bool))`,
      "call"
    );
    expect(ast).toEqual([
      {
        type: "call",
        name: "example",
        args: [
          { value: { type: "literal", value: "test", cast: "string" } },
          { value: { type: "reference", value: "user.data", cast: "json" } },
          { value: { type: "literal", value: "true", cast: "bool" } },
        ],
      },
    ]);
  });

  it("should ignore malformed calls", () => {
    const ast = parse(`notify "Saved!"(string), 3000(number)`, "call"); // no ()
    expect(ast).toEqual([]);
  });
});

import { tokenizeScope, tokenizeArgs } from "@/v2/dsl/tokenizer/scope";
import { describe, it, expect } from "vitest";

describe("tokenizeScope", () => {
  it("should tokenize all blocks correctly", () => {
    const input = `
      commands:
        greet := alert("Hi"(string));
        validate := form.validate:email->#err(string)|silent=true;

      args:
        form.validate := silent=true, errorTarget="#input-error";
        alert := type="success";

      groups:
        form := errorTarget="#form-errors";
        alert := duration=3000;
    `;

    const result = tokenizeScope(input);

    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].name).toBe("greet");
    expect(result.commands[1].name).toBe("validate");

    expect(result.args).toHaveLength(2);
    expect(result.args[0].name).toBe("form.validate");
    expect(result.args[1].tokens[0]).toMatchObject({
      key: "type",
      value: "success",
    });

    expect(result.groups).toHaveLength(2);
    expect(result.groups[0].name).toBe("form");
    expect(result.groups[1].tokens[0]).toMatchObject({
      key: "duration",
      value: 3000,
    });
  });

  it("should ignore comments and blank lines", () => {
    const input = `
      // comment
      commands:
      // another comment
        a := alert("Hello");

      args:

        alert := duration=2000;
    `;

    const result = tokenizeScope(input);
    expect(result.commands).toHaveLength(1);
    expect(result.args).toHaveLength(1);
  });

  it("should skip malformed lines without :=", () => {
    const input = `
      commands:
        brokenLine
      args:
        key := value=123;
    `;
    const result = tokenizeScope(input);
    expect(result.commands).toHaveLength(0);
    expect(result.args).toHaveLength(1);
  });

  it("should skip entries outside known blocks", () => {
    const input = `
      somethingElse:
        test := alert("Oops");

      commands:
        a := alert("This one counts");
    `;
    const result = tokenizeScope(input);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].name).toBe("a");
  });

  it("should handle inline comments after code", () => {
    const input = `
      args:
        test := value=123 // this is ignored
    `;
    const result = tokenizeScope(input);
    expect(
      result.args[0].tokens[0].type === "named_arg"
        ? result.args[0].tokens[0].key
        : ""
    ).toBe("value");
  });
});

describe("tokenizeArgs", () => {
  it("should tokenize key-value pairs with strings, numbers, booleans", () => {
    const input = "name=\"John\", age=30, active=true, role='admin'";
    const result = tokenizeArgs(input);

    expect(result).toContainEqual({
      type: "named_arg",
      key: "name",
      value: "John",
      escaped: false,
      otherValues: [],
    });

    expect(result).toContainEqual({
      type: "named_arg",
      key: "age",
      value: 30,
      escaped: false,
      otherValues: [],
    });

    expect(result).toContainEqual({
      type: "named_arg",
      key: "active",
      value: true,
      escaped: false,
      otherValues: [],
    });

    expect(result).toContainEqual({
      type: "named_arg",
      key: "role",
      value: "admin",
      escaped: false,
      otherValues: [],
    });
  });

  it("should return empty array on completely invalid input", () => {
    const input = "badkey value= 123 , =empty, not=closed';";
    const result = tokenizeArgs(input);

    expect(result.length).toBe(0);
  });

  it("should skip malformed args and parse the rest", () => {
    const input = "valid=1, nope, another='yes'";
    const result = tokenizeArgs(input);
    expect(result.length).toBe(2);
    expect(result[0].type === "named_arg" ? result[0].key : "").toBe("valid");
    expect(result[1].type === "named_arg" ? result[1].key : "").toBe("another");
  });
});

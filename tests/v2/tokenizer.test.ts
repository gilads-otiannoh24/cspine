import { tokenize } from "@/v2/dsl/tokenizer";
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
    const tokens = tokenize(
      `set:ready->true(bool)|'user',option='foo';set:flag->false(bool)`
    );
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

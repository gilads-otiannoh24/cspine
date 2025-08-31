import { tokenize } from "@/v2/dsl/tokenizer/tokenize";
import { describe, it, expect } from "vitest";

describe("Tokenizer", () => {
  it("should tokenize basic set command with literal", () => {
    const tokens = tokenize(`set:x->10`);
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize casted literals and references", () => {
    const tokens = tokenize(`state.set:x->45(number);set:y->user.id(string)`);
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize booleans and casts", () => {
    const tokens = tokenize(
      `set:ready->true(bool)|'user',option='foo,operator,name.id';set:flag->false(bool)`
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

  it("should tokenize @use scope reference", () => {
    const tokens = tokenize(
      `@use.set|silent=true;alert("Welcome"(string), user.id(string), 3000(number))`
    );
    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize an array access as a target", () => {
    const tokens = tokenize(`state.set:user.name->name[0](string)`);

    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize an array access (of type string) as a target", () => {
    const tokens = tokenize(`state.set:user.name->name['id'](string)`);

    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize an array access (of type string without quotes) as a target", () => {
    const tokens = tokenize(`state.set:user.name->name[id](string)`);

    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize an array access as a reference", () => {
    const tokens = tokenize(`state.set:user.name[0]->name`);

    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize an array access (of type string) as a reference", () => {
    const tokens = tokenize(`state.set:user.name['id']->name`);

    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize an array access (of type string without quotes) as a reference", () => {
    const tokens = tokenize(`state.set:user.name[id]->name`);

    expect(tokens).toMatchSnapshot();
  });

  it("should tokenize an array access (with deep nesting) as a reference", () => {
    const tokens = tokenize(`state.set:user.name['id'][0].friends[0].id->name`);

    expect(tokens).toMatchSnapshot();
  });

  it("should call function with the arguments (without dot operator) as reference unless quoted", () => {
    const tokens = tokenize(`fn(name)`, true);

    expect(tokens).toMatchSnapshot();
  });

  it("should call function with the arguments (without dot operator) as reference unless quoted", () => {
    const tokens = tokenize(`fn(name(string))`);

    expect(tokens).toMatchSnapshot();
  });
});

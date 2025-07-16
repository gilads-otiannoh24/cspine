// tests/buildScopeAST.test.ts

import { parseScope } from "@/v2/dsl/parse";
import { describe, it, expect } from "vitest";

const sampleInput = `
  commands:
    greet := alert("Hello!"(string));
    validate := form.validate:email->error(string)|silent=true;

  args:
    form.validate := silent=true, errorTarget="err-zone";
    alert := type="info";

  groups:
    form := layout="stacked";
    alert := duration=5000;
`;

describe("buildScopeAST", () => {
  it("should build a correct AST structure from scope tokens", () => {
    const ast = parseScope(sampleInput);

    expect(ast).toHaveProperty("commands");
    expect(ast).toHaveProperty("args");
    expect(ast).toHaveProperty("groups");

    expect(Object.keys(ast.commands)).toContain("greet");
    expect(Object.keys(ast.commands)).toContain("validate");

    expect(ast.args["form.validate"].silent.value).toBe(true);
    expect(ast.args["form.validate"].errorTarget.value).toBe("err-zone");

    expect(ast.groups["alert"].duration.value).toBe(5000);
    expect(ast.groups["form"].layout.value).toBe("stacked");
  });

  it("should return empty AST when input is empty", () => {
    const ast = parseScope("");
    expect(ast.commands).toEqual({});
    expect(ast.args).toEqual({});
    expect(ast.groups).toEqual({});
  });

  it("should handle malformed input gracefully", () => {
    const input = `
      commands:
        bad :=

      args:
        broken := wrong

      groups:
        g := good=true
    `;
    const ast = parseScope(input);

    expect(ast.commands).toEqual({});
    expect(ast.args.broken).toEqual({});
    expect(ast.groups.g.good.value).toBe(true);
  });

  it("should skip unknown blocks and still parse known ones", () => {
    const input = `
      nonsense:
        x := y

      args:
        one := truth=true
    `;
    const ast = parseScope(input);

    expect(ast.args.one.truth.value).toBe(true);
    expect(ast.commands).toEqual({});
    expect(ast.groups).toEqual({});
  });

  it("should normalize and trim key names in all sections", () => {
    const input = `
      args:
        spaced.key :=   value = "  trimmed  "
      groups:
        padded := extra =   42
    `;
    const ast = parseScope(input);

    expect(ast.args["spaced.key"].value.value).toBe("  trimmed  ");
    expect(ast.groups["padded"].extra.value).toBe(42);
  });
});

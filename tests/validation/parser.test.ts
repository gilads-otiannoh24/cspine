import { parseValidationRules } from "@/groups/form/validation/parser";
import { describe, it, expect } from "vitest";
import { ZodError } from "zod";

describe("parseValidationRules", () => {
  it("parses required rule", () => {
    const schema = parseValidationRules("required");

    expect(() => schema.parse("")).toThrowError(ZodError);
    expect(schema.parse("hello")).toBe("hello");
  });

  it("parses min rule", () => {
    const schema = parseValidationRules("min:3");

    expect(() => schema.parse("hi")).toThrowError(ZodError);
    expect(schema.parse("hello")).toBe("hello");
  });

  it("parses max rule", () => {
    const schema = parseValidationRules("max:5");

    expect(schema.parse("hey")).toBe("hey");
    expect(() => schema.parse("toolong")).toThrowError(ZodError);
  });

  it("parses email rule", () => {
    const schema = parseValidationRules("email");

    expect(schema.parse("me@you.com")).toBe("me@you.com");
    expect(() => schema.parse("invalid")).toThrowError(ZodError);
  });

  it("parses multiple combined rules", () => {
    const schema = parseValidationRules("required,min:3,max:6");

    expect(() => schema.parse("")).toThrowError(ZodError); // required
    expect(() => schema.parse("hi")).toThrowError(ZodError); // min
    expect(() => schema.parse("toolong")).toThrowError(ZodError); // max
    expect(schema.parse("hello")).toBe("hello"); // ✅
  });

  it("applies custom error messages", () => {
    const schema = parseValidationRules("required,email", {
      required: "Field is mandatory",
      email: "Please provide a valid email",
    });

    try {
      schema.parse("");
    } catch (e) {
      expect((e as ZodError).issues[0].message).toBe("Field is mandatory");
    }

    try {
      schema.parse("invalid");
    } catch (e) {
      expect((e as ZodError).issues[0].message).toBe(
        "Please provide a valid email"
      );
    }
  });

  it("ignores unknown rules and continues", () => {
    const schema = parseValidationRules("required,unknown,min:3");

    expect(schema.parse("hii")).toBe("hii");
    expect(() => schema.parse("")).toThrowError(ZodError);
  });

  it("handles empty rule strings safely", () => {
    const schema = parseValidationRules("");

    expect(schema.parse("anything")).toBe("anything");
  });

  it("handles startsWith and endsWith", () => {
    const schema = parseValidationRules("startsWith:hello,endsWith:world");

    expect(schema.parse("hello world")).toBe("hello world");
    expect(() => schema.parse("goodbye world")).toThrowError();
    expect(() => schema.parse("hello there")).toThrowError();
  });

  it("handles regex rule", () => {
    const schema = parseValidationRules("regex:^\\d+$");

    expect(schema.parse("12345")).toBe("12345");
    expect(() => schema.parse("abc123")).toThrowError();
  });
});

describe("parseValidationRules - Edge Cases", () => {
  it("returns default schema for empty rule string", () => {
    const schema = parseValidationRules("");
    expect(schema.parse("any")).toBe("any");
  });

  it("handles whitespace around rule string", () => {
    const schema = parseValidationRules("   required  ,  min:3  ");
    expect(() => schema.parse("")).toThrowError();
    expect(schema.parse("abc")).toBe("abc");
  });

  it("ignores unknown or unsupported rules", () => {
    const schema = parseValidationRules("required,foo,bar,baz,min:2");
    expect(schema.parse("hi")).toBe("hi");
    expect(() => schema.parse("")).toThrowError(); // should still fail "required"
  });

  it("handles missing values in param rules like min:", () => {
    const schema = parseValidationRules("min:");
    expect(schema.parse("anything")).toBe("anything"); // fallback – skip broken rule
  });

  it("handles non-numeric values in numeric param rules", () => {
    const schema = parseValidationRules("min:abc");
    expect(schema.parse("value")).toBe("value");
  });

  it("handles duplicate rules gracefully", () => {
    const schema = parseValidationRules("required,required,min:2,min:2");
    expect(() => schema.parse("")).toThrowError();
    expect(schema.parse("ab")).toBe("ab");
  });

  it("handles malformed custom messages safely", () => {
    const schema = parseValidationRules("required,min:2", {
      required: undefined as any,
      min: null as any,
    });

    expect(() => schema.parse("")).toThrowError();
    expect(schema.parse("abc")).toBe("abc");
  });

  it("handles empty or invalid regex rule", () => {
    const schema1 = parseValidationRules("regex:");
    expect(schema1.parse("abc")).toBe("abc");

    const schema2 = parseValidationRules("regex:("); // invalid regex
    expect(schema2.parse("abc")).toBe("abc");
  });

  it("handles trailing commas", () => {
    const schema = parseValidationRules("required,min:3,");
    expect(() => schema.parse("hi")).toThrowError();
    expect(schema.parse("yes")).toBe("yes");
  });

  it("handles colons in wrong place", () => {
    const schema = parseValidationRules("required::true");
    expect(schema.parse("something")).toBe("something");
  });
});

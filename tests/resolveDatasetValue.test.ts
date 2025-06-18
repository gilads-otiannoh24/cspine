import { resolveDatasetValue } from "@/utils/resolveDatasetValue";
import { describe, expect, test } from "vitest";

describe("resolveDatasetValue", () => {
  test("should resolve and cast values correctly", () => {
    const dataset = {
      value: "fn1:1,fn2:true,fn3:name",
      cast: "value=fn1:number,fn2:boolean,fn3:string",
      var: "fn1:user.age,fn2:user.verified,fn3:user.name",
    };

    expect(resolveDatasetValue(dataset, "fn1", "value")).toBe(1);
    expect(resolveDatasetValue(dataset, "fn2", "value")).toBe(true);
    expect(resolveDatasetValue(dataset, "fn3", "value")).toBe("name");
  });

  test("should fallback to string if no cast is provided", () => {
    const dataset = {
      value: "fn1:42",
    };
    expect(resolveDatasetValue(dataset, "fn1", "value")).toBe("42");
  });

  test("should support default mappings", () => {
    const dataset = {
      value: "hello",
      cast: "value=string",
    };

    expect(resolveDatasetValue(dataset, "anyFn", "value")[0]).toBe("hello");
  });

  test("should be able to access global variables even if it has its own variables set in the datasets", () => {
    const dataset = {
      value: "true",
      cast: "value=boolean",
      var: "show",
    };

    expect(resolveDatasetValue(dataset, "default", "var")[0]).toBe("show");
  });
});

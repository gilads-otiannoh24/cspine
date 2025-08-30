import { z } from "zod";

export type RuleDefinition = {
  handler: (schema: z.ZodType, param?: string) => z.ZodType;
  message?: string;
};

export const ruleMap: Record<string, RuleDefinition> = {
  required: {
    handler: (schema: any) => schema.nonempty("This field is required"),
    message: "This field is required",
  },
  email: {
    handler: (schema: any) =>
      schema.email("Please enter a valid email address"),
    message: "Please enter a valid email address",
  },
  min: {
    handler: (schema: any, param = "1") => {
      const length = Number(param);
      return schema.min(length, `Minimum length is ${length}`);
    },
    message: "Minimum length not met",
  },
  max: {
    handler: (schema: any, param = "255") => {
      const length = Number(param);
      return schema.max(length, `Maximum length is ${length}`);
    },
    message: "Maximum length exceeded",
  },
  startsWith: {
    handler: (schema: any, param = "") =>
      schema.startsWith(param, `Must start with "${param}"`),
    message: "Value does not start with required prefix",
  },
  endsWith: {
    handler: (schema: any, param = "") =>
      schema.endsWith(param, `Must end with "${param}"`),
    message: "Value does not end with required suffix",
  },
  url: {
    handler: (schema: any) => schema.url("Please enter a valid URL"),
    message: "Invalid URL",
  },
  regex: {
    handler: (schema: any, param = "") =>
      schema.regex(new RegExp(param), `Does not match pattern: ${param}`),
    message: "Pattern mismatch",
  },
  length: {
    handler: (schema: any, param = "1") => {
      const len = Number(param);
      return schema.length(len, `Must be exactly ${len} characters long`);
    },
    message: "Incorrect length",
  },
  includes: {
    handler: (schema: any, param = "") =>
      schema.includes(param, { message: `Must include "${param}"` }),
    message: "Missing required substring",
  },
  excludes: {
    handler: (schema: any, param = "") =>
      schema.refine((val: string) => !val.includes(param), {
        message: `Must not include "${param}"`,
      }),
    message: "Contains forbidden substring",
  },
};

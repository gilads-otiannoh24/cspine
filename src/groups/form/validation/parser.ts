import { z, ZodType, ZodTypeAny } from "zod";
import { ruleMap } from "./validationPresets";

export type CustomMessages = Record<string, string>;

export function parseValidationRules(
  ruleString: string,
  customMessages?: CustomMessages
): ZodTypeAny {
  const rules = ruleString
    .split(",")
    .map((rule) => rule.trim())
    .filter(Boolean);

  let schema: ZodTypeAny = z.string();

  for (const rule of rules) {
    const [rawKey, ...paramParts] = rule.split(":");
    const key = rawKey.trim();
    const param = paramParts.join(":").trim(); // allow regex:/abc/

    const definition = ruleMap[key];

    if (key === "min" || key === "max") {
      const num = Number(param);
      if (Number.isNaN(num)) continue; // 👈 Skip invalid
    }

    if (key === "regex") {
      try {
        new RegExp(param);
      } catch {
        continue; // 👈 Silently skip broken regex
      }
    }

    if (!definition) {
      console.warn(`Validation rule "${key}" not found.`);
      continue;
    }

    // Custom message overrides
    const overrideMessage = customMessages?.[key];

    const customHandler =
      overrideMessage && typeof definition.handler === "function"
        ? (schema: ZodTypeAny) => {
            // try to inject custom message if param exists
            try {
              if (
                [
                  "min",
                  "max",
                  "startsWith",
                  "endsWith",
                  "regex",
                  "length",
                  "includes",
                  "excludes",
                ].includes(key)
              ) {
                return definition
                  .handler(schema, param)
                  .refine(() => true, { message: overrideMessage });
              }
              return schema.refine(() => true, { message: overrideMessage });
            } catch {
              return definition.handler(schema, param);
            }
          }
        : definition.handler;

    schema = customHandler(schema, param);
  }

  return schema;
}

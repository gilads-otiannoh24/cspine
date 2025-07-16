import { Options } from "@/CSPine";

export function resolveContextRefs(value: any, options: Options) {
  if (typeof value !== "string") return value;
  if (!value.startsWith("@ctx.")) return value;

  const path = value.slice(5).split(".");
  return path.reduce((acc, key) => (acc as any)?.[key], {
    event: options.e,
    this: options.this,
    evaluate: options.evaluate,
    config: options.config,
  });
}

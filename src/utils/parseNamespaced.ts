import { Options } from "@/CSPine";

export function parseNamespaced(
  input: string,
  options?: Partial<Options>
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};
  const pairs = input.split(",");
  for (const pair of pairs) {
    const [namespace, value] = pair.split(":");
    if (namespace && value !== undefined) {
      result[namespace.trim()] = value.trim();
    } else {
      if (result["default"] === undefined) {
        result["default"] = [pair.trim()];
      } else {
        (result["default"] as string[]).push(pair.trim());
      }
    }
  }
  return result;
}

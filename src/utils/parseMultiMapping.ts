export function parseMultiMapping(
  input: string
): Record<string, Record<string, string | string[]>> {
  const result: Record<string, Record<string, string | string[]>> = {};
  const sections = input.split(";");
  for (const section of sections) {
    const [key, mappings] = section.split("=");
    if (!key || !mappings) continue;
    const mapObj: Record<string, string | string[]> = {};
    mappings.split(",").forEach((pair) => {
      const [namespace, value] = pair.split(":");
      if (namespace && value !== undefined) {
        mapObj[namespace.trim()] = value.trim();
      } else {
        if (mapObj["default"] === undefined) {
          mapObj["default"] = [pair.trim()];
        } else {
          (mapObj["default"] as string[]).push(pair.trim());
        }
      }
    });
    result[key.trim()] = mapObj;
  }
  return result;
}

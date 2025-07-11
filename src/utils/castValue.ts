export function castValue(value: any, type: string): any {
  switch (type.toLowerCase()) {
    case "number":
      return Number(value);
    case "boolean":
      return value === "true";
    case "string":
      return String(value);
    case "null":
      return null;
    case "true":
      return true;
    case "false":
      return false;
    case "array":
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return value.split(",").map((item: string) => item.trim());
      }
    case "object":
      try {
        return JSON.parse(value);
      } catch {
        return { value };
      }
    default:
      return value;
  }
}

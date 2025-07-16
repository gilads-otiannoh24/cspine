export type BinaryOperator =
  | "=="
  | "==="
  | "!="
  | "!=="
  | ">"
  | ">="
  | "<"
  | "<="
  | "&&"
  | "||"
  | "+"
  | "-"
  | "*"
  | "/"
  | "%";

export function resolveOperator(
  operator: BinaryOperator,
  left: any,
  right: any
): boolean {
  switch (operator) {
    case "==":
      return left == right;
    case "===":
      return left === right;
    case "!=":
      return left != right;
    case "!==":
      return left !== right;
    case ">":
      return left > right;
    case ">=":
      return left >= right;
    case "<":
      return left < right;
    case "<=":
      return left <= right;
    case "&&":
      return Boolean(left) && Boolean(right);
    case "||":
      return Boolean(left) || Boolean(right);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

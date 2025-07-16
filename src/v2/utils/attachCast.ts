import { Token } from "../dsl/tokenizer/tokenize";
import { ValueNode } from "../dsl/types";

export function attachCast(
  node: ValueNode,
  tokens: Token[],
  i: number
): [ValueNode, number] {
  const token = tokens[i];
  if (token?.type === "cast") {
    node.cast = token.value;
    i++;
  }
  return [node, i];
}

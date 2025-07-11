import { buildAST } from "./ast/build";
import { tokenize } from "./tokenizer";

type Log = {
  tokenizer: boolean;
  ast: boolean;
};

export function parse(
  input: string,
  log: Log = { tokenizer: false, ast: false }
) {
  const tokens = tokenize(input, log.tokenizer);
  if (log.tokenizer) console.log(tokens);

  const ast = buildAST(tokens, log.ast);
  if (log.ast) console.log(ast);

  return ast;
}

import { tokenize } from "./tokenizer/tokenize";
import { buildAST } from "./ast/build";
import { tokenizeScope } from "./tokenizer/scope";
import { buildScopeAST } from "./ast/scope";

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

export function parseScope(
  input: string,
  log: Log = { tokenizer: false, ast: false }
) {
  const tokens = tokenizeScope(input, log.tokenizer);

  if (log.tokenizer) console.log("Tokens: ", tokens);

  const ast = buildScopeAST(tokens, log.ast);

  if (log.ast) console.log("AST: ", ast);

  return ast;
}

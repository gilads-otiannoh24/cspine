import { ScopeToken, tokenizeScope } from "@/v2/dsl/tokenizer/scope";
import { Token } from "@/v2/dsl/tokenizer/tokenize";
import { ASTNode, CommandArgs } from "../types";
import { buildAST } from "./build";

export interface ScopeAST {
  commands: Record<string, ASTNode[]>;
  args: Record<string, CommandArgs["named"]>;
  groups: Record<string, CommandArgs["named"]>;
}

export function buildScopeAST(
  tokens: ScopeToken,
  log: boolean = false
): ScopeAST {
  const ast: ScopeAST = {
    commands: {},
    args: {},
    groups: {},
  };

  for (const { name, tokens: tks } of tokens.commands) {
    ast.commands[name] = buildAST(tks);
  }

  for (const { name, tokens: tks } of tokens.args) {
    ast.args[name] = reduceNamedArgs(tks);
  }

  for (const { name, tokens: tks } of tokens.groups) {
    ast.groups[name] = reduceNamedArgs(tks);
  }

  return ast;
}

function reduceNamedArgs(tokens: Token[]): CommandArgs["named"] {
  const result: CommandArgs["named"] = {};
  for (const token of tokens) {
    if (token.type === "named_arg") {
      const t = result[token.key];
      if (t) {
        if (t.escaped && !token.escaped) {
          t.value = token.value;
          t.otherValues.value = token.otherValues;
        }

        if (!t.escaped && token.escaped) {
          t.escapedValue = token.value;
          t.otherValues.escaped = token.otherValues;
          t.escaped = token.escaped;
        }

        result[token.key] = t;
      } else {
        result[token.key] = {
          value: token.escaped ? null : token.value,
          escaped: token.escaped,
          otherValues: {
            escaped: !token.escaped ? [] : token.otherValues,
            value: token.escaped ? [] : token.otherValues,
          },
          escapedValue: token.escaped ? token.value : null,
        };
      }
    }
  }
  return result;
}

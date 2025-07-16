import { ScopeAST } from "../dsl/ast/scope";
import { ASTNode } from "../dsl/types";
import { CommandArgs } from "../dsl/types";

export interface CSPineResolved {
  ast?: ASTNode[];
  args?: DeepNestArgs | ShallowNestArgs;
}

export type DeepNestArgs = Record<string, CommandArgs["named"]>;
export type ShallowNestArgs = CommandArgs["named"];

export class CSPineTree {
  private registry = new WeakMap<Element, ScopeAST>();

  register(el: Element, ast: ScopeAST) {
    this.registry.set(el, ast);
  }

  getScope(el: Element, single: boolean = false): ScopeAST | null {
    let current: Element | null = el;

    if (single) return this.registry.get(current) ?? null;

    while (current) {
      const scope = this.registry.get(current);
      if (scope) return scope;
      current = current.parentElement;
    }

    return null;
  }

  resolve(
    el: Element,
    name: string,
    type: "command" | "arg" | "group" = "command"
  ): CSPineResolved | null {
    let current: Element | null = el;

    while (current) {
      const scope = this.registry.get(current);

      if (scope) {
        // here the name is an alias of a comand or a group of commands
        if (type === "command" && scope.commands[name]) {
          // get any args for the command
          let argsCurrent: Element | null = el;
          let commandArgs: CSPineResolved["args"] = {};
          const commands: ASTNode[] = scope.commands[name];

          while (argsCurrent) {
            const argsScope = this.registry.get(argsCurrent);

            commands.forEach((c) => {
              const commandWithGroup = getCommandKey(c);

              if (argsScope && argsScope.args[commandWithGroup]) {
                // respect the closest arg found if it already exists
                commandArgs[commandWithGroup] = commandArgs[commandWithGroup]
                  ? commandArgs[commandWithGroup]
                  : argsScope.args[commandWithGroup];
              }
            });

            argsCurrent = argsCurrent.parentElement;
          }

          return {
            ast: commands,
            args: commandArgs,
          };
        }

        // here the name is a command name
        if (type === "arg" && scope.args[name]) {
          return {
            args: scope.args[name],
          };
        }

        // here the name is a group name
        if (type === "group" && scope.groups[name]) {
          return {
            args: scope.groups[name],
          };
        }
      }

      current = current.parentElement;
    }

    return null;
  }
}

function getCommandKey(c: ASTNode): string {
  if (c.type === "normal") {
    return c.group ? `${c.group}.${c.command}` : c.command;
  } else if (c.type === "call") {
    return c.name;
  } else {
    return c.command;
  }
}

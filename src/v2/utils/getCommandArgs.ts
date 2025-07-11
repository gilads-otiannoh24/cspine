import { Token } from "../dsl/tokenizer";
import { CommandArgs } from "../dsl/types";

export function getCommadArgs(tokens: Token[], i: number, args?: CommandArgs) {
  const argToken = tokens[i];
  let commandArgs: CommandArgs = {
    named: {},
    positional: [],
  };

  if (args) commandArgs = args;

  if (["named_arg", "positional_arg"].includes(argToken.type)) {
    if (argToken.type === "named_arg") {
      if (commandArgs.named[argToken.key]) {
        if (commandArgs.named[argToken.key].escaped) {
          if (!argToken.escaped) {
            commandArgs.named[argToken.key].value = argToken.value;
          } else {
            console.warn(
              "You cannot escape an argument more than once.",
              `Key ${argToken.key} with value ${argToken.value} has been ignored`
            );
          }
        } else {
          if (argToken.escaped) {
            commandArgs.named[argToken.key].escapedValue = argToken.value;
            commandArgs.named[argToken.key].escaped = true;
          } else {
            console.warn(
              "Duplicate value detected for argument.",
              `Key ${argToken.key} with value ${argToken.value} has been ignored`
            );
          }
        }
      } else {
        commandArgs.named[argToken.key] = {
          value: !argToken.escaped ? argToken.value : null,
          escaped: argToken.escaped,
          escapedValue: argToken.escaped ? argToken.value : null,
        };
      }
    }

    if (argToken.type === "positional_arg") {
      commandArgs.positional.push(argToken.value);
    }
    i++;
    commandArgs = getCommadArgs(tokens, i, commandArgs).commandArgs;
  }

  return { commandArgs, i };
}

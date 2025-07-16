import { CommandArgs } from "@/v2/dsl/types";
import { resolveContextRefs } from "./resolveContectRefs";
import { Options } from "@/CSPine";

export function buildCommandArgs(
  args: CommandArgs,
  options: Options
): CommandArgs {
  const positional = args.positional;
  const named = args.named;

  args.positional = positional.map((p) => resolveContextRefs(p, options));

  Object.keys(named).forEach((n) => {
    const v = named[n];
    named[n] = {
      ...v,
      value: resolveContextRefs(v.value, options),
      escapedValue: resolveContextRefs(v.escapedValue, options),
      otherValues: {
        value: resolveContextRefs(v.otherValues.value, options),
        escaped: resolveContextRefs(v.otherValues.escaped, options),
      },
    };
  });

  args.named = named;

  return args;
}

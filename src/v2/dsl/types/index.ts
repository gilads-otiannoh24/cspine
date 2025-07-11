export type ASTNode = NormalNode | CallNode;

export interface ValueNode {
  type: "literal" | "reference";
  value: string;
  cast?: string;
}

export interface CallArg {
  value: ValueNode;
}

export interface CallNode {
  type: "call";
  name: string;
  args: CallArg[];
  commandArgs: CommandArgs;
}

export type CommandArgs = {
  positional: string[];
  named: Record<string, { value: any; escaped: boolean; escapedValue: any }>;
};

export type NormalNode = {
  command: string;
  reference: string;
  target: {
    type: "literal" | "reference";
    value: string;
    cast?: string;
  } | null;
  commandArgs: CommandArgs;
  type: "normal";
};

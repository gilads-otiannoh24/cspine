export type ASTNode = {
  input: string;
} & (NormalNode | CallNode | ScopeUseNode);

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
  named: Record<
    string,
    {
      value: any;
      escaped: boolean;
      otherValues: { value: string[]; escaped: string[] };
      escapedValue: any;
    }
  >;
};

export type NormalNode = {
  group: string | null;
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

export type ScopeUseNode = {
  type: "scope_use";
  command: string;
  commandArgs: CommandArgs;
};

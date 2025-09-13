import { Options } from "@/CSPine";
import {
  ASTNode,
  NormalNode,
  CallNode,
  ScopeUseNode,
  CommandArgs,
  ValueNode,
} from "@/v2/dsl/types";

export class ValidationError extends Error {
  constructor(
    message: string,
    public node?: any,
    public element?: HTMLElement
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ValidationWarning extends Error {
  constructor(
    message: string,
    public node?: any,
    public element?: HTMLElement
  ) {
    super(message);
    this.name = "ValidationWarning";
  }
}

export function validateASTNode(node: ASTNode, options: Options): void {
  const element = (options.this as any).$el;

  if (!node || typeof node !== "object") {
    throw new ValidationError("Invalid AST node: not an object", node, element);
  }

  switch (node.type) {
    case "normal":
      validateNormalNode(node as NormalNode, element);
      break;
    case "call":
      validateCallNode(node as CallNode, element);
      break;
    case "scope_use":
      validateScopeUseNode(node as ScopeUseNode, element);
      break;
    default:
      throw new ValidationError(
        `Unknown node type '${(node as any).type}'`,
        node,
        element
      );
  }
}

/**
 * Shared validation for CommandArgs across all nodes
 */
function validateCommandArgs(
  commandArgs: CommandArgs,
  node: ASTNode,
  element: HTMLElement
): void {
  if (!commandArgs || typeof commandArgs !== "object") {
    throw new ValidationError(
      "Missing or invalid commandArgs object",
      node,
      element
    );
  }

  if (
    !("positional" in commandArgs) ||
    !Array.isArray(commandArgs.positional)
  ) {
    throw new ValidationError(
      "commandArgs.positional must be an array",
      node,
      element
    );
  }

  if (!("named" in commandArgs) || typeof commandArgs.named !== "object") {
    throw new ValidationError(
      "commandArgs.named must be an object",
      node,
      element
    );
  }

  // Validate structure of named args
  for (const [key, arg] of Object.entries(commandArgs.named)) {
    if (typeof arg !== "object" || arg === null) {
      throw new ValidationError(
        `commandArgs.named['${key}'] must be an object`,
        node,
        element
      );
    }

    if (!("value" in arg)) {
      throw new ValidationError(
        `Missing 'value' in commandArgs.named['${key}']`,
        node,
        element
      );
    }

    if (!("escaped" in arg)) {
      throw new ValidationError(
        `Missing 'escaped' in commandArgs.named['${key}']`,
        node,
        element
      );
    }

    if (!("otherValues" in arg) || typeof arg.otherValues !== "object") {
      throw new ValidationError(
        `Missing or invalid 'otherValues' in commandArgs.named['${key}']`,
        node,
        element
      );
    }

    if (!("escapedValue" in arg)) {
      throw new ValidationError(
        `Missing 'escapedValue' in commandArgs.named['${key}']`,
        node,
        element
      );
    }
  }
}

function validateNormalNode(node: NormalNode, element: HTMLElement): void {
  if (typeof node.command !== "string") {
    throw new ValidationError(
      "NormalNode missing valid 'command'",
      node,
      element
    );
  }

  if (typeof node.reference !== "string") {
    throw new ValidationError(
      "NormalNode missing valid 'reference'",
      node,
      element
    );
  }

  if (node.target !== null) {
    validateValueNode(node.target, node as ASTNode, element);
  }

  validateCommandArgs(node.commandArgs, node as ASTNode, element);
}

function validateCallNode(node: CallNode, element: HTMLElement): void {
  if (typeof node.name !== "string") {
    throw new ValidationError("CallNode missing valid 'name'", node, element);
  }

  if (!Array.isArray(node.args)) {
    throw new ValidationError(
      "CallNode 'args' must be an array",
      node,
      element
    );
  }

  for (const arg of node.args) {
    if (!arg || typeof arg !== "object" || !("value" in arg)) {
      throw new ValidationError("Invalid CallArg structure", node, element);
    }
    validateValueNode(arg.value, node as ASTNode, element);
  }

  validateCommandArgs(node.commandArgs, node as ASTNode, element);
}

function validateScopeUseNode(node: ScopeUseNode, element: HTMLElement): void {
  if (typeof node.command !== "string") {
    throw new ValidationError(
      "ScopeUseNode missing valid 'command'",
      node,
      element
    );
  }

  validateCommandArgs(node.commandArgs, node as ASTNode, element);
}

function validateValueNode(
  value: ValueNode,
  node: ASTNode,
  element: HTMLElement
): void {
  if (!value || typeof value !== "object") {
    throw new ValidationError("ValueNode must be an object", node, element);
  }

  if (!["literal", "reference"].includes(value.type)) {
    throw new ValidationError(
      "ValueNode type must be 'literal' or 'reference'",
      node,
      element
    );
  }

  if (typeof value.value !== "string") {
    throw new ValidationError(
      "ValueNode value must be a string",
      node,
      element
    );
  }

  if (value.cast !== undefined && typeof value.cast !== "string") {
    throw new ValidationError(
      "ValueNode cast must be a string if defined",
      node,
      element
    );
  }
}

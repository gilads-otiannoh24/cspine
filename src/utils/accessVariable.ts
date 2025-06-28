import { AlpineComponent } from "alpinejs";

export function accessVariable(
  instance: AlpineComponent<any>,
  path: string,
  mode: "set" | "get" = "get",
  valueToSet?: any
): any {
  if (!path) return undefined;

  const parsedPath = parseVariablePath(path);

  const chunks = parsedPath.path.split(".");
  const lastKey = chunks[chunks.length - 1];

  // Traverse to the second-to-last object
  let context = instance;
  for (let i = 0; i < chunks.length - 1; i++) {
    if (context[chunks[i]] === undefined) {
      if (mode === "set") context[chunks[i]] = {}; // create nested path
      else return undefined;
    }
    context = context[chunks[i]];
  }

  if (mode === "get") {
    return parsedPath.isNegated ? !context[lastKey] : context[lastKey];
  } else if (mode === "set") {
    context[lastKey] = valueToSet;
    return valueToSet;
  }

  return undefined;
}

export type PathDetails = {
  isNegated: boolean;
  path: string;
};

export function parseVariablePath(path: string): PathDetails {
  const isNegated /* starts with ! */ = path.startsWith("!");

  return {
    isNegated,
    path: isNegated ? path.slice(1) : path,
  };
}

export function setVariable(
  instance: AlpineComponent<any>,
  path: string,
  value: any
): any {
  return accessVariable(instance, path, "set", value);
}

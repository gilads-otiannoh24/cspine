type ArgumentCheckResult = {
  isReserved: boolean;
  key: string;
  value: string;
  escaped: boolean;
};

const RESERVED_WORDS = new Set(["event", "delay", "scope", "once", "memo"]);

export function checkReservedArgument(arg: string): ArgumentCheckResult | null {
  const match = /^\\?([a-zA-Z_][a-zA-Z0-9_]*)=(['"]?)(.*?)\2$/.exec(arg.trim());

  if (!match) return null;

  const [, rawKey, , rawValue] = match;

  const escaped = arg.startsWith("\\");
  const isReserved = RESERVED_WORDS.has(rawKey);

  return {
    isReserved,
    key: rawKey,
    value: rawValue,
    escaped,
  };
}

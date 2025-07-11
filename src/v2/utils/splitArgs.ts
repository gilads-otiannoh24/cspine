export function splitArgs(input: string): string[] {
  const args: string[] = [];
  let current = "";
  let inQuotes = false;
  let quoteChar = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if ((char === '"' || char === "'") && (!inQuotes || char === quoteChar)) {
      if (inQuotes && char === quoteChar) {
        inQuotes = false;
      } else {
        inQuotes = true;
        quoteChar = char;
      }
      current += char;
    } else if (char === "," && !inQuotes) {
      args.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current) args.push(current.trim());
  return args;
}

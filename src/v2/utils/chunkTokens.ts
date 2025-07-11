import { Token } from "../dsl/tokenizer";

export function chunkTokens(tokens: Token[]): Token[][] {
  const chunks: Token[][] = [];
  let current: Token[] = [];

  for (const token of tokens) {
    if (token.type === "semicolon") {
      // End of current chunk
      current.push({ type: "eof" }); // Add end-of-file marker
      chunks.push(current);
      current = [];
    } else {
      if (token.type !== "eof") {
        current.push(token);
      }
    }
  }

  // If tokens didn't end with an "semicolon" but still have residuals
  if (current.length > 0) {
    current.push({ type: "eof" });
    chunks.push(current);
  }

  return chunks;
}

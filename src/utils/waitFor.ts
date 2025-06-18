export async function waitFor(condition: () => boolean, timeout = 1000) {
  const pollInterval = 20;
  let elapsed = 0;
  while (!condition()) {
    if (elapsed >= timeout) {
      throw new Error("Timeout waiting for condition");
    }
    await new Promise((r) => setTimeout(r, pollInterval));
    elapsed += pollInterval;
  }
}

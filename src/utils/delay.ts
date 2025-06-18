export async function domUpdate(ms: number = 50) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

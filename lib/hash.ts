// Deterministic, decorative pseudo-hash for the ledger aesthetic.
// Not cryptographic — just turns a label into a stable 0x… string.
export function pseudoHash(input: string, length = 8): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = (h1 ^ (h1 >>> 16)) >>> 0;
  h2 = (h2 ^ (h2 >>> 16)) >>> 0;
  const combined = (BigInt(h1) << BigInt(32)) | BigInt(h2);
  const hex = combined.toString(16).padStart(16, "0");
  return `0x${hex.slice(0, length)}…${hex.slice(-4)}`;
}

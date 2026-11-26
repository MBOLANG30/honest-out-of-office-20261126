import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one painfully honest, still polite out-of-office auto-reply.
// It admits the sender needed the break more than the inbox needed them,
// thanks the reader, and promises a reply on return.
const ENTRY =
  "I'm on leave, and between us I needed this break more than my inbox needed me, so thank you for understanding — I'll reply when I return.";

// The gate only accepts 1 to 200 characters, so refuse anything outside it.
// (The winning line is 137 characters, comfortably inside the cap.)
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}

// The entry must be a single line with no surrounding whitespace.
if (ENTRY !== ENTRY.trim() || ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be one line with no leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read it back and refuse to finish unless the file is byte-identical.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the entry text");
}

// Reads ../names.csv and generates src/data.ts with embedded name data.

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = resolve(__dirname, "../../names.csv");
const outPath = resolve(__dirname, "../src/data.ts");

const csv = readFileSync(csvPath, "utf-8");
const rows = csv
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .map((line) => line.split(",").map((name) => name.trim()));

const json = JSON.stringify(rows);

const output = `// Auto-generated from names.csv — do not edit by hand.
// Regenerate with: npm run build:data
export const namesData: string[][] = ${json};
`;

writeFileSync(outPath, output, "utf-8");
console.log(`Generated src/data.ts with ${rows.length} name groups.`);

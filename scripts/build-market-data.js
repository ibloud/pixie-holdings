import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getMarketData, MARKET_SYMBOLS } from "../src/market-data.js";

const output = resolve(process.cwd(), "public/market-data.json");
const symbols = [...MARKET_SYMBOLS];

try {
  const data = await getMarketData(symbols);
  await writeFile(output, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Wrote ${data.quotes.length} reference signals to ${output}`);
} catch (error) {
  const fallback = {
    source: { market: "fmp", macro: "fred" },
    fetchedAt: new Date().toISOString(),
    referenceOnly: true,
    quotes: [],
    error: "External market data is unavailable during this Pages build."
  };
  await writeFile(output, JSON.stringify(fallback, null, 2) + "\n", "utf8");
  console.warn(error?.message || error);
  console.warn(`Wrote an offline market snapshot to ${output}`);
}

const MARKET = {
  SPY: ["market://etf/SPY", "SPY", "etf"],
  QQQ: ["market://etf/QQQ", "QQQ", "etf"],
  SMH: ["market://etf/SMH", "SMH", "etf"],
  NVDA: ["market://equity/NVDA", "NVDA", "equity"],
  XLE: ["market://etf/XLE", "XLE", "etf"],
  EQIX: ["market://equity/EQIX", "EQIX", "equity"],
  DLR: ["market://equity/DLR", "DLR", "equity"],
  BOTZ: ["market://etf/BOTZ", "BOTZ", "etf"],
  "BTC-USD": ["market://crypto/BTC-USD", "BTCUSD", "crypto"],
  "ETH-USD": ["market://crypto/ETH-USD", "ETHUSD", "crypto"]
};

const MACRO = {
  DGS10: ["macro://fred/DGS10", "DGS10", "macro"],
  VIXCLS: ["macro://fred/VIXCLS", "VIXCLS", "macro"]
};

const cache = new Map();

function cached(key, value, ttl = 30000) {
  cache.set(key, { value, expiresAt: Date.now() + ttl });
  return value;
}

function getCached(key) {
  const hit = cache.get(key);
  return hit && hit.expiresAt > Date.now() ? hit.value : null;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "user-agent": "PIXIE-Holdings/0.1" } });
  if (!response.ok) throw new Error(`upstream ${response.status}`);
  return response.json();
}

function requireKey(name) {
  const key = process.env[name];
  if (!key) throw new Error(`${name} is not configured`);
  return key;
}

async function fetchFmp(symbol, id, assetType) {
  const key = requireKey("FMP_API_KEY");
  const url = new URL("https://financialmodelingprep.com/stable/quote");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("apikey", key);
  const payload = await fetchJson(url);
  const quote = Array.isArray(payload) ? payload[0] : null;
  if (!quote || typeof quote.price !== "number") throw new Error(`FMP quote unavailable for ${symbol}`);
  return {
    id, symbol, assetType,
    price: quote.price,
    previousClose: typeof quote.previousClose === "number" ? quote.previousClose : null,
    changePct: typeof quote.changesPercentage === "number" ? quote.changesPercentage / 100 : null,
    currency: quote.currency || "USD",
    marketState: null,
    asOf: quote.timestamp ? new Date(quote.timestamp * 1000).toISOString() : null,
    source: "fmp",
    freshness: "provider-reported",
    referenceOnly: true
  };
}

async function fetchFred(seriesId, id) {
  const key = requireKey("FRED_API_KEY");
  const url = new URL("https://api.stlouisfed.org/fred/series/observations");
  url.searchParams.set("series_id", seriesId);
  url.searchParams.set("api_key", key);
  url.searchParams.set("file_type", "json");
  url.searchParams.set("sort_order", "desc");
  url.searchParams.set("limit", "1");
  const payload = await fetchJson(url);
  const observation = payload?.observations?.find(item => item.value !== ".");
  if (!observation) throw new Error(`FRED observation unavailable for ${seriesId}`);
  const value = Number(observation.value);
  if (!Number.isFinite(value)) throw new Error(`FRED observation invalid for ${seriesId}`);
  return {
    id, symbol: seriesId, assetType: "macro",
    value, price: value,
    previousClose: null, changePct: null,
    currency: seriesId === "DGS10" ? "percent" : null,
    marketState: null,
    asOf: observation.date ? new Date(`${observation.date}T00:00:00Z`).toISOString() : null,
    source: "fred",
    freshness: "observation",
    referenceOnly: true
  };
}

export const MARKET_SYMBOLS = new Set([...Object.keys(MARKET), ...Object.keys(MACRO)]);

export async function getMarketData(symbols) {
  const requested = [...new Set(symbols)].filter(symbol => MARKET_SYMBOLS.has(symbol)).slice(0, 12);
  if (!requested.length) throw new Error("No supported market symbols requested.");

  const results = await Promise.allSettled(requested.map(async symbol => {
    const definition = MARKET[symbol];
    if (definition) {
      const [id, providerSymbol, assetType] = definition;
      const key = `fmp:${providerSymbol}`;
      const hit = getCached(key);
      return hit || cached(key, await fetchFmp(providerSymbol, id, assetType));
    }
    const [id, seriesId] = MACRO[symbol];
    const key = `fred:${seriesId}`;
    const hit = getCached(key);
    return hit || cached(key, await fetchFred(seriesId, id));
  }));

  const quotes = results.filter(result => result.status === "fulfilled").map(result => result.value);
  if (!quotes.length) throw new Error("External market data is temporarily unavailable.");
  return {
    source: { market: "fmp", macro: "fred" },
    fetchedAt: new Date().toISOString(),
    referenceOnly: true,
    quotes
  };
}

import test from "node:test";
import assert from "node:assert/strict";
import { evaluateAllocation, initialLedger, outcomeFor } from "../src/model.js";
import { buildReceipt, RECEIPT_TYPE } from "../src/atproto.js";

test("community pilot increases access and trust while reducing pressure",()=>{
  const result=evaluateAllocation({...initialLedger},"break-the-grid","community-pilot");
  assert.equal(result.ledger.access,53);
  assert.equal(result.ledger.trust,66);
  assert.equal(result.ledger.pressure,13);
});

test("unknown actions fail closed",()=>{
  assert.throws(()=>evaluateAllocation({...initialLedger},"break-the-grid","missing"),/Unknown action/);
});

test("receipt is synthetic and preview-safe",()=>{
  const record=buildReceipt({holding:"Float Works",action:"Originalize",summary:"Replace borrowed identity",createdAt:"2026-09-13T00:00:00.000Z"});
  assert.equal(record.$type,RECEIPT_TYPE);
  assert.equal(record.scenario,"synthetic");
  assert.equal("health" in record,false);
  assert.equal("location" in record,false);
});

test("outcome recognizes a sustainable portfolio",()=>{
  assert.match(outcomeFor({...initialLedger,pressure:20}),/remains solvent/);
});

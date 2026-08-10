import test from "node:test";
import assert from "node:assert/strict";

import { createTransfer } from "../src/transfers.js";
import { replayTransfer } from "../src/reconcile.js";
import { createRedemption } from "../src/redemptions.js";

function stubFetch(capture) {
  globalThis.fetch = async (url, options) => {
    capture.push({ url: String(url), options });
    return { ok: true, status: 202, json: async () => ({ accepted: true }) };
  };
}

test("a transfer is posted to the transfers endpoint", async () => {
  const calls = []; stubFetch(calls);
  await createTransfer({ from: "a", to: "b", amount: 1000, idempotencyKey: "k1" });
  assert.match(calls[0].url, /\/v1\/transfers$/);
  assert.equal(calls[0].options.method, "POST");
});

test("reconciliation replays through the same endpoint", async () => {
  const calls = []; stubFetch(calls);
  assert.equal(await replayTransfer({ id: "t1" }), true);
  assert.match(calls[0].url, /\/v1\/transfers$/);
});

test("a redemption is posted with its own headers", async () => {
  const calls = []; stubFetch(calls);
  await createRedemption({ account: "acc", amount: 500, idempotencyKey: "k2" });
  assert.match(calls[0].url, /\/v1\/redemptions$/);
  assert.equal(calls[0].options.headers["Idempotency-Key"], "k2");
});

test("a failed transfer raises", async () => {
  globalThis.fetch = async () => ({ ok: false, status: 500 });
  await assert.rejects(() => createTransfer({ from: "a", to: "b", amount: 1, idempotencyKey: "k" }));
});

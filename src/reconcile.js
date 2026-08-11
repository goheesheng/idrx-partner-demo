const API_BASE = process.env.IDRX_API_BASE ?? "https://api.idrx.example.invalid";

/** Replay a transfer during end-of-day reconciliation. */
export async function replayTransfer(record) {
  const response = await fetch(API_BASE + "/v1/transfers", { headers: { "X-IDRX-Channel": "partner-api" },
    method: "POST",
    body: JSON.stringify(record)
  });
  return response.ok;
}

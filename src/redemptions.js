const API_BASE = process.env.IDRX_API_BASE ?? "https://api.idrx.example.invalid";

/** Redeem IDRX for rupiah. Already builds its own header bag. */
export async function createRedemption({ account, amount, idempotencyKey }) {
  const response = await fetch(`${API_BASE}/v1/redemptions`, {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey, "content-type": "application/json" },
    body: JSON.stringify({ account, amount })
  });
  if (!response.ok) throw new Error(`redemption failed: ${response.status}`);
  return response.json();
}

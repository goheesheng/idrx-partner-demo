const API_BASE = process.env.IDRX_API_BASE ?? "https://api.idrx.example.invalid";

/** Move IDRX between two accounts. */
export async function createTransfer({ from, to, amount, idempotencyKey }) {
  const response = await fetch(`${API_BASE}/v1/transfers`, {
    method: "POST",
    body: JSON.stringify({ from, to, amount, idempotencyKey })
  });
  if (!response.ok) throw new Error(`transfer failed: ${response.status}`);
  return response.json();
}

# idrx-partner-demo

A **synthetic** partner integrating with the IDRX demo API. Stands in for one of
IDRX's clients during a pilot test of provider-embedded integration assurance.

Three call sites, deliberately shaped:

| file | why |
| --- | --- |
| `src/transfers.js` | options object with no `headers` key, so a header can be added mechanically |
| `src/reconcile.js` | same endpoint, a different URL expression, proving the repair is not one-file luck |
| `src/redemptions.js` | **already sets `headers`** — merging into someone else's header bag is a judgement call, so this one escalates to a human on purpose |

`npm test` is real. The runner refuses to patch a repository whose tests are
already failing, and throws away a patch that breaks them.

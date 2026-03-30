# 🔑 Rules for Performance

## Rule 1: "Doing less is faster than doing more"

The biggest performance win is **avoiding unnecessary work**.

- If code doesn't run, it's always faster than code that does
- Overusing tools like memoization or caching can backfire if they add more overhead than they save

---

## Rule 2: "Feeling fast is as important as being fast"

**User perception** matters more than raw speed.

Techniques like **preloading** and **optimistic UI updates** don't make things technically faster, but make them *feel* faster to users.

---

## ⚖️ Trade-offs & Context

Performance depends on the type of app:

| App Type | Priority |
|---|---|
| **Content sites** | Fast initial load (e.g., text appearing quickly) |
| **Applications** (dashboards, Gmail, etc.) | Invest upfront so interactions feel smooth later |

> Not all performance strategies fit every situation.

---

## 🧠 React-Specific Insights

Proper app structure — state placement, avoiding unnecessary re-renders — has the **biggest impact**.

### Memoization (`React.memo`, etc.)

- Useful, but easy to misuse
- Can introduce bugs (especially with cache invalidation)
- Sometimes checking if something changed is **slower** than just re-rendering

---

## ⚡ Modern React Tools

New APIs like `useTransition` and `useDeferredValue` let you prioritize:

- **Urgent updates** — user input, typing
- **Non-urgent work** — background rendering

> These help balance responsiveness vs workload.

---

## 🧩 Big Picture

Optimize by:

1. Avoiding unnecessary work
2. Prioritizing what matters to users
3. Structuring your app well
4. Using modern React tools wisely

---

> **One-line takeaway:** The best performance strategy is doing less work — and making the work you do feel instant to users.

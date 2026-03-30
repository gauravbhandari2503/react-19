# 🚦 React Lanes — Priority System

React Fiber introduces **lanes**, which are priority levels for updates.

---

## 🟢 1. Urgent Updates (High Priority)

- Typing in inputs
- Clicking buttons
- Scrolling, dragging

> These must feel instant.

---

## 🟡 2. Non-Urgent Updates (Lower Priority)

- Filtering / searching large lists
- Re-rendering graphs
- Expensive computations

> Important, but can wait a bit.

---

## 🧠 Key Rule

You don't mark things as "urgent" — you mark things as **"not urgent"**.

- **By default** → everything is urgent
- You explicitly push work into lower-priority **transition lanes**

---

## ⚙️ How React Uses Lanes

1. React assigns updates to lanes
2. Groups similar updates together
3. Processes from **highest → lowest** priority

> During rendering: if a higher-priority update appears → React switches to it.

---

## 🧩 Types of Lanes (Simplified)

| Lane | Description |
|---|---|
| **Sync lane** | Immediate (rarely used manually) |
| **User input lanes** | Clicks, typing |
| **Default lane** | Normal updates |
| **Transition lanes** | Deferred work (you control this) |
| **Retry lanes** | Failed work being retried |
| **Idle lane** | Lowest priority (background stuff) |

> In practice, you mainly control **transition lanes**.

---

## ⚠️ Important Behavior

React may:

- Pause work
- Switch priorities
- Restart rendering

This can feel "weird" if you don't know it's happening — but it's **intentional**.

---

## 🖥️ Render vs Commit

### 🧩 Render Phase (in memory)

Builds the virtual DOM (work-in-progress tree). Can be:

- Paused
- Restarted
- Interrupted

### 🖥️ Commit Phase (real DOM)

Applies changes to the real DOM. **Cannot be interrupted.**

> Once DOM updates start → React must finish.

---

## 🔄 Effects Timing

### `useEffect`

- Runs **after** commit
- Safe for API calls and side effects
- **Downside:** Causes double work (render → fetch → render again)

### `useLayoutEffect`

- Runs **before** DOM is painted
- Can block rendering
- ⚠️ Use only if absolutely necessary (advanced cases)

---

## 🚀 Better Approach: Suspense

Instead of: render → fetch → re-render

Use **Suspense**:

- Starts fetching **during** render
- Shows fallback UI (loading)
- Avoids unnecessary extra renders

**Benefits:**

- Better performance
- Cleaner code
- Easier state handling (no null checks everywhere)

---

## 💡 Big UX Insight

Users prefer:

- Immediate feedback (typing works)
- Even if heavy work is still happening

> React prioritizes **responsiveness over raw speed.**

---

## ⚖️ Trade-offs

| Approach | Pros | Cons |
|---|---|---|
| **Old way** | Simpler mental model | Less flexible |
| **New way** | Much better UX | Slightly more complex |

---

## 🧠 Final Takeaways

- React uses **lanes** to prioritize updates
- You control performance by **deferring non-urgent work**
- Rendering is **interruptible**; committing is **not**
- Modern tools like Suspense improve both performance and developer experience

---

> **One-line summary:** React lanes let you prioritize urgent user interactions over heavy background work, making apps feel fast even when they're doing a lot.

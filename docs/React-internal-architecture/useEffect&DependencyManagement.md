# ⚙️ useEffect Internals & Dependency Management

---

## 🧵 Where useEffect Lives — The Hook Linked List

Just like `useState`, `useEffect` is stored on the **Fiber node** of the component that calls it.

Every Fiber node has a `memoizedState` field that points to the **head of a linked list of Hook objects**. Each call to a Hook (`useState`, `useEffect`, `useRef`, …) appends one node to that list, in call order.

```
Fiber.memoizedState
  └── Hook (useState)
        └── next ──► Hook (useEffect)
                       └── next ──► Hook (useRef)
                                     └── next ──► null
```

> This is why **Hook order must never change** across renders. React walks the list by position, not by name.

---

## 🗂️ The Effect Object — What React Actually Stores

When React processes a `useEffect` call, it creates an **Effect object** and attaches it to the Hook node. The structure looks roughly like this:

```js
{
  tag,          // flags that say what kind of effect this is (Passive, Layout, etc.)
  create,       // the callback function you passed to useEffect
  destroy,      // the cleanup function returned by `create` (or undefined)
  deps,         // the dependency array you passed (or null if omitted)
  next,         // pointer to the next Effect in the component's effect circular list
}
```

### The `tag` field

The `tag` is a bitmask used to categorise effects:

| Flag (internal name) | Meaning |
| --- | --- |
| `HookPassive` | This is a `useEffect` (passive effect — runs asynchronously) |
| `HookLayout` | This is a `useLayoutEffect` (layout effect — runs synchronously after DOM mutations, before paint) |
| `HookHasEffect` | This effect **needs to run** in the current commit (deps changed or first mount) |

React only runs an Effect if **both** `HookHasEffect` and the effect-type flag (`HookPassive` / `HookLayout`) are set.

---

## 🔍 Dependency Comparison — How React Decides to Re-run an Effect

When React re-renders a component, it compares the **new** dependency array against the **previous** one stored in the Effect object using `Object.is()`:

```js
// Pseudocode of React's internal areHookInputsEqual()
function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) return false; // first render, always run
  for (let i = 0; i < prevDeps.length; i++) {
    if (!Object.is(nextDeps[i], prevDeps[i])) {
      return false; // something changed, need to re-run
    }
  }
  return true; // nothing changed, skip
}
```

### What `Object.is` means in practice

| Comparison | Result | Why |
| --- | --- | --- |
| `1 === 1` | ✅ same | primitive equality |
| `"hello" === "hello"` | ✅ same | primitive equality |
| `[] === []` | ❌ different | two new array objects |
| `{} === {}` | ❌ different | two new object references |
| `Object.is(NaN, NaN)` | ✅ same | `Object.is` handles this correctly, unlike `===` which gives `false` |

> This is why passing inline objects or arrays as dependencies causes the effect to re-run every render — a new reference is created on every render even if the contents are the same.

### Outcome of the comparison

| Deps array | Behaviour |
| --- | --- |
| `undefined` (no second arg) | Effect runs **after every render** |
| `[]` (empty array) | Effect runs **once** (on mount), never again |
| `[a, b]` | Effect runs when `a` or `b` changes (by `Object.is`) |

---

## 📅 When Does React Run the Effect? — The Commit Phase

React's work is split into two main phases:

```
Render phase  →  (interruptible)  build Work-in-Progress Fiber tree
Commit phase  →  (synchronous)    apply DOM changes, run effects
```

The commit phase itself has **three sub-phases**:

```
1. beforeMutation  — snapshots (getSnapshotBeforeUpdate)
2. mutation        — apply DOM insertions, updates, deletions
3. layout          — run useLayoutEffect (synchronous, blocks paint)
        ↓
   Browser paints the screen
        ↓
4. passive effects — run useEffect (asynchronous, after paint)
```

### useEffect is a "passive" effect

React schedules passive effects using the **scheduler** (via `MessageChannel` or similar micro-task mechanism), so they run **after the browser has painted**. This makes `useEffect` safe for side-effects that do not need to block the visual update (data fetching, subscriptions, logging, etc.).

```
State change
  └── Render phase  (produces WIP Fiber tree)
        └── Commit phase
              ├── DOM mutations applied
              └── Layout effects (useLayoutEffect) run synchronously
                    └── Browser paints 🖼️
                          └── Passive effects (useEffect) run asynchronously ✅
```

---

## 🧹 The Cleanup Mechanism — Destroy & Create Cycle

React follows a strict **destroy → create** pattern for effects that need to re-run:

1. **Mount**: run `create()`, store the returned `destroy` function (or `undefined`).
2. **Update** (deps changed): run the previous `destroy()` first, then run `create()` again, store new `destroy`.
3. **Unmount**: run `destroy()` one final time.

```
Mount
  └── create() called
        └── destroy = return value of create()

Re-render (deps changed)
  └── destroy() called   ← cleans up previous effect
        └── create() called again
              └── destroy = new return value

Unmount
  └── destroy() called   ← final cleanup
```

Internally, React stores the pending cleanup functions on the Effect objects themselves (`effect.destroy`) and walks the effect list at commit time to invoke them in order.

---

## 🔄 The Effect List — Circular Linked List

React does not walk the entire Fiber tree to find effects at commit time. Instead, during the render phase, React builds a **circular linked list** of Fiber nodes that have pending effects. The `finishedWork` root Fiber acts as the tail pointer, and the list is flattened for fast iteration during commit.

```
EffectList: FiberA → FiberB → FiberC → (back to root)
```

This means React can commit all effects in a single O(n) pass over only the affected Fibers, rather than traversing the entire tree.

---

## 🏗️ First Mount vs. Update — Internal Code Paths

React uses two separate internal functions for hooks depending on whether a component is **mounting** or **updating**:

| Phase | Internal dispatcher | useEffect function |
| --- | --- | --- |
| First render (mount) | `HooksDispatcherOnMount` | `mountEffect` |
| Re-render (update) | `HooksDispatcherOnUpdate` | `updateEffect` |

### mountEffect (simplified)

```js
function mountEffect(create, deps) {
  const hook = mountWorkInProgressHook(); // allocate a new Hook node
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = pushEffect(
    HookHasEffect | HookPassive, // always run on mount
    create,
    undefined,       // no previous destroy yet
    nextDeps
  );
}
```

### updateEffect (simplified)

```js
function updateEffect(create, deps) {
  const hook = updateWorkInProgressHook(); // reuse existing Hook node
  const nextDeps = deps === undefined ? null : deps;
  const prevEffect = hook.memoizedState;

  if (nextDeps !== null) {
    const prevDeps = prevEffect.deps;
    if (areHookInputsEqual(nextDeps, prevDeps)) {
      // deps unchanged — add Effect WITHOUT HookHasEffect flag
      hook.memoizedState = pushEffect(HookPassive, create, prevEffect.destroy, nextDeps);
      return;
    }
  }
  // deps changed — add Effect WITH HookHasEffect flag so React runs it
  hook.memoizedState = pushEffect(
    HookHasEffect | HookPassive,
    create,
    prevEffect.destroy,
    nextDeps
  );
}
```

The key insight: if deps have **not** changed, React still adds the Effect to the list (so the linked list stays intact and hooks stay in order), but **without** the `HookHasEffect` flag. During commit, React checks for that flag and simply skips the effect.

---

## ⚡ useEffect vs useLayoutEffect — Internal Difference

Both hooks store Effect objects on the same hook linked list. The only internal difference is the **tag** bitmask used and the **commit sub-phase** in which React processes them.

| Hook | Tag flag | When it runs | Blocks paint? |
| --- | --- | --- | --- |
| `useLayoutEffect` | `HookLayout` | After DOM mutations, before paint | ✅ Yes |
| `useEffect` | `HookPassive` | After paint, async via scheduler | ❌ No |

React runs `useLayoutEffect` during the `commitLayoutEffects` pass (synchronous), and schedules `useEffect` via `scheduleCallback(NormalPriority, flushPassiveEffects)` (asynchronous).

---

## 🔑 Summary

```
useEffect call
  └── Hook object added to Fiber.memoizedState linked list
        └── Effect object created with { tag, create, destroy, deps }
              ├── deps compared with Object.is() on re-renders
              │     ├── changed  → HookHasEffect flag set → effect runs in commit
              │     └── same     → no flag → effect skipped in commit
              └── Runs in commit phase, after paint (passive / async)
                    ├── Previous destroy() called first (cleanup)
                    └── New create() called, new destroy() stored
```

| Concept | One-liner |
| --- | --- |
| **Hook storage** | Effect lives in a Hook node on the Fiber's `memoizedState` linked list |
| **Effect object** | Holds `create`, `destroy`, `deps`, and a `tag` bitmask |
| **Dependency check** | `Object.is()` per element; any change sets `HookHasEffect` |
| **Scheduling** | Passive effects run asynchronously after the browser paints |
| **Cleanup** | Previous `destroy()` is called before `create()` on every re-run |
| **Mount vs update** | Separate internal dispatchers (`mountEffect` / `updateEffect`) |
| **Effect list** | Circular linked list of Fibers with pending effects for O(n) commit |

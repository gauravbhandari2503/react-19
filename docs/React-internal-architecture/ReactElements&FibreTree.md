# 🧱 React Elements & Fiber Tree

---

## 🗺️ React Elements — The DOM Blueprint

> **Rendering** = Executing the component function.

A **React element** is a lightweight JavaScript object that describes a piece of UI. It is **not** the real DOM node — think of it as a blueprint or instruction that tells React what should appear on screen.

### What does a React element look like?

When you write JSX, Babel (or the React compiler) transforms it into a `React.createElement()` call:

```jsx
// JSX
<button className="btn">Click me</button>

// Transpiles to:
React.createElement("button", { className: "btn" }, "Click me")
```

This produces a plain JavaScript object:

```js
{
  $$typeof: Symbol(react.element),
  type: "button",
  key: null,
  ref: null,
  props: {
    className: "btn",
    children: "Click me"
  },
  _owner: <FiberNode>,  // the fiber node of the component that created this element
}
```

### Key properties

| Property    | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `$$typeof`  | A `Symbol` used as a security marker to prevent XSS attacks              |
| `type`      | A string (e.g. `"div"`) for host elements, or a function/class component |
| `key`       | Used by the reconciler to identify elements across renders                |
| `ref`       | A reference to the underlying DOM node or component instance             |
| `props`     | The inputs passed to the element, including `children`                   |
| `_owner`    | Points to the **Fiber node** of the component that rendered this element |

> React elements are **immutable** — once created, they are never modified.  
> Every re-render produces a **new** set of React elements.

---

## 🌳 Fiber Tree — The Virtual DOM

The **Fiber Tree** is React's internal representation of the UI — it is what most people loosely call the "Virtual DOM."

A **Fiber node** is a JavaScript object that describes a piece of UI **and** carries all the information React needs to determine how to update that UI. The `_owner` field on a React element is what points to the corresponding Fiber node.

---

## 🔩 Fiber Node Structure

### Why not use the real DOM directly?

The real DOM is implemented as a **C++ object** in the browser. It is expensive to create, update, and traverse. React uses Fiber nodes — plain JS objects — as a cheap, in-memory representation.

### Fiber nodes form a singly-linked list tree

Instead of a traditional tree (parent → array of children), Fiber uses a **linked list** structure:

```
Parent
  │
  └──► child ──► sibling ──► sibling ──► ...
         │
       return (back to parent)
```

| Pointer    | Points to                                         |
| ---------- | ------------------------------------------------- |
| `child`    | First child fiber node                            |
| `sibling`  | Next sibling fiber node                           |
| `return`   | Parent fiber node                                 |
| `alternate` | The corresponding node in the other tree (see below) |

This structure is:
- **Simple** — just pointer fields on a plain object
- **Low memory** — no overhead of nested arrays
- **Easy to traverse** — React can walk it iteratively (no deep call stacks)
- **Interruptible** — React can pause traversal at any point and resume later

### Key Fiber node fields

```js
{
  // Identity
  type,           // "div" / function / class component
  key,            // reconciliation key

  // Tree links
  child,          // first child fiber
  sibling,        // next sibling fiber
  return,         // parent fiber

  // DOM reference
  stateNode,      // the actual DOM node or class instance

  // Props & state
  pendingProps,   // new props for this render
  memoizedProps,  // props from the last committed render
  memoizedState,  // state from the last committed render (hooks linked list)

  // Update queue
  updateQueue,    // pending state updates

  // Scheduling
  lanes,          // priority levels for this fiber's pending work
  childLanes,     // priority levels of work in subtree

  // Work tracking
  flags,          // side-effects to apply (Placement, Update, Deletion, etc.)

  // Double buffering
  alternate,      // pointer to the fiber in the other tree (current ↔ WIP)
}
```

---

## 🔄 Double Buffering — Current & Work-in-Progress Trees

When a state change occurs, React does **not** update the Fiber tree in place. Instead it maintains **two trees simultaneously**:

```
┌─────────────────────────┐       ┌────────────────────────────────┐
│      Current Tree       │       │    Work-in-Progress (WIP) Tree │
│  (reflects the real DOM)│◄─────►│  (being built for next render) │
└─────────────────────────┘       └────────────────────────────────┘
         alternate                         alternate
```

| Tree                    | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| **Current**             | The Fiber tree that matches what is currently painted on screen         |
| **Work-in-Progress**    | A new Fiber tree being constructed for the next UI state                |

Each node in one tree holds an `alternate` pointer to its counterpart in the other tree. This is how React can:
1. Build the new tree **without destroying** the currently visible UI.
2. **Diff** the two trees to find the minimal set of DOM changes.
3. **Throw away** the WIP tree cheaply if a newer update arrives (no real DOM was touched).

> This technique is called **double buffering** — the same pattern used in graphics rendering to prevent flickering.

---

## ⚙️ Reconciliation — Finding the Efficient Update

Once the Work-in-Progress tree is fully built, the **Reconciliation algorithm** (the "diffing" algorithm) compares it against the Current tree to produce the minimal list of DOM operations required.

### Two-phase commit

| Phase          | What happens                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Render phase** | React calls component functions, builds the WIP Fiber tree, diffs it against Current (interruptible) |
| **Commit phase** | React applies DOM mutations, layout effects, and passive effects (synchronous, cannot be interrupted) |

### Key reconciliation heuristics

1. **Same type** at the same position → React reuses the existing DOM node and updates its attributes.
2. **Different type** at the same position → React tears down the old subtree and mounts a new one.
3. **Lists with `key`** → React matches nodes by key across re-renders to avoid unnecessary unmounts.

---

## 🔑 Summary

```
JSX
  └── React.createElement()
        └── React Element (lightweight JS object / blueprint)
              └── Fiber Node (rich JS object in the Fiber Tree / Virtual DOM)
                    ├── Current Tree  ←── reflects real DOM
                    └── WIP Tree      ←── being computed
                          └── Reconciliation
                                └── Commit to real DOM
```

| Concept                  | One-liner                                                        |
| ------------------------ | ---------------------------------------------------------------- |
| **React Element**        | Immutable JS object describing what to render                    |
| **Fiber Node**           | Mutable JS object tracking how to render and update             |
| **Fiber Tree**           | Linked-list tree of all Fiber nodes (the Virtual DOM)           |
| **Current Tree**         | Fiber tree matching the current real DOM                         |
| **Work-in-Progress Tree**| Fiber tree being built for the next render                       |
| **`alternate`**          | Cross-pointer between Current and WIP node                       |
| **Reconciliation**       | Algorithm that diffs Current vs WIP to minimize DOM mutations    |

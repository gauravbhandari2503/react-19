# 🧠 State Management & Hooks (React Internals)

## 1) Where React stores state

React stores component state on the component's **Fiber node**.

- Each function component Fiber has a field called `memoizedState`.
- `memoizedState` points to the first Hook object.
- Hooks are stored as a **linked list** (`next` pointer).

So, Hook state is not stored in your component function variables. It is stored in React's Fiber data structure.

---

## 2) Hook linked-list idea

For a component like:

```tsx
function Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("A");
}
```

React internally keeps hooks in call order:

`Hook1(useState count) -> Hook2(useState name) -> null`

That is why hook order must stay the same on every render.

---

## 3) Current state vs pending updates

- `memoizedState` represents the last committed value for a Hook.
- When you call `setState`, React adds an update to the Hook's update queue.
- During the next render, React processes queued updates and computes new state.

In short:
- **Current committed value** lives in current Fiber Hook data.
- **New incoming updates** live in update queues until processed.

---

## 4) Alternate Fiber (double buffering)

React keeps two versions of the tree:

1. **Current Fiber tree** (what UI currently shows)
2. **Work-in-Progress Fiber tree** (next render being prepared)

These two fibers are connected with `alternate`.

So yes, there are two branches. React computes next state on Work-in-Progress, then commits it and swaps trees.

---

## 5) Rules of Hooks

As per React documentation:

1. **Only call Hooks at the top level**
	- Do not call Hooks inside loops, conditions, or nested functions.
2. **Only call Hooks from React functions**
	- Call Hooks from function components or custom Hooks.

Why: React matches Hook calls by order. If order changes, React can map state to the wrong Hook.

---

## 6) Quick summary

- State for function components is attached to Fiber.
- `memoizedState` is the head of Hook linked list.
- Updates are queued, then applied in next render.
- `alternate` Fiber enables current vs work-in-progress rendering.
- Rules of Hooks keep Hook order stable.


# ⚡ Event Handling & Re-rendering Process in React

## 1) Event Handling

React handles browser events using a wrapper system called **Synthetic Events**.

### React Synthetic Events

- Synthetic Event is a cross-browser wrapper around native browser events.
- It provides a consistent API like `onClick`, `onChange`, `onSubmit`, etc.
- In modern React, event objects are not pooled, so you can safely access event values asynchronously.

Example:

```tsx
function Button() {
	return <button onClick={() => console.log("Clicked")}>Click</button>;
}
```

### Browser Native Events

- Native events are actual browser events (`click`, `input`, `keydown`, ...).
- React listens to these events and creates Synthetic Events before your handler runs.
- You can still access native event through `event.nativeEvent` when needed.

### Synthetic vs Native Events (Difference)

| Point | Synthetic Event (React) | Native Event (Browser) |
| --- | --- | --- |
| Source | Created by React wrapper | Created by browser |
| API naming | `onClick`, `onChange` in JSX | `addEventListener("click", ...)` |
| Browser consistency | Normalized behavior across browsers | Can vary across browsers |
| Access to original event | `event.nativeEvent` gives original event | Already original event |
| Event attachment | Managed by React's event system | Attached directly to DOM node |

---

## 2) Triggering Re-renders

In React, **render** means: **execute the component function again** to produce new React elements.

### Common reasons React re-renders

1. `setState` / state updater is called.
2. Parent component re-renders (child may also re-render).
3. Context value changes.
4. Props change.

### Simple flow

1. Event happens (like button click).
2. Handler runs and calls `setState`.
3. React schedules update.
4. Component function executes again (render phase).
5. React compares old vs new output (reconciliation).
6. Only required DOM changes are committed.

---

## 3) Important Note

- Re-render does **not** always mean real DOM update.
- React first computes differences, then updates only changed parts of the DOM.
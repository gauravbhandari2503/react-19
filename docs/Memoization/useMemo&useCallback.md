# useMemo & useCallback

## 🧠 Simple Difference

- **useMemo** → remembers a value
- **useCallback** → remembers a function

That's it at the core.

---

## 📦 useMemo (for values)

Use it when you have some calculation and don't want to redo it every render.

### Example

```javascript
const expensiveValue = useMemo(() => {
  return bigCalculation(data);
}, [data]);
```

### React will:

- Recalculate only when `data` changes
- Otherwise reuse the old result

**💡 Think: "Save the result"**

---

## 🔁 useCallback (for functions)

Use it when you want to keep the same function instance.

### Example

```javascript
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

### React will:

- Not recreate the function every render
- Recreate only if dependencies change

**💡 Think: "Save the function"**

---

## 🎯 Best Practices

Use `React.memo` + `useCallback` + functional state updates to ensure components only re-render when truly necessary.

### 🔹 1. Using React.memo to prevent unnecessary re-renders

Wrapping a component with `React.memo` helps avoid re-rendering if props haven't changed.
It works by doing a shallow comparison of props before rendering.

### 🔹 2. Problem: Functions cause re-renders

Even with `React.memo`, components were still re-rendering.

**Reason:** functions like `onUpdate` and `onDelete` were being recreated on every render → new references each time.

### 🔹 3. Solution: Use useCallback

Wrap functions (`updateCalculation`, `deleteCalculation`) in `useCallback` to keep their references stable.
This prevents unnecessary re-renders in child components.

### 🔹 4. Important optimization trick

Instead of relying on state variables directly inside callbacks use the functional form of state update:

```javascript
setCalculations(prev => ...)
```

This removes the need to include state in the dependency array.

### 🔹 5. Dependency array matters

- Using an empty dependency array `[]` ensures the callback stays stable
- Avoid `undefined` as dependencies—it behaves differently and is considered an anti-pattern

### 🔹 6. Result of optimization

- Only components with actual data changes re-render
- Other components are skipped entirely → improved performance
- Profiler shows:
  - Less rendering activity
  - Faster updates
  - "Large swaths of work" avoided

### 🔹 7. Key insight

Performance optimization is about:

- Stable references (functions, props)
- Avoiding unnecessary work
- **If nothing changes → React should do nothing**

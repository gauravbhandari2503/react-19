# useTransition & useDeferredValue

> React performance isn't just about making things faster — **it's about prioritizing what matters (urgent vs non-urgent)**.

---

## ⚡ Key Points

### 1. 🟢 Basic Optimizations (used daily)
- Push state down
- Avoid unnecessary re-renders
- Memoization (`useMemo`, `useCallback`)

👉 **These are your everyday tools**

### 2. 🔴 Advanced Optimizations (rare but powerful)
- Used when there's a big performance bottleneck
- Not needed often (maybe once in months)
- But important to recognize when to use them

### 3. 🧠 Main Concept: Urgent vs Non-Urgent

By default → everything is treated equally  
With React Fiber → you can assign priority

**Idea:**
- **Urgent** → user interactions (typing, clicks, UI feedback)
- **Non-urgent** → heavy calculations, data updates

### 4. 🚀 Goal

You can't always make things faster, but you can:

👉 **Make the app feel fast and responsive**

- Keep UI smooth
- Delay heavy work
- Do both at the same time

### 5. 🧩 Tools React Gives

#### 🔹 useTransition / startTransition
- Mark updates as low priority
- Use when you control the logic
- **Example:** expensive UI updates after typing

#### 🔹 useDeferredValue
- Delay reacting to a changing value
- React keeps using the current (previous) deferred value until the new value is ready
- Use when you don't control the logic fully
- **Example:** search input triggering heavy filtering

### 6. 🧠 Simple Mental Model

- `useTransition` → "This action is not urgent"
- `useDeferredValue` → "Keep showing the current value until the new value is ready"

---

## 🔥 Golden Rule

- 🟢 **Always keep user interactions smooth**
- 🔴 **Push heavy work to the background**

👉 **One-line takeaway:** You can't eliminate slow work — but you can hide it behind a responsive UI.

---

## 🧠 The Problem: Pokédex Search

### The Scenario
App does a fuzzy search over ~1000 Pokémon searching across:
- name
- description
- types, species, etc.

👉 **This makes the operation computationally heavy**

### ⚠️ What's Going Wrong
Every keystroke triggers a heavy search:
- UI lags
- Input feels delayed
- CPU usage spikes
- Some operations take ~1 second ❌

👉 **Even typing feels slow (bad UX)**

### 🔍 Key Observation

User input is **not being prioritized**:
- **Typing** (urgent)
- **Search/filtering** (non-urgent)

👉 **Both are treated the same → causes lag**

---

## 🚨 Impact

- User types → nothing happens instantly
- UI freezes → feels broken
- Even 16ms frame budget is exceeded

👉 **React app feels unresponsive**

---

## 💡 Core Insight

You can't always make heavy work faster  
👉 **But you can separate priorities**

### 🚀 What We WANT
- ✅ Typing should feel instant
- ✅ UI should update immediately
- ⏳ Search can happen in background
- 🔄 Show loading/processing if needed

### 🧩 React Solution

Using React Fiber:
1. Interrupt ongoing work
2. Prioritize new user input
3. Defer expensive operations

**Goal:** Make app feel fast by:
- Handling user interaction first
- Running heavy logic later

---

## 🔥 One-Line Takeaway

Don't block user input with heavy work — let UI stay responsive and push expensive tasks to the background.

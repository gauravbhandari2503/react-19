# ⚡ React Fiber

## 🧠 The Problem with Early React

Old React rendering:

- Started at the top of the component tree
- Went through everything **in one go**
- **Blocked** the main thread until finished

> **Result:** Large apps could freeze — typing, scrolling, and clicking felt laggy or unresponsive.

---

## ⚡ The Old Workarounds

Before improvements, developers had to:

- Use debouncing / throttling
- Use tools like RxJS
- Manually cancel or delay work

> These worked, but added complexity and required lots of custom code.

---

## 🚀 Enter React Fiber

React Fiber changed how rendering works internally. Instead of doing everything at once, React now:

- Breaks work into **small chunks**
- Processes them **incrementally**
- **Pauses** and **resumes** work

---

## 🔑 Key Idea: Interruptible Rendering

React can now:

- ⏸️ **Pause** rendering
- 🔄 **Resume** later
- ❌ **Throw away** outdated work
- 🚦 **Switch** to more important tasks

> It constantly asks: *"Is this still important, or is there something more urgent?"*

---

## 🎯 Priority-Based Rendering

| Priority | Examples |
|---|---|
| **Urgent** | Typing, clicking |
| **Non-urgent** | Sorting large lists, re-rendering heavy UI |

> React can interrupt less important work to handle urgent interactions first.

---

## ⚖️ Trade-off (Important Insight)

Yes, this can mean:

- Doing some work **twice**
- Wasting effort

**But:** it feels much faster to users.

> This connects to the rule: *"Feeling fast > being technically fast."*

---

## 🔄 How It Works (Conceptually)

1. React splits rendering into **pieces** (instead of one big function)
2. Schedules them like tasks in a queue
3. Periodically "comes up for air" to:
   - Let the browser update (animations, paints)
   - Check for higher-priority work

> Similar idea to using `setTimeout(0)` to avoid blocking the event loop.

---

## 🖥️ Browser-Friendly Behavior

- Browser targets **60 FPS** (~16ms per frame)
- React Fiber **yields control regularly** to prevent blocking animations and interactions

---

## 🧠 Important Distinction

| Tool | Role |
|---|---|
| **React Compiler** | Helps avoid unnecessary renders |
| **React Fiber** | Helps prioritize *when* work happens |

> One **reduces** work. The other **schedules** it smarter.

---

## 🌳 Two Trees Concept

React maintains two trees:

| Tree | Description |
|---|---|
| **Current Tree** | What's shown in the DOM |
| **Work-in-Progress Tree** | What React is currently building in memory |

**Why this matters:** If something more important happens:

1. React discards the unfinished work
2. Reverts to the stable current tree
3. Starts fresh

---

## ⚙️ Render vs Commit

### 🧩 Render Phase (in memory)

React:

- Calls component functions
- Builds the new tree
- Figures out changes

Can be: **paused**, **resumed**, or **restarted**.

### 🖥️ Commit Phase (real DOM)

React:

- Applies final changes to the DOM

This part is **fast** and **not interruptible**.

---

## ⏱️ Incremental Work (Key Mechanism)

React processes small chunks of work. Roughly every few milliseconds (~5ms), it checks in and asks:

- Should I continue?
- Has something more important come up?
- Should I pause or restart?

---

## 🔄 What Happens During Check-ins

React can:

- ⏸️ **Pause** → let browser handle animations, input, etc.
- ▶️ **Resume** → continue where it left off
- 🔁 **Restart** → if new updates made old work irrelevant

---

## ⚖️ Important Insight

Sometimes React throws away partially completed work and starts over.

> This *seems* inefficient, but continuing outdated work is **more wasteful** than restarting.

---

## 💡 Why This Improves UX

**Prevents:**

- Frozen UI
- Janky animations

**Enables:**

- Smooth typing
- Responsive interactions

Even if more total work is done behind the scenes.

---

## 🧠 Big Picture

React evolved from:

> "Do everything in one go"

To:

> "Do work in chunks, check priorities, and adapt in real time"

---

> **One-line takeaway:** React Fiber uses a double-buffered tree and interruptible rendering to prioritize responsiveness — even if it means redoing some work.

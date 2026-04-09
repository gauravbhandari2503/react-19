# Foundations of Accessibility in React

## 1) Why Accessibility Matters

Accessibility means making apps usable for everyone, including people with:

- Visual impairments (screen readers)
- Motor disabilities (keyboard navigation)
- Cognitive challenges

### Key Importance

- Equal access for all users
- Better user experience and satisfaction
- Wider audience reach
- Legal compliance

Without accessibility, users may leave your app.

### Example

Think of a beautiful café with no visible entrance. People won’t enter, even if it’s amazing.

Same with apps: if users can’t navigate, they leave.

## 2) Common Accessibility Issues

- Screen readers reading “undefined” or unclear labels
- Keyboard navigation not working (`Tab`, `Enter`)
- Missing structure, leading to confusing UI

### Example

A checkbox without a label:

- Screen reader says: “Checkbox checked”
- User thinks: “Checked what?”

## 3) Semantic HTML (Very Important)

### What is it?

Using meaningful HTML tags instead of generic ones.

- Use: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Avoid overusing `<div>`

### Benefits

- Better accessibility
- Better SEO
- Cleaner code
- Easier navigation for screen readers

### Example

Bad:

```html
<div>
  <div>Title</div>
</div>
```

Good:

```html
<header>
  <h1>Title</h1>
</header>
```

Screen readers understand this structure immediately.

## 4) React Components vs Semantic HTML

| Aspect | Semantic HTML | React Components |
| --- | --- | --- |
| Purpose | Structure | UI + logic |
| Accessibility | Built-in | Needs effort |
| Usage | Native tags | Custom JSX |

### Important Insight

React gives power, but you must preserve accessibility manually.

### Example

Not accessible:

```jsx
<div onClick={...}>Click</div>
```

Better:

```jsx
<button>Click</button>
```

## 5) Div-heavy vs Semantic Layout

### Problem

Too many `<div>` elements provide no meaning, which confuses screen readers.

### Solution

Use proper tags and labels.

### Example

- Without labels: “Checkbox checked”
- With labels: “Receive newsletter — checked”

That difference is huge for usability.

## 6) ARIA (Accessible Rich Internet Applications)

### What is ARIA?

Extra attributes that improve accessibility.

Common attributes:

- `aria-label`
- `aria-labelledby`
- `aria-describedby`
- `role`
- `aria-live`
- `aria-hidden`

### When to use ARIA

Use ARIA when:

- Building custom components (for example, fake buttons)
- Handling dynamic content updates

Do not:

- Overuse ARIA
- Replace semantic HTML with ARIA

Rule: Use HTML first, ARIA only if needed.

### Example

Bad:

```html
<div role="button">Click</div>
```

Better:

```html
<button>Click</button>
```

## 7) ARIA Misuse (Critical)

Wrong ARIA can make accessibility worse.

### Example

Tabs without proper linking can confuse screen readers.

Commonly missing:

- `aria-selected`
- `aria-controls`

Components must be connected correctly.

### Best Practice

Use the ARIA Authoring Practices Guide.

## 8) Forms and Accessibility (High Impact)

Forms are critical for login, signup, and core user tasks.

### Must Do

- Always use `<label>` with inputs
- Avoid relying only on placeholders

### Example

Bad:

```html
<input placeholder="Email" />
```

Good:

```html
<label for="email">Email</label>
<input id="email" />
```

## 9) ARIA in Forms

Useful attributes:

- `aria-required="true"` for required fields
- `aria-invalid="true"` for errors
- `aria-describedby` for help text

### Example

For an invalid password field, a screen reader can announce:

“Password invalid — must be 8 characters.”

## 10) Best Practices for Forms

- Keep logical tab order
- Use `<fieldset>` and `<legend>` for grouped controls
- Provide clear instructions
- Show errors clearly

## Final Key Takeaways

- Accessibility is not optional; it is essential
- Start with semantic HTML
- React requires extra care for accessibility
- Use ARIA only when needed
- Forms and labels have major usability impact
- Test with screen readers and keyboard navigation

## Simple Analogy

Building an app without accessibility is like designing a luxury building but forgetting ramps, signs, and doors.

It may look great, but many people still can’t use it.
⌨️ 1. Keyboard Navigation (Core Concept)

# Optimizing and Testing Accessibility in React

## 1) Optimizing Accessibility in React

Accessibility is not a one-time task. It’s an ongoing process that should be integrated into your development workflow.

### Key Strategies

- Use semantic HTML elements as much as possible
- Prefer native elements over custom ones
- Use ARIA only when necessary
- Test with real assistive technologies
- Automate accessibility checks in CI/CD

**Example:**

Use `<button>` instead of `<div onClick={...}>` for clickable actions.

## 2) Tools for Accessibility Testing

There are many tools to help you catch accessibility issues early:

- **axe DevTools** (browser extension)
- **Lighthouse** (Chrome DevTools)
- **NVDA** (screen reader, Windows)
- **VoiceOver** (screen reader, Mac)
- **Testing Library** (React testing)
- **jest-axe** (automated tests)

## 3) Automated Accessibility Testing in React

You can automate accessibility checks in your tests using libraries like `jest-axe` and `@testing-library/react`.

### Example: React Component Test

```jsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('MyComponent is accessible', async () => {
	const { container } = render(<MyComponent />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
```

## 4) Manual Testing: Screen Readers & Keyboard

Automated tools are great, but always test manually:

- Use Tab/Shift+Tab to navigate
- Use Enter/Space to activate buttons/links
- Try with a screen reader (NVDA, VoiceOver, etc.)

**Tip:** If you can’t use your app with just a keyboard, it’s not accessible!

## 5) Continuous Integration (CI) for Accessibility

Integrate accessibility checks into your CI pipeline:

- Run `jest-axe` or similar tools on every pull request
- Fail builds if critical accessibility issues are found

### Example: GitHub Actions Workflow

```yaml
name: Accessibility Tests
on: [pull_request]
jobs:
	test:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v2
			- name: Install dependencies
				run: npm install
			- name: Run accessibility tests
				run: npm test
```

## 6) Accessibility Audits & Monitoring

Periodically audit your app with:

- Lighthouse
- axe DevTools
- Manual reviews

Set up monitoring for regressions (e.g., with automated tests or CI tools).

## Final Checklist

- [ ] Use semantic HTML
- [ ] Prefer native elements
- [ ] Use ARIA only when needed
- [ ] Test with screen readers
- [ ] Test with keyboard
- [ ] Automate accessibility checks
- [ ] Monitor for regressions

**Remember:** Accessibility is a journey, not a checkbox!
Red text = error
(no label)

✅ Good:

Red + ❗ icon + “Error message”
🧪 6. Accessibility Testing (Super Important)
🧠 Two Types:
🔍 A. Manual Testing
Use screen readers:
NVDA
VoiceOver
JAWS
Test using only keyboard
Check color contrast manually
💡 Example:

Try your app without a mouse
→ If you get stuck → accessibility issue

🤖 B. Automated Testing Tools
🔹 Google Lighthouse
Built into Chrome DevTools
Gives accessibility score
Highlights issues
🔹 Axe
More detailed analysis
Shows:
Severity
Fix suggestions
Works with testing frameworks
💡 Example:
Lighthouse → “Low contrast issue”
Axe → “High severity contrast + semantic issues”

👉 Axe = deeper insights

🔎 7. DevTools Accessibility Features
Accessibility Tree → how screen readers see UI
Contrast checker
Focus indicators

👉 Helps debug accessibility visually

📉 8. Impact of Poor Accessibility

If ignored:

❌ High bounce rate
❌ Bad reviews
❌ Lost users
❌ Poor UX
💡 Example:

User can’t navigate with keyboard → leaves instantly

🧩 9. Putting Everything Together
✅ Checklist:
Use semantic HTML
Manage focus properly
Ensure keyboard navigation
Maintain color contrast
Use accessible forms
Test with tools
🔄 10. Optimization Process
🔁 Step-by-step:
Identify issues (manual + tools)
Fix based on severity
Set standards
Repeat continuously

👉 Accessibility is not one-time, it’s ongoing

🎯 Final Key Takeaways
Keyboard accessibility = foundation
Focus management = critical for UX
Avoid breaking tab order
Color contrast directly affects usability
Testing = must (manual + automated)
Accessibility = continuous improvement
💡 Simple Analogy (To Remember Everything)

Using an app without accessibility is like:

Driving a car 🚗
where steering works sometimes,
brakes don’t respond properly,
and dashboard is unreadable

👉 You won’t trust it. You’ll leave.
import { useState, useRef, useEffect, useId } from 'react';
import { Card } from '$/components/card';
import { Button } from '$/components/button';

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function CodeBlock({ code }: Readonly<{ code: string }>) {
	return (
		<pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100 dark:bg-slate-950">
			<code>{code}</code>
		</pre>
	);
}

function Badge({ label }: Readonly<{ label: string }>) {
	return (
		<span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
			{label}
		</span>
	);
}

function GoodBadLabel({ good }: Readonly<{ good: boolean }>) {
	return good ? (
		<p className="mb-2 text-sm font-semibold text-green-600 dark:text-green-400">✓ Good</p>
	) : (
		<p className="mb-2 text-sm font-semibold text-red-500 dark:text-red-400">✗ Bad</p>
	);
}

function SectionHeader({ badge, title, description }: Readonly<{ badge: string; title: string; description: string }>) {
	return (
		<div>
			<Badge label={badge} />
			<h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
			<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
		</div>
	);
}

// ─── Demo 1: Semantic HTML ────────────────────────────────────────────────────

function SemanticHTMLDemo() {
	const badCode = `<!-- Div soup – no meaning for screen readers -->
<div>
  <div>My App</div>
  <div>
    <div>Home</div>
    <div>About</div>
  </div>
</div>
<div>
  <div>Welcome</div>
  <div>Some content here.</div>
</div>
<div>© 2024</div>`;

	const goodCode = `<!-- Semantic HTML – immediately understood by screen readers -->
<header>
  <h1>My App</h1>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <section aria-labelledby="welcome-heading">
    <h2 id="welcome-heading">Welcome</h2>
    <p>Some content here.</p>
  </section>
</main>
<footer>© 2024</footer>`;

	return (
		<section aria-labelledby="semantic-html-heading">
			<SectionHeader
				badge="Foundation"
				title="Semantic HTML"
				description="Use meaningful HTML tags instead of generic <div> wrappers. Screen readers and search engines rely on them to understand page structure."
			/>
			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<GoodBadLabel good={false} />
					<CodeBlock code={badCode} />
					<p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
						A screen reader announces every element as "group" — no navigation landmarks, no headings, no meaning.
					</p>
				</Card>
				<Card>
					<GoodBadLabel good={true} />
					<CodeBlock code={goodCode} />
					<p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
						Screen readers offer "jump to main content", list all headings, navigate by landmarks — instant usability.
					</p>
				</Card>
			</div>
		</section>
	);
}

// ─── Demo 2: Accessible Buttons / Keyboard Navigation ────────────────────────

function AccessibleButtonDemo() {
	const [divCount, setDivCount] = useState(0);
	const [btnCount, setBtnCount] = useState(0);

	const badCode = `// ✗ Not keyboard accessible
// – cannot Tab to it
// – Enter / Space does nothing
// – screen reader may ignore it
<div
  style={{ cursor: 'pointer' }}
  onClick={() => setCount(c => c + 1)}
>
  Like
</div>`;

	const goodCode = `// ✓ Fully accessible
// – focusable by Tab
// – activated by Enter or Space
// – announced as "Like, button"
<button onClick={() => setCount(c => c + 1)}>
  Like
</button>`;

	return (
		<section aria-labelledby="keyboard-nav-heading">
			<SectionHeader
				badge="Keyboard Navigation"
				title="Use <button> for Clickable Actions"
				description="A <div> with onClick looks identical but is invisible to keyboard users and screen readers. Try tabbing to each element below."
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<GoodBadLabel good={false} />
					<div className="mb-4 flex items-center gap-4">
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
						<div
							className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 cursor-pointer select-none dark:bg-slate-700 dark:text-slate-200"
							onClick={() => setDivCount((c) => c + 1)}
						>
							👍 Like
						</div>
						<span className="text-sm text-slate-600 dark:text-slate-400">
							Clicked: <strong>{divCount}</strong>
						</span>
					</div>
					<p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
						Try pressing <kbd className="rounded border border-slate-300 bg-slate-100 px-1 py-0.5 text-xs dark:border-slate-600 dark:bg-slate-800">Tab</kbd> until this is focused — you can't. Keyboard users are stuck.
					</p>
					<CodeBlock code={badCode} />
				</Card>

				<Card>
					<GoodBadLabel good={true} />
					<div className="mb-4 flex items-center gap-4">
						<button
							type="button"
							className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
							onClick={() => setBtnCount((c) => c + 1)}
						>
							👍 Like
						</button>
						<span className="text-sm text-slate-600 dark:text-slate-400">
							Clicked: <strong>{btnCount}</strong>
						</span>
					</div>
					<p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
						Tab to this button, then press <kbd className="rounded border border-slate-300 bg-slate-100 px-1 py-0.5 text-xs dark:border-slate-600 dark:bg-slate-800">Enter</kbd> or <kbd className="rounded border border-slate-300 bg-slate-100 px-1 py-0.5 text-xs dark:border-slate-600 dark:bg-slate-800">Space</kbd>. Works perfectly.
					</p>
					<CodeBlock code={goodCode} />
				</Card>
			</div>
		</section>
	);
}

// ─── Demo 3: Forms & Accessibility ───────────────────────────────────────────

function FormsDemo() {
	const emailId = useId();
	const errorId = useId();
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const validate = () => {
		if (!email) {
			setError('Email is required.');
			setSuccess(false);
			return;
		}
		if (email.includes('@')) {
			setError('');
			setSuccess(true);
		} else {
			setError('Enter a valid email address.');
			setSuccess(false);
		}
	};

	const badCode = `// ✗ Placeholder is not a label
// – screen reader only says "edit text"
// – placeholder disappears on type
// – no error announcement
<input placeholder="Email" />`;

	const goodCode = `// ✓ Label + ARIA for full context
<label htmlFor={emailId}>
  Email <span aria-hidden="true">*</span>
</label>
<input
  id={emailId}
  type="email"
  aria-required="true"
  aria-invalid={!!error}
  aria-describedby={error ? errorId : undefined}
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
{error && (
  <p id={errorId} role="alert">
    {error}
  </p>
)}`;

	return (
		<section aria-labelledby="forms-heading">
			<SectionHeader
				badge="Forms"
				title="Forms & Accessibility"
				description="Labels are not optional. Placeholders disappear when typing and are never read as field names by screen readers."
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				{/* Bad form */}
				<Card>
					<GoodBadLabel good={false} />
					<div className="mb-4 space-y-2">
						<input
							className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
							placeholder="Email"
							type="email"
						/>
						<input
							className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
							placeholder="Password"
							type="password"
						/>
						<button
							type="button"
							className="w-full rounded-md bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
						>
							Login
						</button>
					</div>
					<p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
						Screen reader says: "edit text" — with no label, users have no idea what to type.
					</p>
					<CodeBlock code={badCode} />
				</Card>

				{/* Good form */}
				<Card>
					<GoodBadLabel good={true} />
					<form
						className="mb-4 space-y-3"
						onSubmit={(e) => {
							e.preventDefault();
							validate();
						}}
						noValidate
					>
						<div>
							<label
								htmlFor={emailId}
								className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
							>
								Email{' '}
								<span aria-hidden="true" className="text-red-500">
									*
								</span>
							</label>
							<input
								id={emailId}
								type="email"
								className={`w-full rounded-md border px-3 py-2 text-sm dark:bg-slate-800 dark:text-slate-100 ${
									error
										? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
										: 'border-slate-300 dark:border-slate-600'
								}`}
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setError('');
									setSuccess(false);
								}}
								aria-required="true"
								aria-invalid={!!error}
								aria-describedby={error ? errorId : undefined}
								placeholder="you@example.com"
							/>
							{error && (
								<p
									id={errorId}
									role="alert"
									className="mt-1 text-xs font-medium text-red-500"
								>
									{error}
								</p>
							)}
							{success && (
								<output className="mt-1 block text-xs font-medium text-green-600 dark:text-green-400">
									Looks good!
								</output>
							)}
						</div>
						<Button type="submit" variant="primary" size="medium">
							Validate
						</Button>
					</form>
					<p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
						Screen reader announces: "Email, required, edit text" — and reads the error automatically via <code>role="alert"</code>.
					</p>
					<CodeBlock code={goodCode} />
				</Card>
			</div>
		</section>
	);
}

// ─── Demo 4: ARIA Labels on Icon Buttons ─────────────────────────────────────

function AriaLabelsDemo() {
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);

	const badCode = `// ✗ Screen reader says "button" — nothing else.
// The user has no idea what the button does.
<button onClick={toggleLike}>❤️</button>`;

	const goodCode = `// ✓ aria-label gives the icon button a name.
// Screen reader says "Like post, button".
<button
  aria-label={liked ? 'Unlike post' : 'Like post'}
  aria-pressed={liked}
  onClick={() => setLiked(l => !l)}
>
  ❤️
</button>

// aria-hidden removes a purely decorative icon
// from the accessibility tree entirely.
<span aria-hidden="true">✨</span>`;

	return (
		<section aria-labelledby="aria-labels-heading">
			<SectionHeader
				badge="ARIA"
				title="ARIA Labels & aria-hidden"
				description="Icon-only buttons need aria-label so screen readers can announce their purpose. Decorative icons should use aria-hidden to avoid noise."
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<GoodBadLabel good={false} />
					<div className="mb-4 flex gap-3">
						{/* No aria-label — screen reader just says "button" */}
						<button
							type="button"
							className="rounded-md border border-slate-300 bg-white p-2 text-lg hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
						>
							❤️
						</button>
						<button
							type="button"
							className="rounded-md border border-slate-300 bg-white p-2 text-lg hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
						>
							🔖
						</button>
						<button
							type="button"
							className="rounded-md border border-slate-300 bg-white p-2 text-lg hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
						>
							🔗
						</button>
					</div>
					<p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
						Three "button, button, button" — zero context for screen reader users.
					</p>
					<CodeBlock code={badCode} />
				</Card>

				<Card>
					<GoodBadLabel good={true} />
					<div className="mb-4 flex gap-3">
						<button
							type="button"
							aria-label={liked ? 'Unlike post' : 'Like post'}
							aria-pressed={liked}
							onClick={() => setLiked((l) => !l)}
							className={`rounded-md border p-2 text-lg transition-colors ${
								liked
									? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
									: 'border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800'
							}`}
						>
							{liked ? '❤️' : '🤍'}
						</button>
						<button
							type="button"
							aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
							aria-pressed={bookmarked}
							onClick={() => setBookmarked((b) => !b)}
							className={`rounded-md border p-2 text-lg transition-colors ${
								bookmarked
									? 'border-primary-300 bg-primary-50 dark:border-primary-700 dark:bg-primary-900/20'
									: 'border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800'
							}`}
						>
							{bookmarked ? '🔖✓' : '🔖'}
						</button>
						<button
							type="button"
							aria-label="Copy link"
							className="rounded-md border border-slate-300 bg-white p-2 text-lg hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
						>
							🔗
						</button>
					</div>
					<p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
						Hover or focus each button — inspect the accessible name. Screen reader says: "Like post, button" / "Copy link, button".
					</p>
					<CodeBlock code={goodCode} />
				</Card>
			</div>
		</section>
	);
}

// ─── Demo 5: Focus Management (Modal) ────────────────────────────────────────

function FocusManagementDemo() {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDialogElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	// Move focus into the modal when it opens; return it when it closes.
	useEffect(() => {
		if (isOpen && modalRef.current) {
			const focusable = modalRef.current.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			);
			focusable[0]?.focus();
		} else {
			triggerRef.current?.focus();
		}
	}, [isOpen]);

	// Trap focus inside the modal while it is open, using a document-level listener.
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
				return;
			}
			if (e.key !== 'Tab' || !modalRef.current) return;

			const focusable = Array.from(
				modalRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				),
			);
			const first = focusable[0];
			const last = focusable.at(-1);

			if (!last) return;
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);

	const codeSnippet = `// Focus moves INTO modal on open
useEffect(() => {
  if (isOpen) firstFocusable?.focus();
  else triggerRef.current?.focus(); // return focus on close
}, [isOpen]);

// Focus trap: cycle Tab within modal
const handleKeyDown = (e) => {
  if (e.key === 'Escape') { close(); return; }
  if (e.key !== 'Tab') return;
  if (e.shiftKey && activeEl === first) { e.preventDefault(); last.focus(); }
  if (!e.shiftKey && activeEl === last)  { e.preventDefault(); first.focus(); }
};

<div role="dialog" aria-modal="true"
     aria-labelledby="dialog-title"
     onKeyDown={handleKeyDown}>
  <h2 id="dialog-title">Confirm Delete</h2>
  ...
</div>`;

	return (
		<section aria-labelledby="focus-mgmt-heading">
			<SectionHeader
				badge="Focus Management"
				title="Modal Focus Trap"
				description="When a modal opens, focus must move into it and be trapped there. Tab cycles through focusable elements inside. Escape closes and returns focus to the trigger."
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
						Open the modal, then use <kbd className="rounded border border-slate-300 bg-slate-100 px-1 py-0.5 text-xs dark:border-slate-600 dark:bg-slate-800">Tab</kbd> — focus stays inside. Press <kbd className="rounded border border-slate-300 bg-slate-100 px-1 py-0.5 text-xs dark:border-slate-600 dark:bg-slate-800">Esc</kbd> to close.
					</p>
					<Button ref={triggerRef} variant="primary" onClick={() => setIsOpen(true)}>
						Open Modal
					</Button>

					{isOpen && (
						<div
							className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
							aria-hidden="false"
						>
							<dialog
								ref={modalRef}
								open
								aria-labelledby="dialog-title"
								className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border-0 dark:bg-slate-900"
							>
								<h2
									id="dialog-title"
									className="text-lg font-bold text-slate-900 dark:text-slate-100"
								>
									Confirm Delete
								</h2>
								<p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
									Are you sure you want to delete this item? This action cannot be undone.
								</p>
								<div className="mt-2">
									<label
										htmlFor="reason-input"
										className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
									>
										Reason (optional)
									</label>
									<input
										id="reason-input"
										type="text"
										className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
										placeholder="Optional reason…"
									/>
								</div>
								<div className="mt-4 flex justify-end gap-2">
									<Button variant="secondary" onClick={() => setIsOpen(false)}>
										Cancel
									</Button>
									<Button variant="danger" onClick={() => setIsOpen(false)}>
										Delete
									</Button>
								</div>
</dialog>
						</div>
					)}
				</Card>

				<Card>
					<CodeBlock code={codeSnippet} />
				</Card>
			</div>
		</section>
	);
}

// ─── Demo 6: ARIA Live Regions ────────────────────────────────────────────────

function AriaLiveDemo() {
	const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

	const simulate = (willFail = false) => {
		setStatus('loading');
		setTimeout(() => {
			setStatus(willFail ? 'error' : 'done');
		}, 1500);
	};

	const statusBorderClasses: Record<typeof status, string> = {
		idle: 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800/50',
		loading: 'border-primary-300 bg-primary-50 text-primary-700 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-400',
		done: 'border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-400',
		error: 'border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400',
	};
	const statusBorderClass = statusBorderClasses[status];

	const statusMessages: Record<typeof status, string> = {
		idle: '',
		loading: 'Loading posts, please wait…',
		done: '5 new posts loaded successfully.',
		error: 'Failed to load posts. Please try again.',
	};
	const statusMessage = statusMessages[status];

	const codeSnippet = `// aria-live="polite" waits for user to be idle
// before announcing the message.
// aria-atomic="true" reads the whole region at once.
<div
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"   // visually hidden but read aloud
>
  {statusMessage}
</div>

// Use aria-live="assertive" only for critical errors
// that need immediate interruption.`;

	return (
		<section aria-labelledby="aria-live-heading">
			<SectionHeader
				badge="ARIA Live"
				title="Dynamic Content Announcements"
				description="When content changes asynchronously (loading data, errors, notifications), use aria-live to announce updates to screen reader users who can't see the visual change."
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<div className="space-y-4">
						<p className="text-sm text-slate-700 dark:text-slate-300">
							Press a button. If you were using a screen reader, it would announce the status change automatically — even though you never moved focus.
						</p>

						<div className="flex flex-wrap gap-2">
							<Button
								variant="primary"
								disabled={status === 'loading'}
								onClick={() => simulate(false)}
							>
								{status === 'loading' ? 'Loading…' : 'Load Posts'}
							</Button>
							<Button
								variant="danger"
								disabled={status === 'loading'}
								onClick={() => simulate(true)}
							>
								Simulate Error
							</Button>
						</div>

						{/* Visually shown status */}
						<div
						className={`min-h-[40px] rounded-md border px-3 py-2 text-sm ${statusBorderClass}`}
						>
							{statusMessage || 'No status yet'}
						</div>

						{/* The aria-live region — this is what screen readers actually read */}
						<div aria-live="polite" aria-atomic="true" className="sr-only">
							{statusMessage}
						</div>
					</div>
				</Card>

				<Card>
					<CodeBlock code={codeSnippet} />
				</Card>
			</div>
		</section>
	);
}

// ─── Demo 7: ARIA in Forms (aria-required, aria-invalid, aria-describedby) ──

function AriaFormsDeepDiveDemo() {
	const passwordId = useId();
	const passwordHintId = useId();
	const passwordErrorId = useId();
	const [password, setPassword] = useState('');
	const [touched, setTouched] = useState(false);

	const isValid = password.length >= 8;
	const isTooShort = password.length > 0 && password.length < 8;
	let passwordBorderClass = 'border-slate-300 dark:border-slate-600';
	if (isTooShort) { passwordBorderClass = 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'; }
	else if (isValid) { passwordBorderClass = 'border-green-500 dark:border-green-600'; }

	const codeSnippet = `<label htmlFor={passwordId}>Password *</label>

<input
  id={passwordId}
  type="password"
  aria-required="true"
  aria-invalid={isTooShort}           // announces as "invalid"
  aria-describedby={
    [passwordHintId,
     isTooShort ? passwordErrorId : null]
      .filter(Boolean).join(' ')
  }
/>

// Help text — always visible
<p id={passwordHintId}>
  Must be at least 8 characters.
</p>

// Error — only shown when invalid
{isTooShort && (
  <p id={passwordErrorId} role="alert">
    Password is too short.
  </p>
)}`;

	return (
		<section aria-labelledby="aria-forms-heading">
			<SectionHeader
				badge="ARIA in Forms"
				title="aria-required, aria-invalid & aria-describedby"
				description="ARIA attributes give screen reader users the same context sighted users get visually — required fields, validation errors, and help text."
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
						<label
							htmlFor={passwordId}
							className="block text-sm font-medium text-slate-700 dark:text-slate-300"
						>
							Password{' '}
							<span aria-hidden="true" className="text-red-500">
								*
							</span>
						</label>
						<input
							id={passwordId}
							type="password"
						className={`w-full rounded-md border px-3 py-2 text-sm dark:bg-slate-800 dark:text-slate-100 ${passwordBorderClass}`}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onBlur={() => setTouched(true)}
							aria-required="true"
							aria-invalid={touched && isTooShort}
							aria-describedby={touched && isTooShort ? `${passwordHintId} ${passwordErrorId}` : passwordHintId}
							placeholder="Enter password…"
						/>
						<p id={passwordHintId} className="text-xs text-slate-500 dark:text-slate-400">
							Must be at least 8 characters.
						</p>
						{touched && isTooShort && (
							<p id={passwordErrorId} role="alert" className="text-xs font-medium text-red-500">
								Password is too short — needs {8 - password.length} more character(s).
							</p>
						)}
						{isValid && (
							<output className="block text-xs font-medium text-green-600 dark:text-green-400">
								Password strength looks good!
							</output>
						)}
					</form>
				</Card>

				<Card>
					<CodeBlock code={codeSnippet} />
				</Card>
			</div>
		</section>
	);
}

// ─── Demo 8: Testing Accessibility ───────────────────────────────────────────

function TestingDemo() {
	const unitTestCode = `// jest-axe: automated accessibility checks
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('LoginForm has no accessibility violations', async () => {
  const { container } = render(<LoginForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`;

	const ciCode = `# .github/workflows/accessibility.yml
name: Accessibility CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test -- --testPathPattern="a11y"`;

	return (
		<section aria-labelledby="testing-heading">
			<SectionHeader
				badge="Testing"
				title="Automated & Manual Testing"
				description="Use jest-axe for unit tests, Lighthouse/axe DevTools for audits, and always do a keyboard-only pass before shipping."
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card title="Unit Test with jest-axe">
					<CodeBlock code={unitTestCode} />
				</Card>
				<Card title="CI Integration">
					<CodeBlock code={ciCode} />
					<ul className="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
						<li>
							<strong>Lighthouse</strong> — built into Chrome DevTools, gives a 0–100 score
						</li>
						<li>
							<strong>axe DevTools</strong> — deeper analysis with severity + fix suggestions
						</li>
						<li>
							<strong>NVDA / VoiceOver</strong> — real screen reader, manual test
						</li>
						<li>
							<strong>Keyboard-only test</strong> — unplug your mouse for 5 minutes
						</li>
					</ul>
				</Card>
			</div>
		</section>
	);
}

// ─── Takeaways ────────────────────────────────────────────────────────────────

function Takeaways() {
	const items = [
		{ rule: 'Always use semantic HTML', detail: '<header>, <main>, <nav>, <footer>, <button>, <label>' },
		{ rule: 'Never use <div> for interactions', detail: 'Use <button> for clicks, <a> for navigation' },
		{ rule: 'Label every form field', detail: '<label htmlFor> + aria-required + aria-invalid + aria-describedby' },
		{ rule: 'ARIA is a last resort', detail: 'Use native HTML first; add ARIA only when HTML falls short' },
		{ rule: 'Manage focus for dynamic UI', detail: 'Modals, drawers, toasts — always move and trap focus deliberately' },
		{ rule: 'Announce async changes', detail: 'aria-live="polite" for updates, "assertive" only for urgent errors' },
		{ rule: 'Test with keyboard & screen reader', detail: 'Automate with jest-axe; audit with Lighthouse + axe DevTools' },
	];

	return (
		<section aria-labelledby="takeaways-heading">
			<h2
				id="takeaways-heading"
				className="text-xl font-bold text-slate-900 dark:text-slate-100"
			>
				Key Takeaways
			</h2>
			<ul className="mt-4 space-y-2">
				{items.map(({ rule, detail }) => (
					<li
						key={rule}
						className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
					>
						<span aria-hidden="true" className="mt-0.5 text-green-500">✓</span>
						<span className="text-sm text-slate-700 dark:text-slate-300">
							<strong>{rule}</strong> — {detail}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccessibilityExample() {
	return (
		<div className="w-full">
			{/* Skip navigation link — the first focusable element on the page */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:bg-slate-900 dark:focus:text-primary-300"
			>
				Skip to main content
			</a>

			<main id="main-content" className="mx-auto w-full max-w-4xl space-y-12 px-4 pb-16">
				{/* Page header */}
				<header className="text-center">
					<p className="text-sm font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
						React Accessibility
					</p>
					<h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
						Foundations of Accessibility
					</h1>
					<p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
						Every demo below is interactive. Use your keyboard to explore — if any example breaks keyboard navigation, that's the lesson.
					</p>
				</header>

				<SemanticHTMLDemo />
				<AccessibleButtonDemo />
				<FormsDemo />
				<AriaLabelsDemo />
				<FocusManagementDemo />
				<AriaLiveDemo />
				<AriaFormsDeepDiveDemo />
				<TestingDemo />
				<Takeaways />
			</main>
		</div>
	);
}

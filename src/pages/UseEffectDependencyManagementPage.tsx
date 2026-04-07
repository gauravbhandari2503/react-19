import DOMPurify from 'dompurify'
import { marked } from 'marked'
import useEffectDependencyManagementMarkdown from '../../docs/React-internal-architecture/useEffect&DependencyManagement.md?raw'

const renderedHtml = DOMPurify.sanitize(
  marked.parse(useEffectDependencyManagementMarkdown, {
    gfm: true,
    breaks: true,
  }) as string,
)

export default function UseEffectDependencyManagementPage() {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
            React Internal Architecture
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            useEffect & Dependency Management
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-slate-400">
            This page renders the markdown document as sanitized HTML inside the app.
          </p>
        </header>

        <article
          className="markdown-doc rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      </div>
    </section>
  )
}
import { readFile } from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Hook, CATEGORY_COLORS, EVENT_COLORS } from "@/app/types"

type Props = {
  params: Promise<{ id: string }>
}

const getHooks = async (): Promise<Hook[]> => {
  const filePath = path.join(process.cwd(), "public", "hooks.json")
  const raw = await readFile(filePath, "utf-8")
  return JSON.parse(raw) as Hook[]
}

export const generateStaticParams = async () => {
  const hooks = await getHooks()
  return hooks.map((h) => ({ id: h.id }))
}

export default async function HookDetailPage({ params }: Props) {
  const { id } = await params
  const hooks = await getHooks()
  const hook = hooks.find((h) => h.id === id)

  if (!hook) notFound()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          aria-label="Back to all hooks"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          All hooks
        </Link>

        {/* Card */}
        <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_COLORS[hook.category]}`}
            >
              {hook.category}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${EVENT_COLORS[hook.event]}`}
            >
              {hook.event}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {hook.name}
          </h1>

          {/* Description */}
          <p className="mb-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {hook.description}
          </p>

          <hr className="mb-8 border-zinc-100 dark:border-zinc-800" />

          {/* Meta */}
          <dl className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div>
              <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                Author
              </dt>
              <dd>
                <a
                  href={`https://github.com/${hook.author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                  aria-label={`View ${hook.author}'s GitHub profile`}
                >
                  @{hook.author}
                </a>
              </dd>
            </div>

            <div>
              <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                Event
              </dt>
              <dd className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{hook.event}</dd>
            </div>

            <div>
              <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                Category
              </dt>
              <dd className="text-sm text-zinc-700 dark:text-zinc-300">{hook.category}</dd>
            </div>
          </dl>

          <hr className="my-8 border-zinc-100 dark:border-zinc-800" />

          {/* CTA */}
          <a
            href={hook.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            aria-label={`View source repository for ${hook.name} on GitHub`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View on GitHub
          </a>
        </article>
      </div>
    </div>
  )
}

import { readFile } from "fs/promises"
import path from "path"
import { Hook } from "@/app/types"
import HookGrid from "@/app/components/HookGrid"

const getHooks = async (): Promise<Hook[]> => {
  const filePath = path.join(process.cwd(), "public", "hooks.json")
  const raw = await readFile(filePath, "utf-8")
  return JSON.parse(raw) as Hook[]
}

export default async function Home() {
  const hooks = await getHooks()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Claude Hooks Hub
          </h1>
          <p className="max-w-2xl text-base text-zinc-500 dark:text-zinc-400">
            Discover and explore community-built hooks for{" "}
            <a
              href="https://docs.anthropic.com/en/docs/claude-code/hooks"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              Claude Code
            </a>
            . Hooks are shell commands that run automatically at key points in Claude&apos;s lifecycle.
          </p>
        </header>

        {/* Grid with search and filter */}
        <HookGrid hooks={hooks} />
      </div>
    </div>
  )
}

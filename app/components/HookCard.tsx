import Link from "next/link"
import { Hook, CATEGORY_COLORS } from "@/app/types"

type HookCardProps = {
  hook: Hook
}

const HookCard = ({ hook }: HookCardProps) => {
  return (
    <Link
      href={`/hooks/${hook.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      aria-label={`View details for ${hook.name}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
          {hook.name}
        </h2>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[hook.category]}`}
        >
          {hook.category}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
        {hook.description}
      </p>

      <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
        <span className="font-mono">@{hook.author}</span>
        <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono dark:bg-zinc-800">
          {hook.event}
        </span>
      </div>
    </Link>
  )
}

export default HookCard

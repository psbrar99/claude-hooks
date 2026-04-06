export type HookCategory =
  | "Safety"
  | "Formatting"
  | "Notifications"
  | "Logging"
  | "Validation"
  | "Automation"
  | "Security"
  | "Custom"

export type HookEvent =
  | "PreToolUse"
  | "PostToolUse"
  | "UserPromptSubmit"
  | "Stop"
  | "SubagentStop"
  | "SessionEnd"

export type Hook = {
  id: string
  name: string
  description: string
  category: HookCategory
  repoUrl: string
  author: string
  event: HookEvent
}

export const ALL_CATEGORIES: HookCategory[] = [
  "Safety",
  "Formatting",
  "Notifications",
  "Logging",
  "Validation",
  "Automation",
  "Security",
  "Custom",
]

export const CATEGORY_COLORS: Record<HookCategory, string> = {
  Safety: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Formatting: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Notifications: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Logging: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Validation: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Automation: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  Security: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Custom: "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
}

export const EVENT_COLORS: Record<HookEvent, string> = {
  PreToolUse: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  PostToolUse: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  UserPromptSubmit: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Stop: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  SubagentStop: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  SessionEnd: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
}

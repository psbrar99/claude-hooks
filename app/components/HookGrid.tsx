"use client"

import { useState, useMemo } from "react"
import { Hook, HookCategory, ALL_CATEGORIES } from "@/app/types"
import HookCard from "@/app/components/HookCard"

type HookGridProps = {
  hooks: Hook[]
}

const HookGrid = ({ hooks }: HookGridProps) => {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<HookCategory | null>(null)

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()
    return hooks.filter((hook) => {
      const matchesCategory = activeCategory === null || hook.category === activeCategory
      const matchesSearch =
        query === "" ||
        hook.name.toLowerCase().includes(query) ||
        hook.description.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [hooks, search, activeCategory])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleCategoryClick = (category: HookCategory | null) => {
    setActiveCategory(category)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setSearch("")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search hooks…"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          aria-label="Search hooks by name or description"
          className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
      </div>

      {/* Category filter */}
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
      >
        <button
          onClick={() => handleCategoryClick(null)}
          aria-pressed={activeCategory === null}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
            activeCategory === null
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
          }`}
        >
          All
        </button>

        {ALL_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            aria-pressed={activeCategory === category}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
              activeCategory === category
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        {filtered.length === hooks.length
          ? `${hooks.length} hooks`
          : `${filtered.length} of ${hooks.length} hooks`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hook) => (
            <HookCard key={hook.id} hook={hook} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
          <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">No hooks found</p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Try a different search term or category
          </p>
        </div>
      )}
    </div>
  )
}

export default HookGrid

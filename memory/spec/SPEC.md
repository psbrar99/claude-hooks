# Claude Hooks Hub — MVP Spec

## Overview

Claude Hooks Hub is a browsable directory for discovering and exploring Claude Code hooks. Hooks are user-defined shell commands that execute automatically at specific points in Claude Code's lifecycle (e.g., before/after tool use, on prompt submit, on session end). The hub aggregates hooks from GitHub repositories and presents them in a searchable, categorized grid.

## Hook Data Model

Each hook entry has the following fields:

| Field         | Type     | Required | Description                                      |
|---------------|----------|----------|--------------------------------------------------|
| `id`          | string   | yes      | Unique identifier (slug)                         |
| `name`        | string   | yes      | Display name of the hook                         |
| `description` | string   | yes      | Short description of what the hook does          |
| `category`    | string   | yes      | Category the hook belongs to (see below)         |
| `repoUrl`     | string   | yes      | Link to the GitHub repository containing the hook|
| `author`      | string   | yes      | GitHub username or org                           |
| `event`       | string   | yes      | Hook lifecycle event (e.g., PreToolUse, PostToolUse) |

### Categories

| Category        | Description                                           |
|-----------------|-------------------------------------------------------|
| Safety          | Prevent destructive actions (force push, rm -rf, etc) |
| Formatting      | Auto-format, lint, or clean up code                   |
| Notifications   | Send alerts via Slack, desktop, email, etc            |
| Logging         | Log tool usage, prompts, or session activity          |
| Validation      | Validate code, configs, or output before proceeding   |
| Automation      | Auto-commit, auto-test, CI triggers                   |
| Security        | Secret scanning, dependency checks, permission guards |
| Custom          | Anything that doesn't fit the above                   |

### Hook Events

| Event               | Description                              |
|---------------------|------------------------------------------|
| PreToolUse          | Before a tool is executed                |
| PostToolUse         | After a tool completes                   |
| UserPromptSubmit    | When the user submits a prompt           |
| Stop                | When Claude finishes responding          |
| SubagentStop        | When a subagent finishes                 |
| SessionEnd          | When the session terminates              |

## MVP Features

### 1. Home Page — Hook Grid

- Display all hooks in a responsive card grid
- Each card shows: name, category badge, short description, author
- Clicking a card navigates to the hook detail page

### 2. Category Filtering

- Filter bar or sidebar with category pills/buttons
- Clicking a category filters the grid to show only matching hooks
- "All" option to reset the filter

### 3. Search

- Text input at the top of the page
- Searches across hook name and description
- Results update the grid in real time (client-side filter)

### 4. Hook Detail Page

- Full description of the hook
- Category and event badges
- Link to the source GitHub repository
- Author info with link to GitHub profile

## Pages

| Route              | Description                     |
|--------------------|---------------------------------|
| `/`                | Home — hook grid with search and category filter |
| `/hooks/[id]`     | Hook detail page                |

## Data Source

Hooks are stored as a static JSON file (`hooks.json`) shipped with the app. No backend or database for MVP. New hooks are added via pull request to the repository.

## Out of Scope (MVP)

- User accounts / authentication
- Hook submission form
- Ratings, reviews, or favorites
- Hook installation / copy-to-clipboard automation
- API endpoints
- Server-side search or pagination

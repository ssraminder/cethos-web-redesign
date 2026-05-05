# CLAUDE.md — Claude Code Project Instructions

This is the **Cethos main web** codebase — the public-facing marketing and services site for Cethos Translation Services (cethos.com). Next.js with internationalized routing under `app/[locale]/`, plus Supabase edge functions under `supabase/functions/`.

## Project memory (read at session start, update before commit)

This repository has a project-local memory system at `/memory/`:

- `memory/user.md` — primary user profile (role, context, working style)
- `memory/people.md` — team, stakeholders, vendors, clients referenced in conversations
- `memory/preferences.md` — captured preferences for code, communication, tooling
- `memory/decisions.md` — architectural, product, and business decisions with rationale

**At the start of every session:** read all four files before doing substantive work. They carry context from prior sessions that won't be in your conversation history.

**Before every `git commit`:** update the relevant memory file(s) with anything new from this session — new decisions, preferences confirmed, people introduced, or shifts in the user's context. Stage the memory updates as part of the same commit so context is version-controlled with the code.

If a memory file is stale or contradicts current reality, fix it rather than just appending.

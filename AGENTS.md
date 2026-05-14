# Agents

This file provides guidance to coding agents when working with code in this repository.

## Project

keephero — next-generation bookmarking and read-it-later service. pnpm workspace with `agent`, `browser`, `database`, `engine`, `logger`, `mobile`, and `website` packages; root scripts orchestrate the workspace.

## General

- **Never commit unless asked to**
- **Never add co-authored by Claude Code to commits!**
- **Never push main or pull requests to origin unless asked to**
- Prioritize using LSP capabilities if possible
- When resolving a TODO, follow its instructions literally
- Run type checking as part of your tasks
- Run specs as part of your tasks
- Run linting as part of your tasks
- Start plan from a summary a new/updated API summary (models/signatures) and most challenging points, continue plan using your default settings

## Commands

- Run `pnpm install` to install all dependencies
- Run `pnpm lint` to lint the code using Biome
- Run `pnpm format` to auto-fix formatting issues with Biome
- Run `pnpm type` to check TypeScript types across workspaces
- Run `pnpm spec` to run the Vitest tests
- Run `pnpm exec vitest run path/to/test.ts` to run a single test
- Run `pnpm test` to run lint + type + spec (used by CI)
- Run `pnpm start` to start the engine and website in parallel
- Run `pnpm build` to build all packages except `browser` and `portal`

## Formats

- Use 2-space indentation, UTF-8 encoding, and LF line endings
- Use PascalCase for classes and interfaces, and camelCase for methods and variables
- Place high-level public items first in a file and low-level private items last
- Use ES modules with full import paths including the ".ts(x)" file extension

## Types

- Use strict TypeScript with null checks but don't add explicit return types to functions
- Never use TypeScript `any`, type casting `as`, or `!` without permission

## Specs

- Place unit tests in `<module>.unit.ts` files and don't add useless comments like "Arrange", "Act", "Assert"

## Docs

- Add Typedoc comments only for public APIs and don't add them for files or use @params directives
- Add brief docstrings for exporter functions and models (explain what it does)
- Don't write `//` comments in the code

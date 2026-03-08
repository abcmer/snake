# Next.js Migration

This project has been migrated to Next.js.

The new Next.js project is located at: ../snake-nextjs

## Migration notes
- Node version: 20 (via nvm)
- Next.js version: 16 (App Router)
- Original framework: Create React App (React 16, class components)
- Dependencies added: bootstrap (preserved from original)
- Grid component converted from class component to TypeScript class component with 'use client' directive
- Cell component converted to functional TypeScript component with 'use client' directive
- window.innerHeight access guarded with typeof window check for SSR safety

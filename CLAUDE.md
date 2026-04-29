# FORGE — Project Constitution

## Project Overview
FORGE is an AI Brand Operating System. Users input a business idea and get market intelligence, brand identity, product strategy, and growth direction powered by Gemini AI.

## Tech Stack
- Vite + React + TypeScript (frontend, already built)
- Tailwind CSS + shadcn/ui components
- Supabase for auth and database
- Google Gemini API for all AI features
- Cloudflare Pages for hosting

## Coding Rules
- Always use TypeScript, never plain JS
- Never use `any` type
- All Supabase calls must handle errors explicitly
- Never expose API keys in client code — use VITE_ prefix only for public keys
- All AI calls go through a dedicated service file: src/services/gemini.ts
- All Supabase calls go through: src/services/supabase.ts
- Use React Context for auth state — never prop drill auth
- Every protected route must check auth before rendering

## File Structure
src/
  services/
    supabase.ts       ← Supabase client + all DB functions
    gemini.ts         ← All Gemini AI calls
  contexts/
    AuthContext.tsx   ← Global auth state
  pages/             ← Already exists
  components/        ← Already exists

## Environment Variables
VITE_SUPABASE_URL — Supabase project URL
VITE_SUPABASE_ANON_KEY — Supabase public anon key
VITE_GEMINI_API_KEY — Google Gemini API key

## Current Build Status
- Frontend: COMPLETE (all pages built, all static/hardcoded)
- Auth: NOT CONNECTED (login/signup navigate directly, no real auth)
- Database: NOT CONNECTED
- AI engines: NOT CONNECTED (fake loading animations only)
- Payments: NOT STARTED

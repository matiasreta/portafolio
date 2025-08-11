# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start development server (Next.js on port 3000)
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**No test scripts are configured in package.json**

## Project Architecture

This is a Next.js 15 portfolio application with TypeScript and Tailwind CSS featuring:

### Core Architecture
- **App Router**: Uses Next.js 13+ App Router (`src/app/`)
- **Chat System**: Interactive portfolio with AI-powered chat functionality
- **State Management**: React Context for chat state (`ChatContext`)
- **API Integration**: Axios-based HTTP client with backend at `https://portafolio-backend-c246.onrender.com`

### Key Components Structure
- **Layout Flexibility**: Dynamic layout that changes based on chat state
  - Centered layout when no messages (landing page)  
  - Fixed toolbar layout when chat is active
- **Drag-to-Scroll**: Custom mouse-based horizontal scrolling for project cards
- **Real-time Chat**: Message display with loading states and markdown support

### State Management Pattern
The app uses a centralized chat context (`ChatContext`) that manages:
- `messages[]` - Array of chat messages with user and bot responses
- `addMessage()` - Add new messages to the chat
- `updateMessage()` - Update existing messages (for streaming responses)
- `clearMessages()` - Reset chat state

### API Layer
- **Base Client**: Axios instance configured with 30s timeout and retry logic
- **Custom Hook**: `useApi` hook provides retry mechanism and loading states
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Component Conventions
Following Spanish naming conventions from `.cursor/rules/RULES.md`:
- Files: `kebab-case.tsx` 
- Components: `PascalCase`
- Variables: `camelCase`
- Props interfaces: `ComponentNameProps`

### Styling Approach
- **Tailwind CSS**: Primary styling framework with custom configuration
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Component Styling**: Utility-first approach with conditional classes

### Data Flow
1. User interacts with `Toolbar` component (not analyzed but referenced)
2. Messages flow through `ChatContext` 
3. `Chat` component displays messages with ReactMarkdown rendering
4. API calls handled by `useApi` hook with automatic retry logic

## Important Notes

- The application has no API routes configured locally
- Backend is hosted on Render (external service)
- Spanish locale is used throughout (`es-AR`)
- Drag-to-scroll functionality requires mouse events (not touch-optimized)
- Chat messages support markdown rendering via `react-markdown`
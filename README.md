# Rock Paper Scissors Frontend

React frontend for a Rock Paper Scissors tournament app. It includes auth pages,
a tournament lobby, bracket display, leaderboard, profile statistics, and
Socket.IO helpers for real-time game events.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the Vite development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

- `src/components/Auth` contains login and signup screens.
- `src/components/Game` contains the core game UI pieces.
- `src/components/Tournament` contains lobby, bracket, and matchup views.
- `src/components/Dashboard` contains leaderboard, profile, and statistics.
- `src/services` contains API and websocket clients.

The frontend expects the API server at `http://localhost:5000` by default.

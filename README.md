# Portfolio

This project is a personal portfolio website with a separate frontend and backend.

## Repository layout

- `frontend/` — contains the public website files: `index.html`, `style.css`, `script.js`, and assets.
- `backend/` — contains the Express backend, `server.js`, and Node dependencies.
- `archive/` — stores duplicate legacy files from the previous project layout.

## Run locally

1. Open a terminal in the `backend/` directory.
2. Install dependencies (if not already installed):
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## Notes

- The backend serves the frontend static files from `frontend/`.
- Contact form submissions are sent to `/submit` and saved to MySQL if available.
- If MySQL is unavailable, submissions are saved locally to `backend/messages.json`.

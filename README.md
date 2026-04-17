# Career Probability Score (CPS) Platform

A platform for assessing career readiness and providing intelligent insights.

## Project Structure

- `Backend/`: Node.js/Express API with MongoDB.
- `Frontend/`: React application with Vite, Tailwind CSS, and Shadcn UI.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or a remote URI)

### Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your configuration.
5. Seed the admin user (optional):
   ```bash
   npm run seed
   ```
6. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   echo "VITE_BACKEND_URL=http://localhost:5000" > .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

- Backend: Run `node test_api.js` while the server is running.
- Frontend: Run `npm test` or `npm run lint`.

## Audit and Improvements Report

The following issues were identified and fixed during the repository audit:

1.  **Hallucinated Dependencies:**
    - Fixed `package.json` in both `Backend` and `Frontend` which contained non-existent versions of packages (e.g., `vite@^8.0.0`, `vitest@^4.1.0`). Downgraded to stable, compatible versions.
    - Resolved peer dependency conflicts between `vite` and `lovable-tagger`.

2.  **Missing Configuration Templates:**
    - Created `Backend/.env.example` to provide a template for required environment variables.

3.  **Fragile Database Connection:**
    - Improved `Backend/config/db.js` to provide clear error messages when `MONGO_URI` is missing.

4.  **Lack of Type Safety in API Layer:**
    - Introduced TypeScript interfaces for `LeadData`, `AdminCredentials`, and `CounselingData` in `Frontend/src/lib/api.ts` to replace `any` types.

5.  **Linting Issues:**
    - Fixed empty block statement in `AdminCourseManagement.tsx`.
    - Reduced overall linting warnings/errors.

6.  **Test Reliability:**
    - Updated `Backend/test_api.js` to check if the server is running before executing tests, providing helpful instructions if it's not.

7.  **Documentation:**
    - Added this root `README.md` with setup instructions and an audit report.

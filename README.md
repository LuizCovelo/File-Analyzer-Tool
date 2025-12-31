# Lead Gen B2B - Google Maps & Places

This tool helps find businesses without websites but with contact info for B2B prospecting.

## Features
- **Search by Region**: Google Places API Text Search.
- **Filters**: Category, Radius, Result Limit.
- **Quality Control**: Automatically filters out businesses with websites. Must have phone/WhatsApp.
- **Export**: Export leads to Google Sheets.
- **Dashboard**: Track searches and leads.

## Setup

### 1. Google API Keys
This project requires Google Maps Places API and (optional) Google Sheets API.
Add the following to your Replit Secrets or `.env`:

- `GOOGLE_MAPS_API_KEY`: Your Google Cloud API Key with "Places API (New)" enabled.
- `GOOGLE_SHEETS_CREDENTIALS`: (Optional) JSON credentials for Service Account if using Sheets Export.

### 2. Install Dependencies
Dependencies are installed automatically.

### 3. Run
`npm run dev`

## Usage
1. Open the dashboard.
2. Enter "Region" (e.g., "Brooklyn, NY") and "Category" (e.g., "Plumbers").
3. Click "Iniciar Busca".
4. View results in the table.
5. Click "Exportar" to send to Google Sheets (requires configuration).

## Tech Stack
- Frontend: React + Vite + Shadcn UI
- Backend: Node.js + Express
- Database: PostgreSQL (Drizzle ORM)

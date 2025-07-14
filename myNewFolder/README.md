# Design Document: Minimal URL Shortener

### 1. Architecture

This is a client-side Single-Page Application (SPA) built with **React** and **TypeScript**. All logic and data storage is handled in the browser.

* **Technology**: React for the UI, `react-router-dom` for navigation, and `localStorage` for data persistence.
* **Styling**: Plain **Vanilla CSS** is used for simplicity and to avoid external UI libraries.

### 2. Data Model

Data is stored in `localStorage` as a JSON array of objects.

```typescript
interface UrlData {
  id: string;
  longUrl: string;
  shortCode: string;
  createdAt: string;
  expiresAt: string;
  clicks: { timestamp: string }[];
}
```

### 3. Routing

* `/`: The main page for creating short URLs.
* `/stats`: A page to display statistics for all created URLs.
* `/:shortCode`: A dynamic route that handles the redirection logic.
# MarketLens AI

MarketLens AI is a full-stack marketing report generator. The frontend lets an admin manage clients, upload monthly analytics files, generate reports, and view report history. The backend receives uploaded CSV/XLSX files, detects the marketing platform, normalizes the data, calculates analytics, creates charts and insights, generates a client PDF report, and stores report metadata in MySQL.

## Tech Stack

- Frontend: React, Vite, React Router, Material UI, Axios, Recharts
- Backend: Node.js, Express, Multer, CSV Parser, XLSX, MySQL2, PDFKit, Chart.js / chartjs-node-canvas
- Database: MySQL

## Current Processing Flow

1. User manages clients in the frontend.
2. User selects a client and report month.
3. User uploads one or more analytics files.
4. Backend stores uploads in `backend/uploads`.
5. Backend parses CSV/XLSX files.
6. Backend detects platform type such as Instagram or SEO.
7. Backend normalizes platform-specific data.
8. Backend calculates analytics, insights, recommendations, comparisons, and chart data.
9. Backend assembles a client-level report.
10. Backend generates a PDF in `backend/generated-reports`.
11. Backend saves report, service, and analytics records to MySQL.
12. Frontend shows the generated PDF link and report history.

## Important Rule

Do not invent analytics values. KPIs, charts, insights, comparisons, summaries, and recommendations must come from uploaded client data or saved historical data. When data is unavailable, return zero, `N/A`, hide the section, or show a no-data state.

## Setup

Install root dependencies if needed:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
npm run dev
```

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Backend runs on `http://localhost:5000` by default. Frontend API calls currently point to `http://localhost:5000/api`.

## Environment

`backend/config/database.js` reads these values from `backend/.env`:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=5000
```

## Root Structure

```text
marketing-report-app/
  backend/
  frontend/
  node_modules/
  package.json
  package-lock.json
  .gitignore
  README.md
```

### Root Files and Folders

- `backend/`: Express API, parsing pipeline, analytics services, PDF generation, MySQL persistence, uploaded files, and generated reports.
- `frontend/`: Vite React application for login, dashboard, client management, report generation, and report history.
- `node_modules/`: Root dependency install directory.
- `package.json`: Root-level package with shared UI dependencies.
- `package-lock.json`: Lockfile for root dependencies.
- `.gitignore`: Root ignore rules.
- `README.md`: This project documentation.

## Backend

### Backend Structure

```text
backend/
  assets/
  config/
  controllers/
  database/
  generated-reports/
  middleware/
  node_modules/
  routes/
  services/
  templates/
  uploads/
  utils/
  .env
  .gitignore
  package.json
  package-lock.json
  server.js
```

### Backend Top-Level Files and Folders

- `assets/`: Static backend assets used by generated reports.
- `assets/logo.png`: Brand/report logo asset.
- `config/`: Runtime configuration modules.
- `controllers/`: Express request handlers.
- `database/`: SQL schema files.
- `generated-reports/`: Runtime output directory for generated PDF files.
- `middleware/`: Express middleware such as Multer upload handling.
- `node_modules/`: Backend dependency install directory.
- `routes/`: Express route definitions.
- `services/`: Core business logic for parsing, normalization, analytics, reports, PDF output, and database writes.
- `templates/`: Placeholder HTML templates for future HTML-based report rendering.
- `uploads/`: Runtime storage for raw uploaded files.
- `utils/`: Placeholder utility folder.
- `.env`: Local backend environment variables.
- `.gitignore`: Backend ignore rules.
- `package.json`: Backend scripts and dependencies. Main scripts are `npm start` and `npm run dev`.
- `package-lock.json`: Backend dependency lockfile.
- `server.js`: Main Express application. Enables CORS/JSON middleware, serves `/uploads` and `/generated-reports`, registers API routes, and starts the server.

### Backend API Routes

- `GET /`: Health/test response: `MarketLens AI Backend Running`.
- `GET /api/auth`: Placeholder auth route.
- `POST /api/upload`: Uploads and processes report files.
- `GET /api/report`: Placeholder report route.
- `GET /api/pdf/test`: Generates a test PDF from hardcoded sample data.
- `GET /api/report-history`: Returns saved report history.
- `GET /api/dashboard-stats`: Returns dashboard totals and recent reports.
- `GET /api/clients`: Lists clients.
- `POST /api/clients`: Creates a client.
- `GET /api/clients/:id`: Fetches one client.
- `PUT /api/clients/:id`: Updates one client.
- `DELETE /api/clients/:id`: Deletes one client.

### Backend Config, Database, Middleware

- `config/database.js`: Creates and exports a MySQL connection pool using `mysql2/promise` and `.env` database credentials.
- `database/schema.sql`: Defines `clients`, `reports`, `services`, `instagram_analytics`, and `seo_analytics` tables. Note: code currently also uses `report_display_name` and `client_aliases` on `clients`, so the live database needs those columns too.
- `middleware/uploadMiddleware.js`: Configures Multer disk storage in `uploads/`, gives uploaded files timestamp-based names, and allows `.csv`, `.xlsx`, `.txt`, `.pdf`, and `.docx`.

### Backend Controllers

- `controllers/uploadController.js`: Main upload pipeline. Validates files, client, month, and year; parses CSV/XLSX; filters Excel sheets by selected client aliases; detects platform; normalizes data; generates Instagram/SEO analytics; builds charts; assembles reports; generates PDF; saves report data to MySQL; returns processed files and PDF metadata.
- `controllers/clientController.js`: Handles client CRUD responses by calling database client services.
- `controllers/dashboardStatsController.js`: Returns dashboard stats from the database service.
- `controllers/reportHistoryController.js`: Returns saved report history from the database service.

### Backend Routes

- `routes/authRoutes.js`: Placeholder `GET /` route for auth status.
- `routes/clientRoutes.js`: Maps client CRUD endpoints to `clientController`.
- `routes/dashboardStatsRoutes.js`: Maps dashboard stats endpoint to `dashboardStatsController`.
- `routes/pdfRoutes.js`: Test-only PDF generation route using `clientPdfGenerator`.
- `routes/reportHistoryRoutes.js`: Maps report history endpoint to `reportHistoryController`.
- `routes/reportRoutes.js`: Placeholder report route.
- `routes/uploadRoutes.js`: Accepts multiple files from the `files` field and sends them to `uploadController.uploadFile`.

### Backend Services

#### Analytics

- `services/analytics/instagramAnalytics.js`: Calculates Instagram totals, averages, engagement rate, best post, post type counts, default comparisons, insights, and recommendations.
- `services/analytics/seoAnalytics.js`: Builds SEO client summaries from normalized SEO rows and attaches insights and recommendations.
- `services/analytics/monthComparisonEngine.js`: Shared difference, growth percent, and trend calculation helpers.
- `services/analytics/buildHistoricalComparisons.js`: Builds Instagram and SEO comparisons between current analytics and previous saved database analytics.
- `services/analytics/comparisonEngine.js`: Empty placeholder.
- `services/analytics/kpiCalculator.js`: Empty placeholder.
- `services/analytics/trendAnalyzer.js`: Empty placeholder.

#### Charts

- `services/charts/chartBuilder.js`: Builds frontend-ready chart data for Instagram post types/engagement and SEO client performance.
- `services/charts/chartConfig.js`: Empty placeholder.

#### Clients

- `services/clients/clientResolver.js`: Normalizes client names, applies hardcoded aliases, and resolves a client name from platform data.
- `services/clients/clientDataGrouper.js`: Groups processed platform files into client-level service bundles.
- `services/clients/clientReportBuilder.js`: Builds a generic client report object with overview and sections.

#### Database

- `services/database/clientService.js`: Client CRUD, client lookup, alias matching, text normalization, and find-or-create logic.
- `services/database/dashboardStatsService.js`: Counts clients, reports, distinct services, PDFs, latest report, and recent reports.
- `services/database/fetchPreviousInstagramAnalytics.js`: Finds the previous month Instagram analytics row for a client.
- `services/database/fetchPreviousSEOAnalytics.js`: Finds the previous month SEO analytics row for a client.
- `services/database/instagramAnalyticsService.js`: Saves Instagram summary metrics for a service.
- `services/database/reportHistoryService.js`: Lists saved reports with client name, month, year, PDF path, and generation time.
- `services/database/reportLookupService.js`: Finds an existing report/service for duplicate checks. Currently not active in `saveProcessedReport`.
- `services/database/reportService.js`: Creates a row in `reports`.
- `services/database/saveProcessedReport.js`: Persists generated client reports. Creates/fetches client, creates report and services, fetches previous analytics, attaches historical comparisons, and saves Instagram/SEO analytics.
- `services/database/seoAnalyticsService.js`: Saves SEO metrics for each SEO client summary.
- `services/database/serviceService.js`: Creates a row in `services`.

#### Detectors

- `services/detectors/platformDetector.js`: Detects platform from filename, sheet names, columns, and row text. Supports SEO, Instagram, Facebook, Meta Ads, Google Ads, YouTube, LinkedIn, website analytics, generic, Excel, generic documents, and unknown.

#### Insights

- `services/insights/instagramInsightsGenerator.js`: Converts Instagram analytics into readable insight strings.
- `services/insights/seoInsightsGenerator.js`: Converts SEO client summaries into per-client insight arrays.

#### Normalizers

- `services/normalizers/genericNormalizer.js`: Cleans CSV/Excel column keys and returns generic row objects.
- `services/normalizers/instagramNormalizer.js`: Maps Instagram export columns into a standard post object with numeric metrics.
- `services/normalizers/seoNormalizer.js`: Converts each Excel sheet into SEO rows with label, previous month, current month, difference, and notes.
- `services/normalizers/unifiedNormalizer.js`: Dispatches normalization by detected platform. Instagram and SEO use specific normalizers; future ad/social/web platforms currently fall back to generic normalization.
- `services/normalizers/facebookNormalizer.js`: Empty placeholder.

#### Parsers

- `services/parsers/csvParser.js`: Streams CSV files and resolves parsed rows.
- `services/parsers/excelParser.js`: Reads an Excel workbook and extracts all sheets.
- `services/parsers/sheetExtractor.js`: Converts workbook sheets into `{ sheetName, rows }` objects.

#### PDF Generation

- `services/pdf/clientPdfGenerator.js`: Creates a PDFKit document, writes all report sections, adds footers, saves the PDF to `generated-reports`, and returns file metadata.
- `services/pdf/components/chartBlock.js`: Draws a chart image inside a styled PDF card.
- `services/pdf/components/highlightBox.js`: Draws reusable highlighted text boxes.
- `services/pdf/components/kpiCard.js`: Draws KPI cards.
- `services/pdf/components/pageFooter.js`: Draws report footer with client name and page numbers.
- `services/pdf/components/pageHeader.js`: Draws report section header with brand, client, month, and year.
- `services/pdf/components/sectionDivider.js`: Draws a horizontal divider.
- `services/pdf/charts/chartImageGenerator.js`: Generates a generic bar chart image buffer.
- `services/pdf/charts/pieChartGenerator.js`: Generates a pie chart image buffer.
- `services/pdf/charts/seoChartGenerator.js`: Generates an SEO bar chart image buffer.
- `services/pdf/sections/coverPageSection.js`: Draws the PDF cover page.
- `services/pdf/sections/executiveSummarySection.js`: Draws summary highlights based on included services.
- `services/pdf/sections/serviceOverviewSection.js`: Draws service-level overview cards.
- `services/pdf/sections/insightsSection.js`: Draws strategic insights.
- `services/pdf/sections/recommendationsSection.js`: Draws strategic recommendations.
- `services/pdf/sections/comparisonSection.js`: Draws month-over-month comparison cards.
- `services/pdf/sections/instagramSection.js`: Draws Instagram KPIs, charts, content mix, insights, and recommendations.
- `services/pdf/sections/seoSection.js`: Draws SEO metrics and charts.
- `services/pdf/sections/conclusionSection.js`: Draws closing summary, focus areas, and growth outlook.
- `services/pdf/utils/pdfHelpers.js`: Older helper functions for section titles, subtitles, paragraphs, and bullet lists.

#### Recommendations

- `services/recommendations/instagramRecommendationEngine.js`: Creates Instagram recommendations from engagement rate, best post type, and posting frequency.
- `services/recommendations/seoRecommendationEngine.js`: Creates SEO recommendations from organic traffic, average position, and Google Business Profile activity.

#### Reports

- `services/reports/reportAssembler.js`: Builds a platform-level report object containing title, source file, overview, analytics, charts, and raw data.
- `services/reports/clientReportAssembler.js`: Builds the final client monthly report, filters out empty SEO data, and includes available service sections.
- `services/reports/clientPdfReportGenerator.js`: Wraps PDF generation and returns client name, services, PDF metadata, and download URL.
- `services/reports/pdfGenerator.js`: Empty placeholder.
- `services/reports/templateEngine.js`: Empty placeholder.

#### AI, Storage, Utils

- `services/ai/insightGenerator.js`: Empty placeholder.
- `services/ai/recommendationEngine.js`: Empty placeholder.
- `services/ai/summaryGenerator.js`: Empty placeholder.
- `services/storage/fileManager.js`: Empty placeholder.
- `utils/dateUtils.js`: Empty placeholder.
- `utils/helpers.js`: Empty placeholder.
- `utils/metricUtils.js`: Empty placeholder.

### Backend Templates

- `templates/genericTemplate.html`: Empty placeholder.
- `templates/seoTemplate.html`: Empty placeholder.
- `templates/socialTemplate.html`: Empty placeholder.

## Frontend

### Frontend Structure

```text
frontend/
  dist/
  node_modules/
  public/
  src/
  .gitignore
  eslint.config.js
  index.html
  package.json
  package-lock.json
  README.md
  vite.config.js
```

### Frontend Top-Level Files and Folders

- `dist/`: Vite production build output.
- `node_modules/`: Frontend dependency install directory.
- `public/`: Static assets served by Vite.
- `src/`: React application source.
- `.gitignore`: Frontend ignore rules.
- `eslint.config.js`: ESLint flat config for JS/JSX, React hooks, and Vite refresh.
- `index.html`: Vite HTML shell with `#root` and `/src/main.jsx`.
- `package.json`: Frontend scripts and dependencies.
- `package-lock.json`: Frontend dependency lockfile.
- `README.md`: Default Vite template README.
- `vite.config.js`: Vite config using the React plugin.

### Frontend Public Assets

- `public/favicon.svg`: Browser favicon.
- `public/icons.svg`: Static SVG icon asset.

### Frontend Source Files

- `src/main.jsx`: React entry point. Imports global CSS and renders `App` into `#root` inside `StrictMode`.
- `src/App.jsx`: Defines routes for `/`, `/dashboard`, `/report`, `/reports-history`, and `/clients`.
- `src/index.css`: Main stylesheet for login, dashboard, report generation, report history, and clients UI. Includes global Times New Roman styling and Material UI overrides.
- `src/App.css`: App container background/layout styles. Currently not imported by `main.jsx`.

### Frontend Pages

- `src/pages/Login.jsx`: Login screen with hardcoded admin credentials `admin@gmail.com` / `admin123`, then navigates to dashboard.
- `src/pages/Dashboard.jsx`: Dashboard page. Fetches dashboard stats, shows metric cards, sidebar navigation, recent activity, and quick insights.
- `src/pages/ReportPage.jsx`: Main report generation page. Fetches clients, accepts selected client/month/files, posts form data to `/api/upload`, and shows generated PDF preview/download links.
- `src/pages/ReportsHistory.jsx`: Fetches saved report history and shows preview/download links for generated PDFs.
- `src/pages/Clients.jsx`: Client management page. Lists clients, opens add/edit modal, creates/updates/deletes clients through `/api/clients`.

### Frontend Components

- `src/components/UploadReportForm.jsx`: Older standalone upload form that posts files/month/year directly to `/api/upload`. It is not currently routed from `App.jsx`.
- `src/components/ChartsSection.jsx`: Empty placeholder.
- `src/components/ComparisonSection.jsx`: Empty placeholder.
- `src/components/KPISection.jsx`: Empty placeholder.
- `src/components/Navbar.jsx`: Empty placeholder.
- `src/components/ReportPreview.jsx`: Empty placeholder.
- `src/components/UploadSection.jsx`: Empty placeholder.

### Frontend Services

- `src/services/api.js`: Central API helper for uploading report files, fetching report history, and fetching dashboard stats.

## Database Tables

- `clients`: Stores client records.
- `reports`: Stores report month/year, client link, generated PDF path, and creation time.
- `services`: Stores service/platform rows per report and raw file name.
- `instagram_analytics`: Stores saved Instagram summary metrics.
- `seo_analytics`: Stores saved SEO summary metrics.

## Supported Uploads

The upload middleware accepts `.csv`, `.xlsx`, `.txt`, `.pdf`, and `.docx`, but the active parser currently processes only `.csv`, `.xlsx`, and `.xls`. Other accepted file types will upload but fail processing until parsers are implemented.

## Current Notes

- Authentication is frontend-only and temporary.
- Several files are placeholders for future AI, storage, utility, template, and reusable frontend component work.
- `reportRoutes.js` and `authRoutes.js` are placeholder routes.
- `pdfRoutes.js` contains a test route with hardcoded sample data and is not the main user report-generation path.
- Runtime folders `backend/uploads`, `backend/generated-reports`, `frontend/dist`, and all `node_modules` folders are generated or environment-specific.

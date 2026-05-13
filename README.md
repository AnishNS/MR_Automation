# MarketLens AI

MarketLens AI is an AI-powered monthly report automation system built to generate professional client reports from uploaded raw analytics data.

The system supports:
- CSV
- XLSX
- DOCX
- PDF
- SEO Reports
- Instagram Analytics
- Facebook Analytics
- Generic Marketing Data

The platform processes uploaded files, extracts analytics data, normalizes metrics, generates KPIs, creates charts, produces insights, and exports professional PDF reports.

---

# Project Structure

```txt
MARKETING-REPORT-APP/
│
├── backend/
│
├── frontend/
│
├── node_modules/
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

Frontend
    =>The frontend is built using:
        1.React
        2.Vite
        3.Material UI
        4.React Router
    =>The frontend handles:
        1.login
        2.dashboard
        3.report configuration
        4.file upload UI
        5.charts
        6.KPI display
        7.report preview

Frontend Structure       
frontend/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── ChartsSection.jsx
│   │   ├── ComparisonSection.jsx
│   │   ├── KPISection.jsx
│   │   ├── Navbar.jsx
│   │   ├── ReportPreview.jsx
│   │   └── UploadSection.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── ReportPage.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js

Frontend File Responsibilities
src/main.jsx
    =>Main React entry point.
    =>Responsibilities:
        1.render React app
        2.connect App.jsx to DOM
        3.import global styles

src/App.jsx
    =>Frontend routing file.
    =>Responsibilities:
        1.manage application routes
        2.connect pages using React Router
    =>Current Routes:
        / → Login Page
        /dashboard → Dashboard
        /report → Report Generation Page

src/index.css
    =>Main global styling file.
    =>Responsibilities:
        1.global theme
        2.Times New Roman font
        3.dark theme
        4.dashboard styles
        5.login styles
        6.report page styles
        7.Material UI overrides

src/App.css
    =>Optional application-level layout styling.
    =>Responsibilities:
        1.global layout utilities
        2.app-wide backgrounds

src/pages/Login.jsx
    =>Admin login page.
    =>Responsibilities:
        1.handle login UI
        2.validate admin credentials
        3.redirect to dashboard
    =>Current Authentication:
        1.temporary frontend authentication
    =>Future:
        1.JWT authentication
        2.backend authentication
        3.session management

src/pages/Dashboard.jsx
    =>Main dashboard page.
    =>Responsibilities:
        1.sidebar navigation
        2.KPI cards
        3.recent activity
        4.report generation navigation
    =>Future:
        1.real analytics cards
        2.live KPI updates
        3.AI insights
        4.trend summaries

src/pages/ReportPage.jsx
    =>Report generation configuration page.
    =>Responsibilities:
        1.collect report metadata
        2.upload analytics files
        3.configure reporting period
        4.start report generation
    =>Current Inputs:
        1.Reporting Period
        2.Prepared By
        3.Prepared For

src/components/Navbar.jsx
    =>Reusable navigation component.
    =>Responsibilities:
        1.top navigation
        2.sidebar navigation
        3.future responsive navigation

src/components/UploadSection.jsx
    =>Reusable upload component.
    =>Responsibilities:
        1.file selection
        2.drag and drop upload
        3.upload progress
        4.upload validation

src/components/KPISection.jsx
    =>Reusable KPI display section.
    =>Responsibilities:
        1.show analytics metrics
        2.display totals
        3.percentage growth
        4.KPI cards

src/components/ChartsSection.jsx
    =>Reusable charts component.
    =>Responsibilities:
        1.render chart datasets
        2.display analytics graphs
        3.display trend charts

src/components/ComparisonSection.jsx
    =>Reusable comparison component.
    =>Responsibilities:
        1.compare months
        2.compare performance
        3.show growth analysis


src/components/ReportPreview.jsx
    =>Reusable report preview component.
    =>Responsibilities:
        1.preview generated reports
        2.preview charts
        3.preview PDF layout

src/services/api.js
    =>Frontend API helper file.
    =>Responsibilities:
        1.connect frontend to backend APIs
        2.handle axios/fetch requests
        3.centralize API calls

Backend
    =>The backend is built using:
        1.Node.js
        2.Express.js
        3.Multer
        4.CSV/XLSX Parsers
        5.Puppeteer (future PDF export)
    =>The backend handles:
        1.file uploads
        2.parsing
        3.normalization
        4.analytics processing
        5.KPI generation
        6.chart building
        7.report generation
        8.PDF exports

Backend Structure
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── uploadController.js
│
├── generated-reports/
│
├── middleware/
│   └── uploadMiddleware.js
│
├── node_modules/
│
├── routes/
│   ├── authRoutes.js
│   ├── pdfRoutes.js
│   ├── reportRoutes.js
│   └── uploadRoutes.js
│
├── services/
│   │
│   ├── ai/
│   │   ├── insightGenerator.js
│   │   ├── recommendationEngine.js
│   │   └── summaryGenerator.js
│   │
│   ├── analytics/
│   │   ├── comparisonEngine.js
│   │   ├── kpiCalculator.js
│   │   └── trendAnalyzer.js
│   │
│   ├── charts/
│   │   ├── chartBuilder.js
│   │   └── chartConfig.js
│   │
│   ├── detectors/
│   │   └── platformDetector.js
│   │
│   ├── normalizers/
│   │   ├── facebookNormalizer.js
│   │   ├── genericNormalizer.js
│   │   ├── instagramNormalizer.js
│   │   ├── seoNormalizer.js
│   │   └── unifiedNormalizer.js
│   │
│   ├── parsers/
│   │   ├── csvParser.js
│   │   ├── excelParser.js
│   │   └── sheetExtractor.js
│   │
│   ├── reports/
│   │   ├── pdfGenerator.js
│   │   ├── reportAssembler.js
│   │   └── templateEngine.js
│   │
│   ├── storage/
│   │   └── fileManager.js
│   │
│   ├── parser.js
│   ├── normalizer.js
│   ├── chartBuilder.js
│   ├── comparisonEngine.js
│   ├── pdfGenerator.js
│   └── reportGenerator.js
│
├── templates/
│   ├── genericTemplate.html
│   ├── seoTemplate.html
│   └── socialTemplate.html
│
├── uploads/
│
├── utils/
│   ├── dateUtils.js
│   ├── helpers.js
│   └── metricUtils.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

Backend File Responsibilities
server.js
    =>Main Express application.
    =>Responsibilities:
        1.initialize Express server
        2.configure middleware
        3.enable CORS
        4.register routes
        5.serve uploads folder
        6.start backend server

config/db.js
    =>Database configuration file.
    =>Responsibilities:
        1.connect MySQL database
        2.export database connection
        3.manage DB credentials
    <!-- Currently optional. -->
    =>Future:
        1.report storage
        2.client management
        3.user authentication
        4.analytics history

Controllers
controllers/uploadController.js
    =>Handles upload logic.
    =>Responsibilities:
        1.validate uploads
        2.receive uploaded files
        3.return upload response
        4.later trigger parsing pipeline

Middleware
middleware/uploadMiddleware.js
    =>Multer upload configuration.
    =>Responsibilities:
        1.upload handling
        2.file validation
        3.file naming
        4.upload destination configuration
    =>Supported Formats:
        1.CSV
        2.XLSX
        3.DOCX
        4.PDF

Routes
routes/uploadRoutes.js
    =>Upload APIs.
    =>Responsibilities:
        1.receive analytics uploads
        2.trigger parsing
        3.store uploaded files

routes/reportRoutes.js
    =>Report APIs.
    =>Responsibilities:
        1.generate analytics reports
        2.return KPIs
        3.return charts
        4.return insights

routes/pdfRoutes.js
    =>PDF APIs.
    =>Responsibilities:
        1.generate downloadable PDF reports
        2.return PDF file path

routes/authRoutes.js
    =>Authentication APIs.
    =>Responsibilities:
        1.login
        2.registration later
        3.JWT authentication later
    =>Current State:
        1.placeholder route structure

Services
    =>The services folder contains the entire processing engine.
AI Services
services/ai/insightGenerator.js
    =>Responsibilities:
        1.generate analytics insights
        2.detect strong/weak performance
        3.summarize trends

services/ai/recommendationEngine.js
    =>Responsibilities:
        1.generate marketing recommendations
        2.suggest improvements
        3.identify optimization opportunities

services/ai/summaryGenerator.js
    =>Responsibilities:
        1.generate executive summaries
        2.produce report conclusions

Analytics Services
services/analytics/kpiCalculator.js
    =>Responsibilities:
        1.calculate KPIs
        2.engagement rates
        3.growth percentages
        4.totals
        5.performance metrics

services/analytics/trendAnalyzer.js
    =>Responsibilities:
        1.analyze trends
        2.detect growth/decline
        3.identify performance patterns

services/analytics/comparisonEngine.js
    =>Responsibilities:
        1.compare months
        2.compare campaigns
        3.calculate percentage growth
        4.generate comparison metrics

services/analytics/instagramAnalytics.js
    → Instagram-specific analytics
    → Reels performance
    → Reach analytics
    → Engagement insights
    → Best post detection
services/analytics/seoAnalytics.js

    → SEO-specific analytics
    → Organic traffic summaries
    → Keyword growth
    → Technical SEO summaries
    → GBP analytics

Chart Services
services/charts/chartBuilder.js
    =>Responsibilities:
        1.build frontend-ready chart datasets
    =>Example Output:
        [
            {
                "date": "Apr 1",
                "reach": 1200
            }
        ]
    =>Frontend only renders the data.

services/charts/chartConfig.js
    =>Responsibilities:
        1.reusable chart configuration
        2.chart styling
        3.chart color management

Detector Services
services/detectors/platformDetector.js
    =>Responsibilities:
        1.detect uploaded platform type
        2.identify:
            a)Instagram data
            b)Facebook data
            c)SEO reports
            d)generic marketing reports

Parser Services
services/parsers/csvParser.js
    =>Responsibilities:
        1.parse CSV files
        2.convert rows to JSON

services/parsers/excelParser.js
    =>Responsibilities:
        1.parse XLSX workbooks
        2.read Excel files

services/parsers/sheetExtractor.js
    =>Responsibilities:
        1.extract multiple Excel sheets
        2.separate client sheets
    =>Important for SEO reports where:
        1.one workbook
        2.multiple client sheets

Normalizer Services
services/normalizers/instagramNormalizer.js
    =>Responsibilities:
        1.normalize Instagram analytics
        2.standardize Instagram metrics

services/normalizers/facebookNormalizer.js
    =>Responsibilities:
        1.normalize Facebook analytics

services/normalizers/seoNormalizer.js
    =>Responsibilities:
        1.normalize SEO report data

services/normalizers/genericNormalizer.js
    =>Responsibilities:
        1.normalize unknown file formats
        2.fallback normalization logic

services/normalizers/unifiedNormalizer.js
    =>Responsibilities:
        1.combine all normalized datasets
        2.create unified report structure

Report Services
services/reports/reportAssembler.js
    =>Responsibilities:
        1.combine:
            a)KPIs
            b)charts
            c)insights
            d)comparisons
            e)recommendations
            f)summaries
    =>Main report intelligence layer.

services/reports/templateEngine.js
    =>Responsibilities:
        1.render HTML templates
        2.inject analytics into templates

services/reports/pdfGenerator.js
    =>Responsibilities:
        1.generate PDF reports
        2.export final reports
        3.create downloadable PDFs
    =>Future:
        1.Puppeteer integration

Storage Services
services/storage/fileManager.js
    =>Responsibilities:
        1.manage uploads
        2.manage generated reports
        3.manage temporary files

<!-- Legacy Service Files
The following files currently exist for backward compatibility:
    services/parser.js
    services/normalizer.js
    services/chartBuilder.js
    services/comparisonEngine.js
    services/pdfGenerator.js
    services/reportGenerator.js
These should NOT be deleted until all logic is migrated to the new modular structure. -->

Templates
templates/genericTemplate.html
    =>Fallback report template.
    =>Used for:
        1.generic marketing reports
        2.unsupported platforms

templates/seoTemplate.html
    =>SEO report template.
    =>Used for:
        1.SEO analytics
        2.keyword reports
        3.ranking reports

templates/socialTemplate.html
    =>Social media report template.
    =>Used for:
        1.Instagram reports
        2.Facebook reports
        3.social analytics

Uploads Folder
uploads/
    =>Stores uploaded raw files.
    =>Supported:
        1.CSV
        2.XLSX
        3.DOCX
        4.PDF

Generated Reports Folder
generated-reports/
    =>Stores:
        1.generated PDFs
        2.exported reports
        3.temporary report outputs

Utils
utils/dateUtils.js
    =>Responsibilities:
        1.date formatting
        2.month calculations
        3.reporting period calculations

utils/metricUtils.js
    =>Responsibilities:
        1.percentage calculations
        2.metric transformations
        3.KPI helper calculations

utils/helpers.js
    =>Responsibilities:
        1.generic reusable helper functions

Backend Processing Flow
        Upload File
            ↓
        Store File
            ↓
        Detect Platform
            ↓
        Parse File
            ↓
        Extract Sheets
            ↓
        Normalize Data
            ↓
        Calculate KPIs
            ↓
        Analyze Trends
            ↓
        Build Charts
            ↓
        Generate Insights
            ↓
        Assemble Report
            ↓
        Generate PDF

Important Development Rule
    =>No fake analytics values should ever be generated.
    =>Every:
        1.KPI
        2.chart
        3.insight
        4.comparison
        5.summary
        6.recommendation
    =>must come from actual uploaded client data.
    =>If data is unavailable:
        1.show 0
        2.show N/A
        3.hide the chart
        4.or display "No data available"
    =>Never invent metrics.

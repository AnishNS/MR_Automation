Backend
Recommended Responsibility of Each File
server.js
    ->Main Express app.
    ->Responsibilities:
        1.express setup
        2.middleware
        3.CORS
        4.route registration
        5.static uploads

config\db.js
    ->MySQL connection only.
    ->Nothing else.

routes\uploadRoutes.js
    ->Responsibilities:
        1.receive uploads
        2.multer config
        3.call parser
        4.call normalizer
        5.store in DB

routes\reportRoutes.js
    ->Responsibilities:
        1.generate reports
        2.fetch analytics
        3.return chart data
        4.comparisons

routes\pdfRoutes.js
    ->Responsibilities:
        1.generate downloadable PDF
        2.return PDF URL/file

routes\authRoutes.js
    ->For:
        1.login
        2.JWT later
        3.register later
    ->Currently simple.

services\parser.js
    ->Responsibilities:
        1.CSV parsing
        2.XLSX parsing
        3.raw row extraction
    ->NO analytics calculations here.

services\normalizer.js
    ->Responsibilities:
        1.normalize column names
        2.normalize metrics
        3.validate values
        4.clean data
    ->Most important file.

services\comparisonEngine.js
    ->Responsibilities:
        1.compare months
        2.percentage growth
        3.trend calculations
        4.KPI comparison

services\chartBuilder.js
    ->Responsibilities:
        1.build frontend-ready chart datasets

    ->Example:
    [
        {
            "date": "Apr 1",
            "clicks": 120
        }
    ]

    ->Frontend only renders.

services\reportGenerator.js
    ->Responsibilities:
        ->combine:
            1.comparisons
            2.insights
            3.KPIs
            4.charts
            5.summaries
    ->This becomes your main intelligence layer later.

services\pdfGenerator.js
    ->Responsibilities:
        1.Puppeteer export
        2.report rendering
        3.final PDF creation

uploads/
    ->Stores:
        1.CSV
        2.XLSX
        3.DOCX
        4.PDF

temp/
    ->Stores:
        1.temporary exports
        2.cached reports
        3.screenshots
        4.generated PDFs
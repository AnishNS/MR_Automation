const express = require("express");
const router = express.Router();

const generateClientPdf = require("../services/pdf/clientPdfGenerator");

router.get("/test", async (req, res) => {
  try {
    const pdf = await generateClientPdf({
  clientName: "StyleWell Interior",
  month: "April 2026",
  services: ["Instagram Management", "SEO", "Meta Ads"],
  instagram: {
    analytics: {
      summary: {
        totalPosts: 15,
        totalViews: 9225,
        totalReach: 5834,
        totalLikes: 408,
        totalEngagement: 478,
        engagementRate: 8.19,
      },
      bestPost: {
        postType: "IG reel",
        views: 1418,
        reach: 884,
        engagement: 138,
      },
    },
  },
  seo: {
  analytics: {
    clientSummaries: [
      {
        clientName: "StyleWell Interior",
        organicTraffic: 12450,
        impressions: 98500,
        clicks: 6420,
        ctr: "6.5%",
        avgPosition: 8.2,
        profileViews: 1840,
        calls: 72,
        directionRequests: 41,
        reviews: 12,
      },
    ],
  },
},
});

    res.json({
      success: true,
      message: "PDF generated successfully",
      pdf,
      downloadUrl: `/generated-reports/${pdf.fileName}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
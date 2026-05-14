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
      postTypeCounts: {
        "IG image": 2,
        "IG reel": 8,
        "IG carousel": 5,
    },
      insights: [
      "Instagram published 15 posts this month, generating 9225 total views and 5834 total reach.",
      "The overall engagement rate is 8.19%, with 478 total engagements.",
      "The best performing post was an IG reel with 1418 views, 884 reach, and 138 engagements.",
    ],
    recommendations: [
      "Continue producing high-engagement content formats that are already performing well.",
      "Reels are currently the best-performing content format and should remain a primary content focus.",
      "Track content performance monthly to identify trends and improve future campaign planning.",
    ],
    comparisons: {
  views: {
    label: "Views",
    previous: 7000,
    current: 9225,
    difference: 2225,
    trend: "increase",
  },

  reach: {
    label: "Reach",
    previous: 4000,
    current: 5834,
    difference: 1834,
    trend: "increase",
  },
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
        comparisons: {
    organicTraffic: {
      label: "Organic Traffic",
      previous: 80,
      current: 120,
      difference: 40,
      trend: "increase",
    },

    impressions: {
      label: "Impressions",
      previous: 5000,
      current: 8200,
      difference: 3200,
      trend: "increase",
    },

    clicks: {
      label: "Organic Clicks",
      previous: 210,
      current: 420,
      difference: 210,
      trend: "increase",
    },
  },
      },
    ],
    recommendations: [
      {
        clientName: "StyleWell Interior",
        recommendations: [
          "Continue optimizing high-performing pages to maintain organic traffic momentum.",
          "Focus on keyword optimization and internal linking to improve average ranking position.",
          "Track keyword rankings and search performance monthly for long-term SEO growth analysis.",
        ],
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
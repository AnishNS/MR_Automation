const numberValue = (value) => {
  if (value === undefined || value === null) return 0;

  return (
    Number(
      String(value)
        .replace(/₹/g, "")
        .replace(/Rs./gi, "")
        .replace(/,/g, "")
        .trim()
    ) || 0
  );
};

const generateMetaAdsAnalytics = (campaigns = []) => {
  const totalCampaigns = campaigns.length;

  const totals = campaigns.reduce(
    (acc, campaign) => {
      acc.leads += numberValue(campaign.leads);
      acc.reach += numberValue(campaign.reach);
      acc.spend += numberValue(
        campaign.spend || campaign.amountSpent || campaign.amount_spent
      );
      acc.clicks += numberValue(campaign.clicks || campaign.linkClicks);
      acc.impressions += numberValue(campaign.impressions);
      acc.instagramLeads += numberValue(
        campaign.instagramLeads || campaign.igLeads
      );
      acc.facebookLeads += numberValue(
        campaign.facebookLeads || campaign.fbLeads
      );

      return acc;
    },
    {
      leads: 0,
      reach: 0,
      spend: 0,
      clicks: 0,
      impressions: 0,
      instagramLeads: 0,
      facebookLeads: 0,
    }
  );

  const avgCPL =
    totals.leads > 0
      ? Number((totals.spend / totals.leads).toFixed(2))
      : 0;

  const avgCPC =
    totals.clicks > 0
      ? Number((totals.spend / totals.clicks).toFixed(2))
      : 0;

  const ctr =
    totals.impressions > 0
      ? Number(((totals.clicks / totals.impressions) * 100).toFixed(2))
      : 0;

  const campaignsWithCPL = campaigns.map((campaign) => {
    const leads = numberValue(campaign.leads);
    const spend = numberValue(
      campaign.spend || campaign.amountSpent || campaign.amount_spent
    );

    return {
      ...campaign,
      leads,
      spend,
      calculatedCPL:
        leads > 0 ? Number((spend / leads).toFixed(2)) : 0,
    };
  });

  const bestCampaign =
    campaignsWithCPL.length > 0
      ? campaignsWithCPL
          .filter((campaign) => campaign.leads > 0)
          .sort((a, b) => a.calculatedCPL - b.calculatedCPL)[0] || null
      : null;

  const topLeadCampaign =
    campaignsWithCPL.length > 0
      ? campaignsWithCPL.reduce((best, current) =>
          current.leads > best.leads ? current : best
        )
      : null;

  const insights = [];

  if (totals.leads > 0) {
    insights.push({
      title: "Lead Generation Performance",
      text: `Meta Ads generated ${totals.leads} leads with an average CPL of ₹${avgCPL}.`,
    });
  }

  if (bestCampaign) {
    insights.push({
      title: "Best Cost-Efficient Campaign",
      text: `${
        bestCampaign.campaignName ||
        bestCampaign.campaign ||
        "Top campaign"
      } delivered the most cost-efficient performance with CPL ₹${bestCampaign.calculatedCPL}.`,
    });
  }

  if (topLeadCampaign) {
    insights.push({
      title: "Highest Lead Campaign",
      text: `${
        topLeadCampaign.campaignName ||
        topLeadCampaign.campaign ||
        "Top campaign"
      } generated the highest lead volume with ${topLeadCampaign.leads} leads.`,
    });
  }

  const recommendations = [];

  if (avgCPL > 0) {
    recommendations.push({
      title: "Budget Optimisation",
      text: "Shift more budget toward campaigns with lower CPL and pause campaigns with weak conversion efficiency.",
    });
  }

  if (bestCampaign) {
    recommendations.push({
      title: "Scale Winning Campaigns",
      text: `Increase testing and budget allocation for ${
        bestCampaign.campaignName ||
        bestCampaign.campaign ||
        "the best-performing campaign"
      } while monitoring CPL stability.`,
    });
  }

  recommendations.push({
    title: "Creative Testing",
    text: "Continue testing new creatives, hooks, and audience segments to improve lead quality and reduce cost per lead.",
  });

  return {
    platform: "meta_ads",

    summary: {
      totalCampaigns,
      totalLeads: totals.leads,
      totalReach: totals.reach,
      totalSpend: totals.spend,
      totalClicks: totals.clicks,
      totalImpressions: totals.impressions,
      avgCPL,
      avgCPC,
      ctr,
      instagramLeads: totals.instagramLeads,
      facebookLeads: totals.facebookLeads,
    },

    bestCampaign,
    topLeadCampaign,
    insights,
    recommendations,
    campaigns: campaignsWithCPL,
  };
};

module.exports = {
  generateMetaAdsAnalytics,
};
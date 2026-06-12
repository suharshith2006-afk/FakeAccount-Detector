import { RequestHandler } from "express";

interface TrendingItem {
  hashtag: string;
  mentions: number;
  change: number;
  status: "rising" | "falling";
  riskLevel: "low" | "medium" | "high";
  posts: number;
}

const trendingData: TrendingItem[] = [
  {
    hashtag: "#SpotifyWrapped2025",
    mentions: 245800,
    change: 28.5,
    status: "rising",
    riskLevel: "low",
    posts: 125400,
  },
  {
    hashtag: "#TechConference",
    mentions: 156300,
    change: 12.3,
    status: "rising",
    riskLevel: "low",
    posts: 89200,
  },
  {
    hashtag: "#CryptoGain1000x",
    mentions: 98500,
    change: 45.2,
    status: "rising",
    riskLevel: "high",
    posts: 62100,
  },
  {
    hashtag: "#MakeMoneyFast",
    mentions: 45200,
    change: 89.5,
    status: "rising",
    riskLevel: "high",
    posts: 31200,
  },
  {
    hashtag: "#ViralChallenge",
    mentions: 234500,
    change: 67.8,
    status: "rising",
    riskLevel: "medium",
    posts: 198700,
  },
  {
    hashtag: "#FakeGiveaway",
    mentions: 32400,
    change: 156.3,
    status: "rising",
    riskLevel: "high",
    posts: 18900,
  },
];

// Get all trending hashtags
export const getTrendingHashtags: RequestHandler = (req, res) => {
  const { sortBy } = req.query;

  let results = [...trendingData];

  // Sort by different criteria
  if (sortBy === "mentions") {
    results.sort((a, b) => b.mentions - a.mentions);
  } else if (sortBy === "change") {
    results.sort((a, b) => b.change - a.change);
  } else if (sortBy === "risk") {
    const riskOrder = { high: 0, medium: 1, low: 2 };
    results.sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel]);
  }

  res.json({
    success: true,
    message: "Trending hashtags retrieved",
    data: results,
  });
};

// Get trending by risk level
export const getTrendingByRiskLevel: RequestHandler = (req, res) => {
  const riskLevel = req.query.riskLevel as string;

  if (!riskLevel || !["low", "medium", "high"].includes(riskLevel)) {
    return res.status(400).json({
      success: false,
      message: "Invalid risk level. Use: low, medium, or high",
      data: null,
    });
  }

  const filtered = trendingData.filter((t) => t.riskLevel === riskLevel);

  res.json({
    success: true,
    message: `Retrieved ${riskLevel} risk trending items`,
    data: filtered,
  });
};

// Get trending analytics summary
export const getTrendingAnalytics: RequestHandler = (req, res) => {
  const highRisk = trendingData.filter((t) => t.riskLevel === "high");
  const mediumRisk = trendingData.filter((t) => t.riskLevel === "medium");
  const lowRisk = trendingData.filter((t) => t.riskLevel === "low");

  const totalMentions = trendingData.reduce((sum, t) => sum + t.mentions, 0);
  const totalPosts = trendingData.reduce((sum, t) => sum + t.posts, 0);

  const analytics = {
    totalTrends: trendingData.length,
    highRiskCount: highRisk.length,
    mediumRiskCount: mediumRisk.length,
    lowRiskCount: lowRisk.length,
    totalMentions,
    totalPosts,
    averageMentions: Math.round(totalMentions / trendingData.length),
    averageChange: (
      trendingData.reduce((sum, t) => sum + t.change, 0) / trendingData.length
    ).toFixed(1),
    riskDistribution: {
      high: `${((highRisk.length / trendingData.length) * 100).toFixed(1)}%`,
      medium: `${((mediumRisk.length / trendingData.length) * 100).toFixed(1)}%`,
      low: `${((lowRisk.length / trendingData.length) * 100).toFixed(1)}%`,
    },
  };

  res.json({
    success: true,
    message: "Trending analytics retrieved",
    data: analytics,
  });
};

// Get specific hashtag details
export const getHashtagDetails: RequestHandler = (req, res) => {
  const hashtag = req.query.hashtag as string;
  if (!hashtag) {
    return res.status(400).json({ success: false, message: "Hashtag required", data: null });
  }
  const hashtag_clean = hashtag.startsWith("#") ? hashtag : `#${hashtag}`;

  const trend = trendingData.find((t) => t.hashtag.toLowerCase() === hashtag_clean.toLowerCase());

  if (!trend) {
    return res.status(404).json({
      success: false,
      message: "Hashtag not found in trending data",
      data: null,
    });
  }

  const details = {
    ...trend,
    engagement: {
      postsPerMention: (trend.posts / trend.mentions * 100).toFixed(2),
      mentionTrendPercent: trend.change,
      status: trend.change > 0 ? "Growing" : "Declining",
    },
    fraudRiskAssessment: {
      level: trend.riskLevel,
      recommendation:
        trend.riskLevel === "high"
          ? "Exercise caution - potential fraud detected"
          : trend.riskLevel === "medium"
            ? "Monitor for suspicious activity"
            : "Appears to be legitimate trend",
    },
  };

  res.json({
    success: true,
    message: "Hashtag details retrieved",
    data: details,
  });
};

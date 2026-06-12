import { RequestHandler } from "express";
import { getTrendingCollection } from "../db";

export const getTrendingHashtags: RequestHandler = async (req, res) => {
  try {
    const { sortBy } = req.query;
    const collection = getTrendingCollection();

    let sortOptions: Record<string, 1 | -1> = {};

    if (sortBy === "mentions") {
      sortOptions = { mentions: -1 };
    } else if (sortBy === "change") {
      sortOptions = { change: -1 };
    } else if (sortBy === "risk") {
      sortOptions = { riskLevel: 1 };
    }

    const results = await collection
      .find({})
      .sort(sortOptions)
      .toArray();

    res.json({
      success: true,
      message: "Trending hashtags retrieved",
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching trending hashtags",
      data: null,
    });
  }
};

export const getTrendingByRiskLevel: RequestHandler = async (req, res) => {
  try {
    const riskLevel = req.query.riskLevel as string;

    if (!riskLevel || !["low", "medium", "high"].includes(riskLevel)) {
      return res.status(400).json({
        success: false,
        message: "Invalid risk level. Use: low, medium, or high",
        data: null,
      });
    }

    const collection = getTrendingCollection();
    const filtered = await collection.find({ riskLevel: riskLevel as "low" | "medium" | "high" }).toArray();

    res.json({
      success: true,
      message: `Retrieved ${riskLevel} risk trending items`,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error filtering trending items",
      data: null,
    });
  }
};

export const getTrendingAnalytics: RequestHandler = async (req, res) => {
  try {
    const collection = getTrendingCollection();
    const allTrends = await collection.find({}).toArray();

    const highRisk = allTrends.filter((t) => t.riskLevel === "high");
    const mediumRisk = allTrends.filter((t) => t.riskLevel === "medium");
    const lowRisk = allTrends.filter((t) => t.riskLevel === "low");

    const totalMentions = allTrends.reduce((sum, t) => sum + t.mentions, 0);
    const totalPosts = allTrends.reduce((sum, t) => sum + t.posts, 0);

    const analytics = {
      totalTrends: allTrends.length,
      highRiskCount: highRisk.length,
      mediumRiskCount: mediumRisk.length,
      lowRiskCount: lowRisk.length,
      totalMentions,
      totalPosts,
      averageMentions: allTrends.length ? Math.round(totalMentions / allTrends.length) : 0,
      averageChange: allTrends.length
        ? (allTrends.reduce((sum, t) => sum + t.change, 0) / allTrends.length).toFixed(1)
        : 0,
      riskDistribution: {
        high: allTrends.length ? `${((highRisk.length / allTrends.length) * 100).toFixed(1)}%` : "0%",
        medium: allTrends.length ? `${((mediumRisk.length / allTrends.length) * 100).toFixed(1)}%` : "0%",
        low: allTrends.length ? `${((lowRisk.length / allTrends.length) * 100).toFixed(1)}%` : "0%",
      },
    };

    res.json({
      success: true,
      message: "Trending analytics retrieved",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      data: null,
    });
  }
};

export const getHashtagDetails: RequestHandler = async (req, res) => {
  try {
    const hashtag = req.query.hashtag as string;
    if (!hashtag) {
      return res.status(400).json({
        success: false,
        message: "Hashtag required",
        data: null,
      });
    }

    const hashtag_clean = hashtag.startsWith("#") ? hashtag : `#${hashtag}`;
    const collection = getTrendingCollection();

    const trend = await collection.findOne({ hashtag: hashtag_clean });

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
        postsPerMention: trend.mentions > 0 ? (trend.posts / trend.mentions * 100).toFixed(2) : 0,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching hashtag details",
      data: null,
    });
  }
};

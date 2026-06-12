import { RequestHandler } from "express";
import { getAccountsCollection } from "../db";

export const analyzeAccount: RequestHandler = async (req, res) => {
  try {
    const accountId = req.params.accountId as string;
    const collection = getAccountsCollection();

    const account = await collection.findOne({ username: accountId.toLowerCase() });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Account analysis retrieved successfully",
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error analyzing account",
      data: null,
    });
  }
};

export const getAllAccounts: RequestHandler = async (req, res) => {
  try {
    const collection = getAccountsCollection();
    const accounts = await collection.find({}).toArray();

    const summary = {
      total: accounts.length,
      genuine: accounts.filter((a) => a.classification === "genuine").length,
      fake: accounts.filter((a) => a.classification === "fake").length,
      suspicious: accounts.filter((a) => a.classification === "suspicious").length,
      averageSuspicionScore: accounts.length
        ? (accounts.reduce((sum, a) => sum + a.suspicionScore, 0) / accounts.length).toFixed(2)
        : 0,
    };

    res.json({
      success: true,
      message: "Accounts summary retrieved",
      data: {
        accounts,
        summary,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching accounts",
      data: null,
    });
  }
};

export const searchAccounts: RequestHandler = async (req, res) => {
  try {
    const { classification, minFollowers, maxFollowers } = req.query;
    const collection = getAccountsCollection();

    const query: Record<string, unknown> = {};

    if (classification) {
      query.classification = classification;
    }

    if (minFollowers || maxFollowers) {
      query.followers = {};
      if (minFollowers) {
        (query.followers as Record<string, number>).$gte = Number(minFollowers);
      }
      if (maxFollowers) {
        (query.followers as Record<string, number>).$lte = Number(maxFollowers);
      }
    }

    const results = await collection.find(query).toArray();

    res.json({
      success: true,
      message: `Found ${results.length} accounts matching criteria`,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching accounts",
      data: null,
    });
  }
};

export const calculateRiskScore: RequestHandler = async (req, res) => {
  try {
    const accountId = req.params.accountId as string;
    const collection = getAccountsCollection();

    const account = await collection.findOne({ username: accountId.toLowerCase() });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
        data: null,
      });
    }

    const riskFactors = {
      behavior: account.behaviorScore,
      content: account.contentScore,
      network: account.networkScore,
      trend: account.trendScore,
    };

    const overallScore = Math.round(
      (riskFactors.behavior * 0.3 +
        riskFactors.content * 0.3 +
        riskFactors.network * 0.25 +
        riskFactors.trend * 0.15) /
        100 *
        100
    );

    const riskLevel =
      overallScore > 70 ? "high" : overallScore > 40 ? "medium" : "low";

    res.json({
      success: true,
      message: "Risk score calculated",
      data: {
        accountId,
        overallScore,
        riskLevel,
        factors: riskFactors,
        recommendation:
          riskLevel === "high"
            ? "Account should be flagged for review"
            : riskLevel === "medium"
              ? "Account requires monitoring"
              : "Account appears legitimate",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating risk score",
      data: null,
    });
  }
};

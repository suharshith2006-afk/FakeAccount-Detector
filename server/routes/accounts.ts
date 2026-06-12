import { RequestHandler } from "express";

// Account analysis interface
interface AccountAnalysis {
  id: string;
  username: string;
  accountAge: string;
  followers: number;
  posts: number;
  classification: "genuine" | "fake" | "suspicious";
  suspicionScore: number;
  behaviorScore: number;
  contentScore: number;
  networkScore: number;
  trendScore: number;
  reasons: string[];
}

// Mock database of accounts
const mockAccounts: { [key: string]: AccountAnalysis } = {
  "@user1": {
    id: "@user1",
    username: "user1",
    accountAge: "2 years",
    followers: 5420,
    posts: 342,
    classification: "genuine",
    suspicionScore: 12,
    behaviorScore: 8,
    contentScore: 15,
    networkScore: 10,
    trendScore: 5,
    reasons: ["Consistent posting patterns", "Real follower growth", "Authentic engagement"],
  },
  "@user4": {
    id: "@user4",
    username: "user4",
    accountAge: "3 months",
    followers: 85000,
    posts: 2500,
    classification: "fake",
    suspicionScore: 92,
    behaviorScore: 95,
    contentScore: 88,
    networkScore: 99,
    trendScore: 85,
    reasons: ["Sudden follower spike", "Repetitive content patterns", "Bot-like behavior"],
  },
  "@user7": {
    id: "@user7",
    username: "user7",
    accountAge: "6 months",
    followers: 25000,
    posts: 450,
    classification: "suspicious",
    suspicionScore: 58,
    behaviorScore: 65,
    contentScore: 55,
    networkScore: 62,
    trendScore: 48,
    reasons: ["Rapid growth detected", "Mixed genuine and suspicious patterns"],
  },
};

// Analyze a specific account
export const analyzeAccount: RequestHandler = (req, res) => {
  const accountId = req.params.accountId as string;

  // Check if account exists in our mock database
  const account = mockAccounts[accountId.toLowerCase()];

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
};

// Get all accounts summary
export const getAllAccounts: RequestHandler = (req, res) => {
  const accounts = Object.values(mockAccounts);

  const summary = {
    total: accounts.length,
    genuine: accounts.filter((a) => a.classification === "genuine").length,
    fake: accounts.filter((a) => a.classification === "fake").length,
    suspicious: accounts.filter((a) => a.classification === "suspicious").length,
    averageSuspicionScore: (
      accounts.reduce((sum, a) => sum + a.suspicionScore, 0) / accounts.length
    ).toFixed(2),
  };

  res.json({
    success: true,
    message: "Accounts summary retrieved",
    data: {
      accounts,
      summary,
    },
  });
};

// Search accounts by criteria
export const searchAccounts: RequestHandler = (req, res) => {
  const { classification, minFollowers, maxFollowers } = req.query;

  let results = Object.values(mockAccounts);

  // Filter by classification
  if (classification) {
    results = results.filter((a) => a.classification === classification);
  }

  // Filter by followers range
  if (minFollowers) {
    results = results.filter((a) => a.followers >= Number(minFollowers));
  }

  if (maxFollowers) {
    results = results.filter((a) => a.followers <= Number(maxFollowers));
  }

  res.json({
    success: true,
    message: `Found ${results.length} accounts matching criteria`,
    data: results,
  });
};

// Calculate account risk score
export const calculateRiskScore: RequestHandler = (req, res) => {
  const accountId = req.params.accountId as string;
  const account = mockAccounts[accountId.toLowerCase()];

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
};

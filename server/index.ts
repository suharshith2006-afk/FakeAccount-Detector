import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  analyzeAccount,
  getAllAccounts,
  searchAccounts,
  calculateRiskScore,
} from "./routes/accounts";
import {
  getTrendingHashtags,
  getTrendingByRiskLevel,
  getTrendingAnalytics,
  getHashtagDetails,
} from "./routes/trends";
import {
  getMonthlyReports,
  getDailyStatistics,
  getMonthlyReport,
  getReportOverview,
} from "./routes/reports";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Account Analysis Routes
  app.get("/api/accounts", getAllAccounts);
  app.get("/api/accounts/search", searchAccounts);
  app.get("/api/accounts/:accountId", analyzeAccount);
  app.get("/api/accounts/:accountId/risk-score", calculateRiskScore);

  // Trending Routes
  app.get("/api/trending", getTrendingHashtags);
  app.get("/api/trending/by-risk", getTrendingByRiskLevel);
  app.get("/api/trending/analytics", getTrendingAnalytics);
  app.get("/api/trending/hashtag", getHashtagDetails);

  // Reports Routes
  app.get("/api/reports/monthly", getMonthlyReports);
  app.get("/api/reports/daily", getDailyStatistics);
  app.get("/api/reports/monthly-detail", getMonthlyReport);
  app.get("/api/reports/overview", getReportOverview);

  return app;
}

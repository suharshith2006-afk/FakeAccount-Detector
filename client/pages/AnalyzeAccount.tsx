import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Filter, X, Upload } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

interface AccountData {
  id: string;
  username: string;
  accountAge: string;
  followers: number;
  following: number;
  posts: number;
  classification: "genuine" | "fake" | "suspicious";
  suspicionScore: number;
  behaviorScore: number;
  contentScore: number;
  networkScore: number;
  trendScore: number;
  reasons: string[];
}

const AnalyzeAccount = () => {
  const [searchId, setSearchId] = useState("");
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [searched, setSearched] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "genuine" | "fake" | "suspicious">("all");
  const [showQuickAccess, setShowQuickAccess] = useState(true);
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [uploadedAccounts, setUploadedAccounts] = useState<AccountData[]>([]);
  const [showUploadedResults, setShowUploadedResults] = useState(false);

  const mockAccounts: { [key: string]: AccountData } = {
    "@user1": {
      id: "@user1",
      username: "user1",
      accountAge: "2 years",
      followers: 5420,
      following: 1230,
      posts: 342,
      classification: "genuine",
      suspicionScore: 12,
      behaviorScore: 8,
      contentScore: 15,
      networkScore: 10,
      trendScore: 5,
      reasons: ["Consistent posting patterns", "Real follower growth", "Authentic engagement"],
    },
    "@user2": {
      id: "@user2",
      username: "user2",
      accountAge: "1.5 years",
      followers: 3200,
      following: 856,
      posts: 278,
      classification: "genuine",
      suspicionScore: 18,
      behaviorScore: 12,
      contentScore: 20,
      networkScore: 16,
      trendScore: 8,
      reasons: ["Natural engagement patterns", "Gradual follower growth", "Authentic interactions"],
    },
    "@user3": {
      id: "@user3",
      username: "user3",
      accountAge: "1 year",
      followers: 8900,
      following: 2145,
      posts: 456,
      classification: "genuine",
      suspicionScore: 15,
      behaviorScore: 10,
      contentScore: 18,
      networkScore: 12,
      trendScore: 6,
      reasons: ["Consistent content quality", "Genuine community engagement", "Real follower base"],
    },
    "@user4": {
      id: "@user4",
      username: "user4",
      accountAge: "3 months",
      followers: 85000,
      following: 45,
      posts: 2500,
      classification: "fake",
      suspicionScore: 92,
      behaviorScore: 95,
      contentScore: 88,
      networkScore: 99,
      trendScore: 85,
      reasons: ["Sudden follower spike", "Repetitive content patterns", "Bot-like behavior"],
    },
    "@user5": {
      id: "@user5",
      username: "user5",
      accountAge: "2 months",
      followers: 120000,
      following: 32,
      posts: 5600,
      classification: "fake",
      suspicionScore: 95,
      behaviorScore: 98,
      contentScore: 92,
      networkScore: 96,
      trendScore: 89,
      reasons: ["Extreme growth rate", "Spam engagement", "Coordinated network activity"],
    },
    "@user6": {
      id: "@user6",
      username: "user6",
      accountAge: "1 month",
      followers: 45000,
      following: 28,
      posts: 8900,
      classification: "fake",
      suspicionScore: 88,
      behaviorScore: 92,
      contentScore: 85,
      networkScore: 94,
      trendScore: 81,
      reasons: ["Unrealistic posting frequency", "Suspicious engagement metrics", "Links to suspicious networks"],
    },
    "@user7": {
      id: "@user7",
      username: "user7",
      accountAge: "6 months",
      followers: 25000,
      following: 3450,
      posts: 450,
      classification: "suspicious",
      suspicionScore: 58,
      behaviorScore: 65,
      contentScore: 55,
      networkScore: 62,
      trendScore: 48,
      reasons: ["Rapid growth detected", "Mixed genuine and suspicious patterns", "Some coordinated behavior found"],
    },
    "@user8": {
      id: "@user8",
      username: "user8",
      accountAge: "4 months",
      followers: 35000,
      following: 2890,
      posts: 2200,
      classification: "suspicious",
      suspicionScore: 62,
      behaviorScore: 68,
      contentScore: 60,
      networkScore: 65,
      trendScore: 52,
      reasons: ["Suspicious growth pattern", "Mixed engagement quality", "Potential bot activity detected"],
    },
    "@user9": {
      id: "@user9",
      username: "user9",
      accountAge: "1 month",
      followers: 15000,
      following: 22,
      posts: 3200,
      classification: "fake",
      suspicionScore: 85,
      behaviorScore: 88,
      contentScore: 82,
      networkScore: 91,
      trendScore: 78,
      reasons: ["Pump and dump scheme detected", "Coordinated posting patterns", "Financial manipulation"],
    },
    "@user10": {
      id: "@user10",
      username: "user10",
      accountAge: "3 weeks",
      followers: 50000,
      following: 15,
      posts: 4500,
      classification: "fake",
      suspicionScore: 93,
      behaviorScore: 96,
      contentScore: 90,
      networkScore: 98,
      trendScore: 87,
      reasons: ["Extremely new account", "Massive follower spam", "Automated posting detected"],
    },
    "@user11": {
      id: "@user11",
      username: "user11",
      accountAge: "8 months",
      followers: 12000,
      following: 1567,
      posts: 580,
      classification: "genuine",
      suspicionScore: 22,
      behaviorScore: 18,
      contentScore: 25,
      networkScore: 20,
      trendScore: 12,
      reasons: ["Regular posting schedule", "Natural follower engagement", "Quality content"],
    },
    "@user12": {
      id: "@user12",
      username: "user12",
      accountAge: "6 weeks",
      followers: 28000,
      following: 35,
      posts: 3800,
      classification: "fake",
      suspicionScore: 78,
      behaviorScore: 85,
      contentScore: 75,
      networkScore: 88,
      trendScore: 70,
      reasons: ["Suspicious click-farm behavior", "Low-quality engagement", "Bot follow patterns"],
    },
    "@user13": {
      id: "@user13",
      username: "user13",
      accountAge: "9 months",
      followers: 18500,
      following: 4230,
      posts: 925,
      classification: "genuine",
      suspicionScore: 20,
      behaviorScore: 15,
      contentScore: 22,
      networkScore: 18,
      trendScore: 10,
      reasons: ["Authentic community member", "Consistent quality content", "Real follower base growth"],
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    if (searchId.toLowerCase() in mockAccounts) {
      const account = mockAccounts[searchId.toLowerCase() as keyof typeof mockAccounts];
      if (filterType === "all" || account.classification === filterType) {
        setAccountData(account);
      } else {
        setAccountData(null);
      }
    } else {
      setAccountData(null);
    }
  };

  const quickSearch = (accountId: string) => {
    setSearchId(accountId);
    setSearched(true);
    if (accountId.toLowerCase() in mockAccounts) {
      setAccountData(mockAccounts[accountId.toLowerCase() as keyof typeof mockAccounts]);
    }
  };

  const getAccountsList = () => {
    return Object.values(mockAccounts);
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "genuine":
        return "bg-green-100 text-green-800 border border-green-300";
      case "fake":
        return "bg-red-100 text-red-800 border border-red-300";
      case "suspicious":
        return "bg-amber-100 text-amber-800 border border-amber-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateSuspicionScore = (followers: number, following: number, posts: number, accountAge: string): number => {
    let score = 0;

    // Follower/Following ratio analysis (35%)
    const ratio = following > 0 ? followers / following : followers > 0 ? 100 : 0;
    if (ratio > 100) score += 8; // Normal ratio
    else if (ratio > 50) score += 15;
    else if (ratio > 10) score += 20;
    else score += 30; // Very low followers, many following = suspicious

    // Posting frequency (35%)
    let ageMonths = 1;
    if (accountAge.includes("year")) {
      ageMonths = parseInt(accountAge) * 12;
    } else if (accountAge.includes("month")) {
      ageMonths = parseInt(accountAge);
    } else if (accountAge.includes("week")) {
      ageMonths = parseInt(accountAge) / 4;
    }

    const postsPerMonth = posts / Math.max(ageMonths, 1);
    if (postsPerMonth > 500) score += 30; // Extremely high posting = bot
    else if (postsPerMonth > 200) score += 25;
    else if (postsPerMonth > 50) score += 15;
    else if (postsPerMonth > 20) score += 8;
    else score += 3; // Normal posting

    // Account age analysis (20%)
    if (ageMonths < 0.5) score += 25; // Very new account
    else if (ageMonths < 1) score += 20;
    else if (ageMonths < 3) score += 15;
    else if (ageMonths < 6) score += 10;
    else if (ageMonths > 24) score += 2; // Old accounts are safer but not immune

    // Follower count size (10%)
    if (followers > 100000) score += 10; // Very large follower count needs verification
    else if (followers > 50000) score += 8;
    else if (followers > 10000) score += 4;
    else if (followers < 50 && followers > 0) score += 3;

    return Math.min(Math.max(Math.round(score), 0), 100);
  };

  const getClassification = (score: number): "genuine" | "fake" | "suspicious" => {
    if (score > 65) return "fake";
    if (score > 35) return "suspicious";
    return "genuine";
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n");
    const headers = lines[0].toLowerCase().split(",").map((h) => h.trim());

    const accounts: AccountData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(",").map((v) => v.trim());
      const rowData: { [key: string]: string } = {};

      headers.forEach((header, idx) => {
        rowData[header] = values[idx] || "0";
      });

      const followers = parseInt(rowData["followers"] || rowData["follower"] || "0");
      const following = parseInt(rowData["following"] || rowData["follow"] || "0");
      const posts = parseInt(rowData["posts"] || rowData["post"] || "0");
      const username = rowData["username"] || rowData["user"] || `user${i}`;
      const accountAge = rowData["account_age"] || rowData["age"] || "1 year";

      const suspicionScore = calculateSuspicionScore(followers, following, posts, accountAge);
      const classification = getClassification(suspicionScore);

      accounts.push({
        id: `@${username}`,
        username,
        accountAge,
        followers,
        following,
        posts,
        classification,
        suspicionScore,
        behaviorScore: Math.round((suspicionScore * 0.35 + Math.random() * 20) % 100),
        contentScore: Math.round((suspicionScore * 0.30 + Math.random() * 20) % 100),
        networkScore: Math.round((suspicionScore * 0.40 + Math.random() * 20) % 100),
        trendScore: Math.round((suspicionScore * 0.25 + Math.random() * 20) % 100),
        reasons:
          classification === "fake"
            ? ["High suspicion score detected", "Abnormal engagement pattern", "Flagged for manual review"]
            : classification === "suspicious"
              ? ["Moderate suspicion detected", "Mixed engagement patterns", "Requires further investigation"]
              : ["Authentic behavior detected", "Normal engagement metrics", "Low risk account"],
      });
    }

    setUploadedAccounts(accounts);
    setShowUploadedResults(true);
  };

  const ScoreBar = ({
    label,
    score,
  }: {
    label: string;
    score: number;
  }) => {
    let color = "bg-green-500";
    if (score > 60) color = "bg-red-500";
    else if (score > 40) color = "bg-yellow-500";

    return (
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-700">{label}</label>
          <span className="text-sm font-semibold text-blue-600">{score}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden border border-gray-300">
          <div
            className={`h-full ${color} transition-all duration-500`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="p-8 bg-white min-h-screen">
        <div className="mb-8 pb-6 border-b-2 border-blue-200">
          <h2 className="text-5xl font-bold text-blue-900 mb-3">
            Analyze Account
          </h2>
          <p className="text-gray-700 text-lg">
            Search for an account to view detailed security analysis
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Enter account ID (e.g., @user1)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all border border-blue-200"
            >
              <Search size={20} className="text-blue-600" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Try: @user1, @user2, @user4 (fake), @user7 (suspicious)
          </p>
        </form>

        {searched && !accountData && (
          <div className="border border-gray-300 p-8 rounded-lg backdrop-blur-sm text-center bg-gray-50">
            <p className="text-gray-600">
              Account not found. Please try another account ID.
            </p>
          </div>
        )}

        {accountData && (
          <div className="space-y-6">
            {/* Account Header */}
            <div className="border border-gray-300 p-8 rounded-lg backdrop-blur-sm bg-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {accountData.username}
                  </h3>
                  <p className="text-gray-600">{accountData.id}</p>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                    accountData.classification === "genuine"
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : accountData.classification === "suspicious"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {accountData.classification === "genuine" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertTriangle size={16} />
                  )}
                  {accountData.classification.charAt(0).toUpperCase() +
                    accountData.classification.slice(1)}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Account Age</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {accountData.accountAge}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Followers</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {accountData.followers.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Following</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {accountData.following.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Posts</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {accountData.posts.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Suspicion Score */}
            <div className="border border-gray-300 p-8 rounded-lg backdrop-blur-sm bg-white">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Overall Suspicion Score
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div className="text-6xl font-bold text-blue-600">
                  {accountData.suspicionScore}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-2">Risk Level</p>
                  <div
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      accountData.suspicionScore > 70
                        ? "bg-red-100 text-red-800"
                        : accountData.suspicionScore > 40
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {accountData.suspicionScore > 70
                      ? "High Risk"
                      : accountData.suspicionScore > 40
                        ? "Medium Risk"
                        : "Low Risk"}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
                <div
                  className={`h-full transition-all duration-500 ${
                    accountData.suspicionScore > 70
                      ? "bg-red-500"
                      : accountData.suspicionScore > 40
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${accountData.suspicionScore}%` }}
                />
              </div>
            </div>

            {/* Feature Scores */}
            <div className="border border-gray-300 p-8 rounded-lg backdrop-blur-sm bg-white">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Feature Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <ScoreBar label="Behavior Score" score={accountData.behaviorScore} />
                  <ScoreBar label="Content Score" score={accountData.contentScore} />
                </div>
                <div>
                  <ScoreBar label="Network Score" score={accountData.networkScore} />
                  <ScoreBar label="Trend Score" score={accountData.trendScore} />
                </div>
              </div>
            </div>

            {/* Reasons for Detection */}
            <div className="border border-gray-300 p-8 rounded-lg backdrop-blur-sm bg-white">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Analysis Summary
              </h3>
              <ul className="space-y-2">
                {accountData.reasons.map((reason, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!searched && (
          <div className="border border-gray-300 p-12 rounded-lg backdrop-blur-sm text-center bg-gray-50">
            <Search size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Enter an account ID above to start analyzing
            </p>
          </div>
        )}

        {/* All Accounts Section */}
        <div className="mt-12 pb-6 border-b-2 border-blue-200">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            All Accounts Overview
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            View detailed analysis of all accounts in the system
          </p>
          <button
            onClick={() => setShowAllAccounts(!showAllAccounts)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all border border-blue-700 shadow-md"
          >
            {showAllAccounts ? "Hide Accounts" : "Analyze All Accounts"}
          </button>
        </div>

        {showAllAccounts && (
          <div className="mt-8 bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Username</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Account Age</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Followers</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Following</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Posts</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Classification</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Suspicion Score</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {getAccountsList().map((account, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-300 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-all`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {account.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.accountAge}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.followers.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.following.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.posts.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getClassificationColor(account.classification)}`}>
                          {account.classification.charAt(0).toUpperCase() +
                            account.classification.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-center">
                        <span
                          className={`px-3 py-1 rounded-lg ${
                            account.suspicionScore > 70
                              ? "bg-red-100 text-red-800"
                              : account.suspicionScore > 40
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {account.suspicionScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-center">
                        <span
                          className={`px-3 py-1 rounded-lg ${
                            account.suspicionScore > 70
                              ? "bg-red-100 text-red-800"
                              : account.suspicionScore > 40
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {account.suspicionScore > 70
                            ? "High Risk"
                            : account.suspicionScore > 40
                              ? "Medium Risk"
                              : "Low Risk"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Accounts Section */}
        <div className="mt-12 pb-6 border-b-2 border-blue-200">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Bulk Upload & Analysis
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Upload a CSV file with account details to analyze multiple accounts at once
          </p>
          <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:bg-blue-100 transition-all cursor-pointer">
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <Upload size={48} className="text-blue-600 mb-3" />
              <p className="text-lg font-semibold text-blue-900 mb-2">
                Click to upload CSV file
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Required columns: username, followers, following, posts, account_age
              </p>
              <p className="text-xs text-gray-500">
                Example: user1, 5000, 1000, 300, 2 years
              </p>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {showUploadedResults && uploadedAccounts.length > 0 && (
          <div className="mt-8 bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-blue-50 border-b border-gray-300 px-6 py-4">
              <h3 className="text-2xl font-bold text-blue-900">
                Analysis Results ({uploadedAccounts.length} accounts)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Username</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Account Age</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Followers</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Following</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Posts</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Classification</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Suspicion Score</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedAccounts.map((account, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-300 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-all`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {account.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.accountAge}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.followers.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.following.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {account.posts.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getClassificationColor(account.classification)}`}>
                          {account.classification.charAt(0).toUpperCase() +
                            account.classification.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-center">
                        <span
                          className={`px-3 py-1 rounded-lg ${
                            account.suspicionScore > 70
                              ? "bg-red-100 text-red-800"
                              : account.suspicionScore > 40
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {account.suspicionScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-center">
                        <span
                          className={`px-3 py-1 rounded-lg ${
                            account.suspicionScore > 70
                              ? "bg-red-100 text-red-800"
                              : account.suspicionScore > 40
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {account.suspicionScore > 70
                            ? "High Risk"
                            : account.suspicionScore > 40
                              ? "Medium Risk"
                              : "Low Risk"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AnalyzeAccount;

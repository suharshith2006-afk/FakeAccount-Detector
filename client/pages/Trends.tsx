import { TrendingUp, AlertTriangle } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

interface TrendingHashtag {
  hashtag: string;
  mentions: number;
  change: number;
  status: "rising" | "falling";
  riskLevel: "low" | "medium" | "high";
  posts: number;
}

const Trends = () => {
  const trendingData: TrendingHashtag[] = [
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
      hashtag: "#NewProductLaunch",
      mentions: 87300,
      change: 3.4,
      status: "rising",
      riskLevel: "low",
      posts: 43200,
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
      hashtag: "#MakeMoneyFast",
      mentions: 45200,
      change: 89.5,
      status: "rising",
      riskLevel: "high",
      posts: 31200,
    },
    {
      hashtag: "#Entertainment",
      mentions: 156800,
      change: -5.2,
      status: "falling",
      riskLevel: "low",
      posts: 102300,
    },
    {
      hashtag: "#FakeGiveaway",
      mentions: 32400,
      change: 156.3,
      status: "rising",
      riskLevel: "high",
      posts: 18900,
    },
    {
      hashtag: "#ArtistsOfTwitter",
      mentions: 89200,
      change: 21.4,
      status: "rising",
      riskLevel: "low",
      posts: 67400,
    },
    {
      hashtag: "#BotNetwork",
      mentions: 12300,
      change: 234.5,
      status: "rising",
      riskLevel: "high",
      posts: 8200,
    },
  ];

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <AppLayout>
      <div className="p-8 bg-white min-h-screen">
        <div className="mb-8 pb-6 border-b-2 border-blue-200">
          <h2 className="text-5xl font-bold text-blue-900 mb-3">
            Trending Content
          </h2>
          <p className="text-gray-700 text-lg">
            Monitor top hashtags and identify fraud patterns in trending topics
          </p>
        </div>

        {/* Trending Hashtags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {trendingData.map((trend, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-6 rounded-lg bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-blue-900">
                    {trend.hashtag}
                  </p>
                  <p className="text-sm text-gray-600">
                    {trend.mentions.toLocaleString()} mentions
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                    trend.riskLevel
                  )}`}
                >
                  {trend.riskLevel.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center mb-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Change</p>
                  <p
                    className={`text-sm font-bold ${
                      trend.change > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trend.change > 0 ? "+" : ""}
                    {trend.change.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Posts</p>
                  <p className="text-sm font-bold text-gray-700">
                    {(trend.posts / 1000).toFixed(1)}K
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Status</p>
                  <p className="text-sm font-bold text-gray-700">
                    {trend.status === "rising" ? "📈" : "📉"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-600" />
                <p className="text-xs text-gray-600">
                  {trend.riskLevel === "high" ? (
                    <span className="flex items-center gap-1">
                      <AlertTriangle size={14} className="text-red-600" />
                      Requires attention
                    </span>
                  ) : (
                    "Standard trend"
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg bg-blue-50">
            <p className="text-sm text-gray-600 mb-2">High Risk Trends</p>
            <p className="text-3xl font-bold text-red-600">4</p>
            <p className="text-xs text-gray-600 mt-2">Requiring immediate attention</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg bg-amber-50">
            <p className="text-sm text-gray-600 mb-2">Medium Risk Trends</p>
            <p className="text-3xl font-bold text-amber-600">1</p>
            <p className="text-xs text-gray-600 mt-2">To monitor closely</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg bg-green-50">
            <p className="text-sm text-gray-600 mb-2">Low Risk Trends</p>
            <p className="text-3xl font-bold text-green-600">5</p>
            <p className="text-xs text-gray-600 mt-2">Generally authentic</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Trends;

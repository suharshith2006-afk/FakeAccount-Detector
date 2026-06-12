import { useState, useEffect } from "react";
import { AlertTriangle, BarChart3, TrendingUp, Users, Activity, Lock, ShieldAlert } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { getAllAccounts } from "@/lib/api";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const [loading, setLoading] = useState(true);
  const [accountStats, setAccountStats] = useState({
    totalAnalyzed: 0,
    fakeDetected: 0,
    suspiciousAccounts: 0,
    activeTrends: 0,
  });

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllAccounts();
        if (response.data && response.data.summary) {
          const { summary } = response.data;
          setAccountStats({
            totalAnalyzed: summary.total || 0,
            fakeDetected: summary.fake || 0,
            suspiciousAccounts: summary.suspicious || 0,
            activeTrends: 47, // This would come from trending endpoint
          });
        }
      } catch (error) {
        console.error("Failed to fetch account stats:", error);
        // Fall back to default stats
        setAccountStats({
          totalAnalyzed: 15240,
          fakeDetected: 3421,
          suspiciousAccounts: 892,
          activeTrends: 47,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    trend,
    color,
  }: {
    icon: any;
    label: string;
    value: number;
    trend?: string;
    color: string;
  }) => {
    const colorClasses: { [key: string]: { bg: string; text: string; icon: string; border: string; hover: string } } = {
      cyan: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-600", border: "border-blue-200", hover: "hover:border-blue-400 hover:shadow-lg" },
      red: { bg: "bg-red-50", text: "text-red-600", icon: "text-red-600", border: "border-red-200", hover: "hover:border-red-400 hover:shadow-lg" },
      yellow: { bg: "bg-amber-50", text: "text-amber-600", icon: "text-amber-600", border: "border-amber-200", hover: "hover:border-amber-400 hover:shadow-lg" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", icon: "text-purple-600", border: "border-purple-200", hover: "hover:border-purple-400 hover:shadow-lg" },
    };

    const cls = colorClasses[color] || colorClasses.cyan;

    return (
      <div className={`${cls.border} border rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${cls.hover} group bg-white cursor-pointer`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">{label}</p>
            <p className={`text-4xl font-bold ${cls.text}`}>
              {value.toLocaleString()}
            </p>
            {trend && (
              <p className="text-xs text-green-600 mt-3 flex items-center gap-1 font-semibold">
                <TrendingUp size={14} /> {trend}
              </p>
            )}
          </div>
          <div className={`p-4 rounded-xl ${cls.bg} border ${cls.border} group-hover:scale-110 transition-transform`}>
            <Icon size={28} className={cls.icon} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="p-8 bg-gradient-to-br from-white to-blue-50 min-h-screen">
        {/* Header with Time Range Filter */}
        <div className="mb-8 pb-6 border-b-2 border-blue-200 flex justify-between items-start">
          <div>
            <h2 className="text-5xl font-bold text-blue-900 mb-3">Dashboard</h2>
            <p className="text-gray-700 text-lg">
              Real-time detection analytics and account security metrics
            </p>
          </div>
          <div className="flex gap-3">
            {(["24h", "7d", "30d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  timeRange === range
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400"
                }`}
              >
                {range === "24h" ? "Last 24h" : range === "7d" ? "Last 7d" : "Last Month"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Accounts Analyzed"
            value={accountStats.totalAnalyzed}
            trend="+15.3%"
            color="cyan"
          />
          <StatCard
            icon={AlertTriangle}
            label="Fake Accounts Detected"
            value={accountStats.fakeDetected}
            trend="+12.5%"
            color="red"
          />
          <StatCard
            icon={ShieldAlert}
            label="Suspicious Accounts"
            value={accountStats.suspiciousAccounts}
            trend="+8.2%"
            color="yellow"
          />
          <StatCard
            icon={TrendingUp}
            label="Active Trends Monitored"
            value={accountStats.activeTrends}
            trend="+5.7%"
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 border border-gray-200 p-6 rounded-xl backdrop-blur-sm bg-white shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-blue-600" size={24} />
              <h3 className="text-2xl font-bold text-blue-900">Recent Detections</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-transparent rounded-lg border border-red-200 hover:border-red-300 cursor-pointer transition">
                <div>
                  <p className="text-gray-800 font-semibold">@suspicious_user_2847</p>
                  <p className="text-xs text-gray-500">Detected 2 minutes ago</p>
                </div>
                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-sm">FAKE</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-transparent rounded-lg border border-red-200 hover:border-red-300 cursor-pointer transition">
                <div>
                  <p className="text-gray-800 font-semibold">@botnet_cluster_42</p>
                  <p className="text-xs text-gray-500">Detected 5 minutes ago</p>
                </div>
                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-sm">COORDINATED</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-transparent rounded-lg border border-amber-200 hover:border-amber-300 cursor-pointer transition">
                <div>
                  <p className="text-gray-800 font-semibold">@trending_spam_hashtag</p>
                  <p className="text-xs text-gray-500">Detected 8 minutes ago</p>
                </div>
                <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-bold text-sm">SUSPICIOUS</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-200 hover:border-green-300 cursor-pointer transition">
                <div>
                  <p className="text-gray-800 font-semibold">@legitimate_user_9501</p>
                  <p className="text-xs text-gray-500">Verified 15 minutes ago</p>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">GENUINE</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="border border-gray-200 p-6 rounded-xl backdrop-blur-sm bg-white shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-blue-600" size={24} />
              <h3 className="text-2xl font-bold text-blue-900">Detection Rate</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Fake Accounts</span>
                  <span className="text-sm font-bold text-red-600">22.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full w-[22.5%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Suspicious</span>
                  <span className="text-sm font-bold text-amber-600">5.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full w-[5.8%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Genuine</span>
                  <span className="text-sm font-bold text-green-600">71.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full w-[71.7%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

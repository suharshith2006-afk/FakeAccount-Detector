import { BarChart3 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

interface MonthlyReport {
  month: string;
  analyzed: number;
  fake: number;
  suspicious: number;
  actions: number;
}

interface DailyStatistic {
  date: string;
  analyzed: number;
  fake: number;
  suspicious: number;
  reports: number;
}

const Reports = () => {
  const monthlyReports: MonthlyReport[] = [
    {
      month: "March 2025",
      analyzed: 12540,
      fake: 2145,
      suspicious: 892,
      actions: 389,
    },
    {
      month: "February 2025",
      analyzed: 10230,
      fake: 1845,
      suspicious: 725,
      actions: 321,
    },
    {
      month: "January 2025",
      analyzed: 14500,
      fake: 2890,
      suspicious: 943,
      actions: 456,
    },
  ];

  const dailyStats: DailyStatistic[] = [
    {
      date: "March 25, 2025",
      analyzed: 578,
      fake: 105,
      suspicious: 48,
      reports: 41,
    },
    {
      date: "March 24, 2025",
      analyzed: 612,
      fake: 98,
      suspicious: 52,
      reports: 38,
    },
    {
      date: "March 23, 2025",
      analyzed: 523,
      fake: 87,
      suspicious: 41,
      reports: 35,
    },
    {
      date: "March 22, 2025",
      analyzed: 645,
      fake: 112,
      suspicious: 55,
      reports: 46,
    },
    {
      date: "March 21, 2025",
      analyzed: 589,
      fake: 102,
      suspicious: 49,
      reports: 42,
    },
    {
      date: "March 20, 2025",
      analyzed: 534,
      fake: 92,
      suspicious: 45,
      reports: 38,
    },
  ];

  const totalAnalyzed = 37270;
  const totalGenuine = 28030;
  const totalFake = 6680;
  const totalSuspicious = 2560;

  return (
    <AppLayout>
      <div className="p-8 bg-white min-h-screen">
        <div className="mb-8 pb-6 border-b-2 border-blue-200">
          <h2 className="text-5xl font-bold text-blue-900 mb-3">Reports</h2>
          <p className="text-gray-700 text-lg">
            Detailed analytics and monthly reports on account classifications
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="border border-gray-200 p-6 rounded-lg bg-white">
            <p className="text-sm text-gray-600 mb-2">Total Analyzed</p>
            <p className="text-3xl font-bold text-blue-600">
              {totalAnalyzed.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-2">Accounts processed</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg bg-white">
            <p className="text-sm text-gray-600 mb-2">Genuine</p>
            <p className="text-3xl font-bold text-green-600">
              {totalGenuine.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {((totalGenuine / totalAnalyzed) * 100).toFixed(1)}% of total
            </p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg bg-white">
            <p className="text-sm text-gray-600 mb-2">Fake</p>
            <p className="text-3xl font-bold text-red-600">
              {totalFake.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {((totalFake / totalAnalyzed) * 100).toFixed(1)}% of total
            </p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg bg-white">
            <p className="text-sm text-gray-600 mb-2">Suspicious</p>
            <p className="text-3xl font-bold text-amber-600">
              {totalSuspicious.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {((totalSuspicious / totalAnalyzed) * 100).toFixed(1)}% of total
            </p>
          </div>
        </div>

        {/* Monthly Reports */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Monthly Reports</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Total Analyzed
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Fake
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Suspicious
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions Taken
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyReports.map((report, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {report.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {report.analyzed.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 font-semibold">
                      {report.fake.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-600 font-semibold">
                      {report.suspicious.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-semibold">
                      {report.actions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Statistics */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Daily Statistics</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Accounts Analyzed
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Fake Detected
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Suspicious
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Reports Filed
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailyStats.map((stat, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{stat.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {stat.analyzed.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 font-semibold">
                      {stat.fake.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-600 font-semibold">
                      {stat.suspicious.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-semibold">
                      {stat.reports.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;

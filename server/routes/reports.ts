import { RequestHandler } from "express";

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

const dailyStatistics: DailyStatistic[] = [
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

// Get all monthly reports
export const getMonthlyReports: RequestHandler = (req, res) => {
  const totalAnalyzed = monthlyReports.reduce((sum, r) => sum + r.analyzed, 0);
  const totalFake = monthlyReports.reduce((sum, r) => sum + r.fake, 0);
  const totalSuspicious = monthlyReports.reduce((sum, r) => sum + r.suspicious, 0);

  const summary = {
    totalAnalyzed,
    totalFake,
    totalSuspicious,
    totalGenuine: totalAnalyzed - totalFake - totalSuspicious,
    averageFakePerMonth: (totalFake / monthlyReports.length).toFixed(0),
    fakePercentage: ((totalFake / totalAnalyzed) * 100).toFixed(1),
  };

  res.json({
    success: true,
    message: "Monthly reports retrieved",
    data: {
      reports: monthlyReports,
      summary,
    },
  });
};

// Get all daily statistics
export const getDailyStatistics: RequestHandler = (req, res) => {
  const totalAnalyzed = dailyStatistics.reduce((sum, d) => sum + d.analyzed, 0);
  const totalFake = dailyStatistics.reduce((sum, d) => sum + d.fake, 0);
  const totalSuspicious = dailyStatistics.reduce((sum, d) => sum + d.suspicious, 0);
  const totalReports = dailyStatistics.reduce((sum, d) => sum + d.reports, 0);

  const averagePerDay = {
    analyzed: Math.round(totalAnalyzed / dailyStatistics.length),
    fake: Math.round(totalFake / dailyStatistics.length),
    suspicious: Math.round(totalSuspicious / dailyStatistics.length),
    reports: Math.round(totalReports / dailyStatistics.length),
  };

  res.json({
    success: true,
    message: "Daily statistics retrieved",
    data: {
      statistics: dailyStatistics,
      totals: {
        totalAnalyzed,
        totalFake,
        totalSuspicious,
        totalReports,
      },
      averagePerDay,
    },
  });
};

// Get report for specific month
export const getMonthlyReport: RequestHandler = (req, res) => {
  const month = req.query.month as string;
  if (!month) {
    return res.status(400).json({ success: false, message: "Month required", data: null });
  }

  const report = monthlyReports.find((r) => r.month.toLowerCase().includes(month.toLowerCase()));

  if (!report) {
    return res.status(404).json({
      success: false,
      message: `Report for ${month} not found`,
      data: null,
    });
  }

  const genuine = report.analyzed - report.fake - report.suspicious;

  const breakdown = {
    ...report,
    genuine,
    percentages: {
      fakePercent: ((report.fake / report.analyzed) * 100).toFixed(1),
      suspiciousPercent: ((report.suspicious / report.analyzed) * 100).toFixed(1),
      genuinePercent: ((genuine / report.analyzed) * 100).toFixed(1),
    },
  };

  res.json({
    success: true,
    message: `Monthly report for ${month} retrieved`,
    data: breakdown,
  });
};

// Get comprehensive report overview
export const getReportOverview: RequestHandler = (req, res) => {
  const allAnalyzed =
    monthlyReports.reduce((sum, r) => sum + r.analyzed, 0) +
    dailyStatistics.reduce((sum, d) => sum + d.analyzed, 0);
  const allFake = monthlyReports.reduce((sum, r) => sum + r.fake, 0) + dailyStatistics.reduce((sum, d) => sum + d.fake, 0);
  const allSuspicious = monthlyReports.reduce((sum, r) => sum + r.suspicious, 0) + dailyStatistics.reduce((sum, d) => sum + d.suspicious, 0);
  const allGenuine = allAnalyzed - allFake - allSuspicious;

  const overview = {
    periodCovered: {
      from: "January 1, 2025",
      to: "March 25, 2025",
    },
    totalStatistics: {
      analyzed: allAnalyzed,
      genuine: allGenuine,
      fake: allFake,
      suspicious: allSuspicious,
    },
    percentages: {
      genuine: ((allGenuine / allAnalyzed) * 100).toFixed(1),
      fake: ((allFake / allAnalyzed) * 100).toFixed(1),
      suspicious: ((allSuspicious / allAnalyzed) * 100).toFixed(1),
    },
    keyMetrics: {
      highestFakeMonth: monthlyReports.reduce((max, r) => (r.fake > max.fake ? r : max)),
      averageAnalyzedPerDay: Math.round(
        dailyStatistics.reduce((sum, d) => sum + d.analyzed, 0) / dailyStatistics.length
      ),
      actionsTaken: monthlyReports.reduce((sum, r) => sum + r.actions, 0),
    },
    trend: "Increasing detection rate - fraud prevention efforts showing positive results",
  };

  res.json({
    success: true,
    message: "Report overview retrieved",
    data: overview,
  });
};

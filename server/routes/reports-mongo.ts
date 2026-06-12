import { RequestHandler } from "express";
import { getMonthlyReportsCollection, getDailyStatisticsCollection } from "../db";

export const getMonthlyReports: RequestHandler = async (req, res) => {
  try {
    const collection = getMonthlyReportsCollection();
    const monthlyReports = await collection.find({}).toArray();

    const totalAnalyzed = monthlyReports.reduce((sum, r) => sum + r.analyzed, 0);
    const totalFake = monthlyReports.reduce((sum, r) => sum + r.fake, 0);
    const totalSuspicious = monthlyReports.reduce((sum, r) => sum + r.suspicious, 0);

    const summary = {
      totalAnalyzed,
      totalFake,
      totalSuspicious,
      totalGenuine: totalAnalyzed - totalFake - totalSuspicious,
      averageFakePerMonth: monthlyReports.length ? (totalFake / monthlyReports.length).toFixed(0) : 0,
      fakePercentage: totalAnalyzed ? ((totalFake / totalAnalyzed) * 100).toFixed(1) : 0,
    };

    res.json({
      success: true,
      message: "Monthly reports retrieved",
      data: {
        reports: monthlyReports,
        summary,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching monthly reports",
      data: null,
    });
  }
};

export const getDailyStatistics: RequestHandler = async (req, res) => {
  try {
    const collection = getDailyStatisticsCollection();
    const dailyStatistics = await collection.find({}).toArray();

    const totalAnalyzed = dailyStatistics.reduce((sum, d) => sum + d.analyzed, 0);
    const totalFake = dailyStatistics.reduce((sum, d) => sum + d.fake, 0);
    const totalSuspicious = dailyStatistics.reduce((sum, d) => sum + d.suspicious, 0);
    const totalReports = dailyStatistics.reduce((sum, d) => sum + d.reports, 0);

    const averagePerDay = {
      analyzed: dailyStatistics.length ? Math.round(totalAnalyzed / dailyStatistics.length) : 0,
      fake: dailyStatistics.length ? Math.round(totalFake / dailyStatistics.length) : 0,
      suspicious: dailyStatistics.length ? Math.round(totalSuspicious / dailyStatistics.length) : 0,
      reports: dailyStatistics.length ? Math.round(totalReports / dailyStatistics.length) : 0,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching daily statistics",
      data: null,
    });
  }
};

export const getMonthlyReport: RequestHandler = async (req, res) => {
  try {
    const month = req.query.month as string;
    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month required",
        data: null,
      });
    }

    const collection = getMonthlyReportsCollection();
    const report = await collection.findOne({
      month: { $regex: month, $options: "i" },
    });

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching monthly report",
      data: null,
    });
  }
};

export const getReportOverview: RequestHandler = async (req, res) => {
  try {
    const monthlyCollection = getMonthlyReportsCollection();
    const dailyCollection = getDailyStatisticsCollection();

    const monthlyReports = await monthlyCollection.find({}).toArray();
    const dailyStatistics = await dailyCollection.find({}).toArray();

    const allAnalyzed =
      monthlyReports.reduce((sum, r) => sum + r.analyzed, 0) +
      dailyStatistics.reduce((sum, d) => sum + d.analyzed, 0);
    const allFake =
      monthlyReports.reduce((sum, r) => sum + r.fake, 0) +
      dailyStatistics.reduce((sum, d) => sum + d.fake, 0);
    const allSuspicious =
      monthlyReports.reduce((sum, r) => sum + r.suspicious, 0) +
      dailyStatistics.reduce((sum, d) => sum + d.suspicious, 0);
    const allGenuine = allAnalyzed - allFake - allSuspicious;

    const highestFakeMonth = monthlyReports.reduce((max, r) =>
      r.fake > max.fake ? r : max
    );

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
        genuine: allAnalyzed ? ((allGenuine / allAnalyzed) * 100).toFixed(1) : 0,
        fake: allAnalyzed ? ((allFake / allAnalyzed) * 100).toFixed(1) : 0,
        suspicious: allAnalyzed ? ((allSuspicious / allAnalyzed) * 100).toFixed(1) : 0,
      },
      keyMetrics: {
        highestFakeMonth,
        averageAnalyzedPerDay: dailyStatistics.length
          ? Math.round(dailyStatistics.reduce((sum, d) => sum + d.analyzed, 0) / dailyStatistics.length)
          : 0,
        actionsTaken: monthlyReports.reduce((sum, r) => sum + r.actions, 0),
      },
      trend: "Increasing detection rate - fraud prevention efforts showing positive results",
    };

    res.json({
      success: true,
      message: "Report overview retrieved",
      data: overview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching report overview",
      data: null,
    });
  }
};

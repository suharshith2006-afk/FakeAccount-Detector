import {
  connectDB,
  getAccountsCollection,
  getTrendingCollection,
  getMonthlyReportsCollection,
  getDailyStatisticsCollection,
} from "./db";
import { SAMPLE_ACCOUNTS, SAMPLE_TRENDING, SAMPLE_MONTHLY_REPORTS, SAMPLE_DAILY_STATS } from "./seedData";

export async function seedDatabase() {
  try {
    console.log("🌱 Seeding database with sample data...");

    // Accounts
    const accountsCollection = getAccountsCollection();
    const accountCount = await accountsCollection.countDocuments();
    if (accountCount === 0) {
      await accountsCollection.insertMany(SAMPLE_ACCOUNTS);
      console.log(`✓ Inserted ${SAMPLE_ACCOUNTS.length} accounts`);
    } else {
      console.log(`✓ Accounts collection already has ${accountCount} documents`);
    }

    // Trending
    const trendingCollection = getTrendingCollection();
    const trendCount = await trendingCollection.countDocuments();
    if (trendCount === 0) {
      await trendingCollection.insertMany(SAMPLE_TRENDING);
      console.log(`✓ Inserted ${SAMPLE_TRENDING.length} trending items`);
    } else {
      console.log(`✓ Trending collection already has ${trendCount} documents`);
    }

    // Monthly Reports
    const monthlyCollection = getMonthlyReportsCollection();
    const monthlyCount = await monthlyCollection.countDocuments();
    if (monthlyCount === 0) {
      await monthlyCollection.insertMany(SAMPLE_MONTHLY_REPORTS);
      console.log(`✓ Inserted ${SAMPLE_MONTHLY_REPORTS.length} monthly reports`);
    } else {
      console.log(`✓ Monthly reports collection already has ${monthlyCount} documents`);
    }

    // Daily Statistics
    const dailyCollection = getDailyStatisticsCollection();
    const dailyCount = await dailyCollection.countDocuments();
    if (dailyCount === 0) {
      await dailyCollection.insertMany(SAMPLE_DAILY_STATS);
      console.log(`✓ Inserted ${SAMPLE_DAILY_STATS.length} daily statistics`);
    } else {
      console.log(`✓ Daily statistics collection already has ${dailyCount} documents`);
    }

    console.log("✓ Database seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

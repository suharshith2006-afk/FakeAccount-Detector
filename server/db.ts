import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "fake_detection";

let db: Db | null = null;
let client: MongoClient | null = null;

export interface Account {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TrendingItem {
  _id?: string;
  hashtag: string;
  mentions: number;
  change: number;
  status: "rising" | "falling";
  riskLevel: "low" | "medium" | "high";
  posts: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MonthlyReport {
  _id?: string;
  month: string;
  analyzed: number;
  fake: number;
  suspicious: number;
  actions: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DailyStatistic {
  _id?: string;
  date: string;
  analyzed: number;
  fake: number;
  suspicious: number;
  reports: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function connectDB(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    if (!collectionNames.includes("accounts")) {
      await db.createCollection("accounts");
      await db.collection("accounts").createIndex({ username: 1 }, { unique: true });
    }

    if (!collectionNames.includes("trending")) {
      await db.createCollection("trending");
      await db.collection("trending").createIndex({ hashtag: 1 }, { unique: true });
    }

    if (!collectionNames.includes("monthly_reports")) {
      await db.createCollection("monthly_reports");
      await db.collection("monthly_reports").createIndex({ month: 1 }, { unique: true });
    }

    if (!collectionNames.includes("daily_statistics")) {
      await db.createCollection("daily_statistics");
      await db.collection("daily_statistics").createIndex({ date: 1 }, { unique: true });
    }

    console.log(`✓ Connected to MongoDB: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log("✓ Disconnected from MongoDB");
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

export function getAccountsCollection(): Collection<Account> {
  return getDB().collection("accounts");
}

export function getTrendingCollection(): Collection<TrendingItem> {
  return getDB().collection("trending");
}

export function getMonthlyReportsCollection(): Collection<MonthlyReport> {
  return getDB().collection("monthly_reports");
}

export function getDailyStatisticsCollection(): Collection<DailyStatistic> {
  return getDB().collection("daily_statistics");
}

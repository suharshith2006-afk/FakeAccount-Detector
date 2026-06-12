# MongoDB Configuration for Fake Account Detection Dashboard

## Setup Instructions

### 1. Install MongoDB
- Download from: https://www.mongodb.com/try/download/community
- Follow the installation guide for your OS

### 2. Start MongoDB Server
**Windows:**
```bash
# If installed as a service, it should start automatically
# Or manually start:
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Environment Setup
Create a `.env` file in the project root:
```env
MONGODB_URI=mongodb://localhost:27017
```

### 4. Start the Server
```bash
npm run dev
```

The server will:
1. Connect to MongoDB
2. Create collections if they don't exist
3. Seed sample data on first run
4. Start listening on port 8082

## Database Structure

### Collections

**accounts**
- Stores user account analysis data
- Fields: username, accountAge, followers, posts, classification, scores, reasons
- Index: unique on `username`

**trending**
- Stores trending hashtags and risk levels
- Fields: hashtag, mentions, change, status, riskLevel, posts
- Index: unique on `hashtag`

**monthly_reports**
- Stores monthly analytics reports
- Fields: month, analyzed, fake, suspicious, actions
- Index: unique on `month`

**daily_statistics**
- Stores daily statistics
- Fields: date, analyzed, fake, suspicious, reports
- Index: unique on `date`

## API Endpoints (MongoDB Version)

All endpoints work the same as before but now read/write to MongoDB!

### Accounts
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/search?classification=fake` - Search accounts
- `GET /api/accounts/:accountId` - Get specific account
- `GET /api/accounts/:accountId/risk-score` - Calculate risk score

### Trending
- `GET /api/trending` - Get all trending hashtags
- `GET /api/trending/by-risk?riskLevel=high` - Filter by risk
- `GET /api/trending/analytics` - Get analytics
- `GET /api/trending/hashtag?hashtag=SpotifyWrapped2025` - Get details

### Reports
- `GET /api/reports/monthly` - Get monthly reports
- `GET /api/reports/daily` - Get daily statistics
- `GET /api/reports/monthly-detail?month=January` - Get specific month
- `GET /api/reports/overview` - Get overview

## File Structure

```
server/
├── db.ts                 # MongoDB connection & utilities
├── seedData.ts          # Sample data
├── seed.ts              # Database seeding function
├── index-mongo.ts       # Main server with MongoDB (NEW)
├── routes/
│   ├── accounts-mongo.ts      # Account routes with MongoDB
│   ├── trends-mongo.ts        # Trending routes with MongoDB
│   ├── reports-mongo.ts       # Reports routes with MongoDB
│   └── demo.ts                # Demo route (unchanged)
└── ...
```

## Data Persistence

Data now persists in MongoDB! Each time you:
- Add/update data, it's saved to the database
- Restart the server, data is retained
- Create new servers, they all access the same data

## Switching Between Versions

### Use Mock Data (Original)
```bash
# In server/node-build.ts, change import:
import { createServer } from "./index"; // Original mock version
```

### Use MongoDB (New)
```bash
# In server/node-build.ts, change import:
import { createServer } from "./index-mongo"; // MongoDB version
```

Currently using: **MongoDB Version** ✓

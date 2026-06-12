# Backend Setup Guide

## Option 1: Using Local MongoDB (Recommended for Development)

### 1. Install MongoDB Community Edition
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **macOS**: `brew install mongodb-community`
- **Linux**: `sudo apt-get install -y mongodb-org`

### 2. Start MongoDB Server

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or manually run:
mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Run Both Frontend & Backend Together

```bash
npm run dev:full
```

This will start:
- **Frontend**: http://localhost:8083 (or next available port)
- **Backend**: http://localhost:3001

---

## Option 2: Using MongoDB Atlas (Cloud)

### 1. Create Free MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Create a free account and cluster

### 2. Get Connection String
- In Atlas, click "Connect"
- Copy the connection string
- Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake_detection
```

### 3. Run Backend
```bash
npm run dev:full
```

---

## Testing the Backend

Once running, test the API:

```bash
# Get all accounts
curl http://localhost:3001/api/accounts

# Search accounts
curl "http://localhost:3001/api/accounts/search?classification=fake"

# Get trending hashtags
curl http://localhost:3001/api/trending

# Get reports
curl http://localhost:3001/api/reports/monthly
```

---

## Troubleshooting

### MongoDB Connection Refused
- Make sure `mongod` is running
- Check `MONGODB_URI` in `.env` is correct
- Default local: `mongodb://localhost:27017`

### Port 3001 Already in Use
- Change `PORT` in `.env` to another port (3002, 3003, etc.)
- Update `VITE_API_URL` in `.env` to match

### Frontend Can't Find Backend
- Make sure `VITE_API_URL` in `.env` matches backend running port
- Restart frontend if you change `.env`

---

## Available Scripts

```bash
npm run dev          # Frontend only (Vite)
npm run dev:backend  # Backend only (with auto-reload)
npm run dev:full     # Frontend + Backend together
npm run build        # Build both for production
npm run start        # Run production server
npm run typecheck    # Validate TypeScript
```

---

## Status

✅ Backend API routes ready  
✅ MongoDB integration complete  
✅ Concurrently setup done  
✅ Auto-reload configured  

**Next: Start MongoDB and run `npm run dev:full`!**

import path from "path";
import { createServer } from "./index"; // Use original mock version
import * as express from "express";

const app = createServer();
const port = process.env.PORT || 3001;

// In development, only serve API routes
// No need for SPA serving since frontend runs on Vite

app.listen(port, () => {
  console.log(`✅ Backend API Server running on port ${port}`);
  console.log(`📡 API Endpoint: http://localhost:${port}/api`);
  console.log(`\n🔗 Frontend connects to this server for data`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});

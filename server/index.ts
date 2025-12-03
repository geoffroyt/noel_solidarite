import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import donationsRouter from "./routes/donations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Sur Vercel, nous servons toujours depuis dist/public
  const staticPath = path.resolve(__dirname, "..", "dist", "public");
  
  app.use(express.static(staticPath));
  app.use(express.json());

  // API routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Donations API
  app.use("/api", donationsRouter);

  // Handle client-side routing (must be last)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Serving static files from: ${staticPath}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
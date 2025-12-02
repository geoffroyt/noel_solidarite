import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Déterminez le chemin des fichiers statiques
  const isProduction = process.env.NODE_ENV === "production";
  
  // Initialisez avec une valeur par défaut
  let staticPath = "";
  
  if (isProduction) {
    // En production, les fichiers sont dans dist/public
    staticPath = path.resolve(__dirname, "..", "dist", "public");
    
    // En production, servez les fichiers statiques
    app.use(express.static(staticPath));
    console.log(`Serving static files from: ${staticPath}`);
  } else {
    // En développement, Vite sert les fichiers depuis client
    console.log("Development mode: Vite handles static files");
    // Initialisez quand même pour éviter les erreurs
    staticPath = path.resolve(__dirname, "..", "client");
  }

  // API route example
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // En production, catch-all pour le SPA
  if (isProduction && staticPath) {
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  // En développement, proxy vers Vite si nécessaire
  if (!isProduction) {
    app.get("*", (_req, res) => {
      res.send("Development mode - please use Vite dev server on port 3000");
    });
  }

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Mode: ${isProduction ? "production" : "development"}`);
    if (!isProduction) {
      console.log(`Vite dev server should be running separately on port 3000`);
    }
  });
}

startServer().catch(console.error);
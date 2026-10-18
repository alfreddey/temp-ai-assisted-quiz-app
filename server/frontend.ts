import express, { type Express } from "express";
import path from "node:path";
import { config } from "./config.js";

const NON_API_PATHS = /^(?!\/api).*/;

/** Serves the built app in production, or Vite's dev middleware with hot reload in development. */
export async function attachFrontend(app: Express, projectRoot: string): Promise<void> {
  if (config.isProduction) {
    const distDir = path.join(projectRoot, "dist");
    app.use(express.static(distDir));
    app.get(NON_API_PATHS, (_req, res) => res.sendFile(path.join(distDir, "index.html")));
    return;
  }

  const { createServer } = await import("vite");
  const vite = await createServer({
    root: projectRoot,
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

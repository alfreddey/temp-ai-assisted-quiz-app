import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config.js";
import { attachFrontend } from "./frontend.js";
import { quizRouter } from "./routes/quiz.js";
import { tutorRouter } from "./routes/tutor.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const app = express();
app.use(express.json({ limit: config.requestBodyLimit }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, demoMode: config.demoMode });
});
app.use("/api/quiz", quizRouter);
app.use("/api/tutor", tutorRouter);

await attachFrontend(app, projectRoot);

app.listen(config.port, () => {
  const mode = config.demoMode ? " (demo mode)" : "";
  console.log(`Loop quiz running at http://localhost:${config.port}${mode}`);
});

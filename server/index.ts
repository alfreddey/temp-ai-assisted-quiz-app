import express, { type Request, type Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  QuizRequestSchema,
  TutorRequestSchema,
  type QuizResponse,
  type TutorResponse,
} from "../shared/quiz.js";
import { AiUnavailableError, generateQuiz, tutorReply } from "./ai.js";
import { sampleQuiz } from "./samples.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const isProd = process.env.NODE_ENV === "production";
const demoMode = process.env.LOOP_DEMO_MODE === "1";
const port = Number(process.env.PORT ?? 5173);

const app = express();
app.use(express.json({ limit: "64kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, demoMode });
});

app.post("/api/quiz", async (req: Request, res: Response) => {
  const parsed = QuizRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Add a topic of at least 3 characters." });
    return;
  }
  const request = parsed.data;
  if (demoMode) {
    res.json({ quiz: sampleQuiz(request), source: "sample" } satisfies QuizResponse);
    return;
  }
  try {
    const quiz = await generateQuiz(request);
    res.json({ quiz, source: "ai" } satisfies QuizResponse);
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      console.warn("[quiz] Claude unavailable, serving sample quiz:", error.message);
      res.json({
        quiz: sampleQuiz(request),
        source: "sample",
        notice: `Claude isn’t connected, so here’s a sample ${request.subject} quiz. Set ANTHROPIC_API_KEY to generate quizzes on any topic.`,
      } satisfies QuizResponse);
      return;
    }
    console.error("[quiz]", error);
    res.status(502).json({ error: (error as Error).message || "Quiz generation failed." });
  }
});

app.post("/api/tutor", async (req: Request, res: Response) => {
  const parsed = TutorRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Ask a question about this problem." });
    return;
  }
  const { question } = parsed.data;
  const offline: TutorResponse = {
    reply: `${question.explanation.why} ${question.explanation.steps.join(" → ")}. ${question.explanation.check} (Connect Claude for personalised follow-ups.)`,
    source: "sample",
  };
  if (demoMode) {
    res.json(offline);
    return;
  }
  try {
    const reply = await tutorReply(parsed.data);
    res.json({ reply, source: "ai" } satisfies TutorResponse);
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      res.json(offline);
      return;
    }
    console.error("[tutor]", error);
    res.status(502).json({ error: "The study buddy couldn’t answer just now. Try again." });
  }
});

if (isProd) {
  const dist = path.join(root, "dist");
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, "index.html")));
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Loop quiz running at http://localhost:${port}${demoMode ? " (demo mode)" : ""}`);
});

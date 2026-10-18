export const config = {
  isProduction: process.env.NODE_ENV === "production",
  /** Forces built-in sample content, even when Claude credentials exist. */
  demoMode: process.env.LOOP_DEMO_MODE === "1",
  port: Number(process.env.PORT ?? 5173),
  requestBodyLimit: "64kb",
};

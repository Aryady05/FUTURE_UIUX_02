import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: process.env.DATABASE_URL ?? "",
  allowDevAuthBypass: process.env.ALLOW_DEV_AUTH_BYPASS === "true",
  devAuthDefaultUserId: process.env.DEV_AUTH_DEFAULT_USER_ID ?? "demo-user",
  devAuthDefaultEmail: process.env.DEV_AUTH_DEFAULT_EMAIL ?? "demo@shreeyoga.app",
  devAuthDefaultName: process.env.DEV_AUTH_DEFAULT_NAME ?? "Aarohi Sharma",
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID ?? "",
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? "",
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY ?? ""
};

export const isProduction = env.nodeEnv === "production";
export const hasDatabase = Boolean(env.databaseUrl);
export const useMockData = !hasDatabase;


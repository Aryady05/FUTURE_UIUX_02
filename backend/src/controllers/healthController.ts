import { Request, Response } from "express";

import { hasDatabase, useMockData } from "../config/env";

export function getHealth(_req: Request, res: Response) {
  return res.json({
    status: "ok",
    mode: useMockData ? "mock-data" : "postgres",
    databaseConfigured: hasDatabase
  });
}


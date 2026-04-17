import { NextFunction, Request, Response } from "express";

import { adminAuth } from "../config/firebaseAdmin";
import { env, isProduction } from "../config/env";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  const devUserId = req.header("x-dev-user-id");
  const devEmail = req.header("x-dev-user-email");
  const devName = req.header("x-dev-user-name");

  if (!isProduction && env.allowDevAuthBypass && devUserId) {
    req.user = {
      uid: devUserId,
      email: devEmail ?? env.devAuthDefaultEmail,
      name: devName ?? env.devAuthDefaultName
    };
    return next();
  }

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token." });
  }

  if (!adminAuth) {
    return res.status(503).json({
      message: "Firebase Admin is not configured. Use dev auth headers locally or add Firebase server credentials."
    });
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const decodedToken = await adminAuth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email ?? null,
      name: decodedToken.name ?? null
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid Firebase token." });
  }
}


import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getMessaging } from "firebase-admin/messaging";

import { env } from "./env";

const hasFirebaseAdminConfig =
  Boolean(env.firebaseProjectId) &&
  Boolean(env.firebaseClientEmail) &&
  Boolean(env.firebasePrivateKey);

const firebaseAdminApp = hasFirebaseAdminConfig
  ? getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: env.firebaseProjectId,
        clientEmail: env.firebaseClientEmail,
        privateKey: env.firebasePrivateKey.replace(/\\n/g, "\n")
      })
    })
  : null;

export const adminAuth = firebaseAdminApp ? getAuth(firebaseAdminApp) : null;
export const adminMessaging = firebaseAdminApp ? getMessaging(firebaseAdminApp) : null;


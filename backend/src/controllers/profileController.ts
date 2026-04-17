import { Request, Response } from "express";

import { registerDeviceToken } from "../services/notificationService";
import { getOrCreateProfile, updateNotificationPreferences } from "../services/profileService";

export async function getMyProfile(req: Request, res: Response) {
  const profile = await getOrCreateProfile(req.user!);
  return res.json({ data: profile });
}

export async function patchNotificationPreferences(req: Request, res: Response) {
  const profile = await updateNotificationPreferences(req.user!, req.body ?? {});
  return res.json({ data: profile });
}

export async function postDeviceToken(req: Request, res: Response) {
  const profile = await getOrCreateProfile(req.user!);
  const result = await registerDeviceToken(profile.id, req.body.token);
  return res.status(201).json({ data: result });
}


import { Router } from "express";

import {
  getMyProfile,
  patchNotificationPreferences,
  postDeviceToken
} from "../controllers/profileController";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/asyncHandler";

export const profileRoutes = Router();

profileRoutes.use(authenticate);
profileRoutes.get("/me", asyncHandler(getMyProfile));
profileRoutes.patch("/me/notifications", asyncHandler(patchNotificationPreferences));
profileRoutes.post("/me/device-token", asyncHandler(postDeviceToken));


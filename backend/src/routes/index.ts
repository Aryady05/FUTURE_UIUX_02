import { Router } from "express";

import { bookingRoutes } from "./bookingRoutes";
import { classRoutes } from "./classRoutes";
import { healthRoutes } from "./healthRoutes";
import { profileRoutes } from "./profileRoutes";

export const router = Router();

router.use("/health", healthRoutes);
router.use("/classes", classRoutes);
router.use("/bookings", bookingRoutes);
router.use("/profile", profileRoutes);

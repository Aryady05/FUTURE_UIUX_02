import { Router } from "express";

import { getClassDetails, getClasses } from "../controllers/classController";
import { asyncHandler } from "../utils/asyncHandler";

export const classRoutes = Router();

classRoutes.get("/", asyncHandler(getClasses));
classRoutes.get("/:classId", asyncHandler(getClassDetails));


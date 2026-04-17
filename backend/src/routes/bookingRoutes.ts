import { Router } from "express";

import { deleteBooking, getMyBookings, postBooking } from "../controllers/bookingController";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/asyncHandler";

export const bookingRoutes = Router();

bookingRoutes.use(authenticate);
bookingRoutes.get("/me", asyncHandler(getMyBookings));
bookingRoutes.post("/", asyncHandler(postBooking));
bookingRoutes.delete("/:bookingId", asyncHandler(deleteBooking));


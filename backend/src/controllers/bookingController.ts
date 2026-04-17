import { Request, Response } from "express";

import { cancelBooking, createBooking, listUserBookings } from "../services/bookingService";

export async function getMyBookings(req: Request, res: Response) {
  const bookings = await listUserBookings(req.user!);
  return res.json({ data: bookings });
}

export async function postBooking(req: Request, res: Response) {
  const booking = await createBooking(req.user!, req.body.classId);
  return res.status(201).json({ data: booking });
}

export async function deleteBooking(req: Request, res: Response) {
  const bookingId = String(req.params.bookingId);
  const booking = await cancelBooking(req.user!, bookingId);
  return res.json({ data: booking });
}

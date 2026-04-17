import { query } from "../config/db";
import { mockBookings } from "../data/mockData";
import { useMockData } from "../config/env";
import { AuthUser, Booking } from "../types/models";
import { HttpError } from "../utils/HttpError";
import { getClassById } from "./classService";
import { sendBookingConfirmationNotification } from "./notificationService";
import { getOrCreateProfile } from "./profileService";

export async function listUserBookings(authUser: AuthUser) {
  const profile = await getOrCreateProfile(authUser);

  if (useMockData) {
    return mockBookings.filter((booking) => booking.userId === profile.id);
  }

  const result = await query<Booking>(
    `
      SELECT
        id,
        user_id AS "userId",
        class_id AS "classId",
        status,
        attendees,
        booked_at AS "bookedAt"
      FROM bookings
      WHERE user_id = $1
      ORDER BY booked_at DESC
    `,
    [profile.id]
  );

  return result.rows;
}

export async function createBooking(authUser: AuthUser, classId: string) {
  if (!classId) {
    throw new HttpError(400, "classId is required.");
  }

  const profile = await getOrCreateProfile(authUser);
  const yogaClass = await getClassById(classId);

  if (useMockData) {
    const existing = mockBookings.find((booking) => booking.userId === profile.id && booking.classId === classId);
    if (existing) {
      throw new HttpError(409, "This class is already booked.");
    }

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      userId: profile.id,
      classId,
      status: "confirmed",
      attendees: 1,
      bookedAt: new Date().toISOString()
    };

    mockBookings.unshift(booking);

    await sendBookingConfirmationNotification(profile.id, {
      title: "Appointment Confirmed",
      body: `${yogaClass.title} has been added to your Shree Yoga+ schedule.`
    });

    return booking;
  }

  const existing = await query<Booking>(
    `
      SELECT id
      FROM bookings
      WHERE user_id = $1 AND class_id = $2
      LIMIT 1
    `,
    [profile.id, classId]
  );

  if (existing.rows[0]) {
    throw new HttpError(409, "This class is already booked.");
  }

  const inserted = await query<Booking>(
    `
      INSERT INTO bookings (user_id, class_id, status, attendees)
      VALUES ($1, $2, 'confirmed', 1)
      RETURNING
        id,
        user_id AS "userId",
        class_id AS "classId",
        status,
        attendees,
        booked_at AS "bookedAt"
    `,
    [profile.id, classId]
  );

  await sendBookingConfirmationNotification(profile.id, {
    title: "Appointment Confirmed",
    body: `${yogaClass.title} has been added to your Shree Yoga+ schedule.`
  });

  return inserted.rows[0];
}

export async function cancelBooking(authUser: AuthUser, bookingId: string) {
  const profile = await getOrCreateProfile(authUser);

  if (useMockData) {
    const index = mockBookings.findIndex((booking) => booking.id === bookingId && booking.userId === profile.id);

    if (index === -1) {
      throw new HttpError(404, "Booking not found.");
    }

    const [removed] = mockBookings.splice(index, 1);
    return removed;
  }

  const deleted = await query<Booking>(
    `
      DELETE FROM bookings
      WHERE id = $1 AND user_id = $2
      RETURNING
        id,
        user_id AS "userId",
        class_id AS "classId",
        status,
        attendees,
        booked_at AS "bookedAt"
    `,
    [bookingId, profile.id]
  );

  if (!deleted.rows[0]) {
    throw new HttpError(404, "Booking not found.");
  }

  return deleted.rows[0];
}


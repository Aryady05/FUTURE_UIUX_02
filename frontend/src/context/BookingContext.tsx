import React, { createContext, useContext, useMemo, useState } from "react";

import { initialBookings, sessions } from "../data/studio";
import { Booking, Session } from "../types";
import { getSessionById, mapBookingsToSessions } from "../utils/date";

type BookingContextValue = {
  sessions: Session[];
  bookings: Booking[];
  bookedSessions: Array<{ booking: Booking; session: Session }>;
  featuredSessions: Session[];
  bookSession: (sessionId: string) => boolean;
  cancelBooking: (bookingId: string) => void;
  isBooked: (sessionId: string) => boolean;
  getSession: (sessionId: string) => Session | undefined;
};

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const bookSession = (sessionId: string) => {
    const alreadyBooked = bookings.some((booking) => booking.sessionId === sessionId);

    if (alreadyBooked) {
      return false;
    }

    setBookings((current) => [
      {
        id: `booking-${Date.now()}`,
        attendees: 1,
        bookedAt: new Date().toISOString(),
        sessionId,
        status: "confirmed"
      },
      ...current
    ]);

    return true;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
  };

  const isBooked = (sessionId: string) => bookings.some((booking) => booking.sessionId === sessionId);
  const getSession = (sessionId: string) => getSessionById(sessions, sessionId);

  const value = useMemo(
    () => ({
      sessions,
      bookings,
      bookedSessions: mapBookingsToSessions(bookings, sessions),
      featuredSessions: sessions.filter((session) => session.featured),
      bookSession,
      cancelBooking,
      isBooked,
      getSession
    }),
    [bookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookings must be used within BookingProvider");
  }

  return context;
}

import { Booking, Session } from "../types";

export function getSessionById(sessions: Session[], sessionId: string) {
  return sessions.find((session) => session.id === sessionId);
}

export function mapBookingsToSessions(bookings: Booking[], sessions: Session[]) {
  return bookings
    .map((booking) => {
      const session = getSessionById(sessions, booking.sessionId);
      if (!session) {
        return null;
      }

      return { booking, session };
    })
    .filter(Boolean) as Array<{ booking: Booking; session: Session }>;
}


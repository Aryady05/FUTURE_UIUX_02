export type NotificationPreferences = {
  bookingReminders: boolean;
  scheduleChanges: boolean;
  wellnessTips: boolean;
};

export type AuthUser = {
  uid: string;
  email: string | null;
  name: string | null;
};

export type YogaClass = {
  id: string;
  title: string;
  style: string;
  instructor: string;
  dateLabel: string;
  startTime: string;
  endTime: string;
  duration: string;
  level: string;
  energy: string;
  spotsLeft: number;
  priceLabel: string;
  description: string;
  studioRoom: string;
  focusTags: string[];
  featured?: boolean;
};

export type AppUser = {
  id: string;
  firebaseUid: string;
  email: string | null;
  name: string;
  membership: string;
  city: string;
  streak: number;
  nextGoal: string;
  notificationPreferences: NotificationPreferences;
};

export type Booking = {
  id: string;
  userId: string;
  classId: string;
  status: "confirmed" | "waitlist";
  attendees: number;
  bookedAt: string;
};


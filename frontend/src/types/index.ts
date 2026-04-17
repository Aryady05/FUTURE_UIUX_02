export type NotificationSettings = {
  bookingReminders: boolean;
  scheduleChanges: boolean;
  wellnessTips: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  membership: string;
  city: string;
  streak: number;
  nextGoal: string;
  notificationSettings: NotificationSettings;
};

export type Session = {
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
  gradient: [string, string];
};

export type BookingStatus = "confirmed" | "waitlist";

export type Booking = {
  id: string;
  sessionId: string;
  bookedAt: string;
  attendees: number;
  status: BookingStatus;
};

export type RootStackParamList = {
  Welcome: undefined;
  AppTabs: undefined;
  SessionDetails: { sessionId: string };
};

export type AppTabParamList = {
  Home: undefined;
  Explore: undefined;
  Bookings: undefined;
  Profile: undefined;
};


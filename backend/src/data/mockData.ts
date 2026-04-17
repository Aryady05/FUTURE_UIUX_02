import { AppUser, Booking, YogaClass } from "../types/models";

export const mockClasses: YogaClass[] = [
  {
    id: "sunrise-vinyasa",
    title: "Sunrise Vinyasa Flow",
    style: "Vinyasa",
    instructor: "Mira Joshi",
    dateLabel: "Today",
    startTime: "6:15 AM",
    endTime: "7:15 AM",
    duration: "60 min",
    level: "All Levels",
    energy: "Awakening",
    spotsLeft: 4,
    priceLabel: "Included in membership",
    description:
      "A steady morning sequence designed to open the hips, wake up the spine, and set an intentional rhythm for the day.",
    studioRoom: "Lotus Hall",
    focusTags: ["Breathwork", "Mobility", "Focus"],
    featured: true
  },
  {
    id: "midday-reset",
    title: "Midday Reset",
    style: "Restorative",
    instructor: "Rhea Menon",
    dateLabel: "Today",
    startTime: "1:00 PM",
    endTime: "1:45 PM",
    duration: "45 min",
    level: "Beginner Friendly",
    energy: "Calming",
    spotsLeft: 9,
    priceLabel: "Rs. 699 drop-in",
    description:
      "A low-impact reset featuring supported postures, deep breathing, and gentle release work to soften tension.",
    studioRoom: "Tulsi Studio",
    focusTags: ["Recovery", "Nervous System", "Stillness"]
  },
  {
    id: "power-core",
    title: "Power Core Strength",
    style: "Power Yoga",
    instructor: "Kabir Patel",
    dateLabel: "Tomorrow",
    startTime: "7:30 AM",
    endTime: "8:30 AM",
    duration: "60 min",
    level: "Intermediate",
    energy: "Strong",
    spotsLeft: 2,
    priceLabel: "Included in membership",
    description:
      "Dynamic standing sequences and targeted core work for practitioners who want heat, balance, and stamina.",
    studioRoom: "Shanti Deck",
    focusTags: ["Strength", "Balance", "Heat"],
    featured: true
  }
];

export const mockUsers: AppUser[] = [
  {
    id: "user-demo",
    firebaseUid: "demo-user",
    email: "demo@shreeyoga.app",
    name: "Aarohi Sharma",
    membership: "Harmony Unlimited",
    city: "Pune",
    streak: 12,
    nextGoal: "Build a consistent sunrise flow habit",
    notificationPreferences: {
      bookingReminders: true,
      scheduleChanges: true,
      wellnessTips: false
    }
  }
];

export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    userId: "user-demo",
    classId: "sunrise-vinyasa",
    status: "confirmed",
    attendees: 1,
    bookedAt: "2026-04-15T06:00:00.000Z"
  }
];


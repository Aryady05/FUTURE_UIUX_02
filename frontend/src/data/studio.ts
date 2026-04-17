import { Booking, Session, UserProfile } from "../types";

export const demoUser: UserProfile = {
  id: "guest-1",
  name: "Aarohi Sharma",
  email: "aarohi@shreeyoga.app",
  membership: "Harmony Unlimited",
  city: "Pune",
  streak: 12,
  nextGoal: "Build a consistent sunrise flow habit",
  notificationSettings: {
    bookingReminders: true,
    scheduleChanges: true,
    wellnessTips: false
  }
};

export const sessions: Session[] = [
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
    featured: true,
    gradient: ["#F7DBC4", "#EBA271"]
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
    focusTags: ["Recovery", "Nervous System", "Stillness"],
    gradient: ["#D9E8D7", "#9CB6A8"]
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
    featured: true,
    gradient: ["#B9C98A", "#688053"]
  },
  {
    id: "yin-candlelight",
    title: "Candlelight Yin",
    style: "Yin",
    instructor: "Devika Rao",
    dateLabel: "Tomorrow",
    startTime: "7:00 PM",
    endTime: "8:15 PM",
    duration: "75 min",
    level: "All Levels",
    energy: "Grounding",
    spotsLeft: 6,
    priceLabel: "Rs. 899 drop-in",
    description:
      "Long-held floor poses and ambient lighting for a spacious, meditative end-of-day practice.",
    studioRoom: "Moon Room",
    focusTags: ["Deep Stretch", "Release", "Mindfulness"],
    gradient: ["#D2C7E7", "#8B77B1"]
  },
  {
    id: "prenatal-gentle",
    title: "Gentle Prenatal Yoga",
    style: "Prenatal",
    instructor: "Ananya Bedi",
    dateLabel: "Friday",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    duration: "60 min",
    level: "Prenatal",
    energy: "Nurturing",
    spotsLeft: 5,
    priceLabel: "Rs. 799 drop-in",
    description:
      "A supportive class focused on breath, posture, and safe movement for expecting mothers.",
    studioRoom: "Tulsi Studio",
    focusTags: ["Prenatal", "Breathing", "Support"],
    gradient: ["#F3D5CC", "#D89E8F"]
  },
  {
    id: "weekend-family",
    title: "Weekend Family Yoga",
    style: "Community",
    instructor: "Neel Kapoor",
    dateLabel: "Saturday",
    startTime: "9:30 AM",
    endTime: "10:30 AM",
    duration: "60 min",
    level: "All Ages",
    energy: "Playful",
    spotsLeft: 12,
    priceLabel: "Rs. 1,199 family pass",
    description:
      "An inclusive session with partner poses, movement games, and grounding breath for families.",
    studioRoom: "Garden Terrace",
    focusTags: ["Family", "Community", "Joy"],
    gradient: ["#F5E08B", "#D3A22A"]
  }
];

export const initialBookings: Booking[] = [
  {
    id: "booking-1",
    sessionId: "sunrise-vinyasa",
    bookedAt: "2026-04-15T06:00:00.000Z",
    attendees: 1,
    status: "confirmed"
  }
];


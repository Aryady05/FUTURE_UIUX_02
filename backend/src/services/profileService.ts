import { query } from "../config/db";
import { mockUsers } from "../data/mockData";
import { useMockData } from "../config/env";
import { AppUser, AuthUser, NotificationPreferences } from "../types/models";

export async function getOrCreateProfile(authUser: AuthUser) {
  if (useMockData) {
    let user = mockUsers.find((item) => item.firebaseUid === authUser.uid);

    if (!user) {
      user = {
        id: `user-${authUser.uid}`,
        firebaseUid: authUser.uid,
        email: authUser.email,
        name: authUser.name ?? "Shree Yoga+ Member",
        membership: "Guest Pass",
        city: "Pune",
        streak: 0,
        nextGoal: "Book your first class",
        notificationPreferences: {
          bookingReminders: true,
          scheduleChanges: true,
          wellnessTips: false
        }
      };
      mockUsers.push(user);
    }

    return user;
  }

  const existing = await query<AppUser & { firebase_uid: string; notification_preferences: NotificationPreferences }>(
    `
      SELECT
        id,
        firebase_uid AS "firebaseUid",
        email,
        name,
        membership,
        city,
        streak,
        next_goal AS "nextGoal",
        notification_preferences AS "notificationPreferences"
      FROM app_users
      WHERE firebase_uid = $1
      LIMIT 1
    `,
    [authUser.uid]
  );

  if (existing.rows[0]) {
    return existing.rows[0];
  }

  const inserted = await query<AppUser & { firebase_uid: string; notification_preferences: NotificationPreferences }>(
    `
      INSERT INTO app_users (
        firebase_uid,
        email,
        name,
        membership,
        city,
        streak,
        next_goal,
        notification_preferences
      )
      VALUES ($1, $2, $3, 'Guest Pass', 'Pune', 0, 'Book your first class', $4)
      RETURNING
        id,
        firebase_uid AS "firebaseUid",
        email,
        name,
        membership,
        city,
        streak,
        next_goal AS "nextGoal",
        notification_preferences AS "notificationPreferences"
    `,
    [
      authUser.uid,
      authUser.email,
      authUser.name ?? "Shree Yoga+ Member",
      JSON.stringify({
        bookingReminders: true,
        scheduleChanges: true,
        wellnessTips: false
      })
    ]
  );

  return inserted.rows[0];
}

export async function updateNotificationPreferences(
  authUser: AuthUser,
  preferences: Partial<NotificationPreferences>
) {
  const profile = await getOrCreateProfile(authUser);
  const nextPreferences = {
    ...profile.notificationPreferences,
    ...preferences
  };

  if (useMockData) {
    const target = mockUsers.find((item) => item.firebaseUid === authUser.uid);
    if (target) {
      target.notificationPreferences = nextPreferences;
    }
    return { ...profile, notificationPreferences: nextPreferences };
  }

  const updated = await query<AppUser & { firebase_uid: string; notification_preferences: NotificationPreferences }>(
    `
      UPDATE app_users
      SET notification_preferences = $2
      WHERE firebase_uid = $1
      RETURNING
        id,
        firebase_uid AS "firebaseUid",
        email,
        name,
        membership,
        city,
        streak,
        next_goal AS "nextGoal",
        notification_preferences AS "notificationPreferences"
    `,
    [authUser.uid, JSON.stringify(nextPreferences)]
  );

  return updated.rows[0];
}


import { query } from "../config/db";
import { adminMessaging } from "../config/firebaseAdmin";
import { useMockData } from "../config/env";

type NotificationPayload = {
  title: string;
  body: string;
};

export async function sendBookingConfirmationNotification(userId: string, payload: NotificationPayload) {
  if (useMockData || !adminMessaging) {
    return { delivered: false, reason: "FCM not configured in current environment." };
  }

  const tokenResult = await query<{ token: string }>(
    `
      SELECT token
      FROM device_tokens
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    [userId]
  );

  if (!tokenResult.rows.length) {
    return { delivered: false, reason: "No device token registered." };
  }

  const tokens = tokenResult.rows.map((row) => row.token);

  await adminMessaging.sendEachForMulticast({
    tokens,
    notification: {
      title: payload.title,
      body: payload.body
    }
  });

  return { delivered: true };
}

export async function registerDeviceToken(userId: string, token: string) {
  if (useMockData) {
    return { registered: true };
  }

  await query(
    `
      INSERT INTO device_tokens (user_id, token)
      VALUES ($1, $2)
      ON CONFLICT (token) DO UPDATE SET user_id = EXCLUDED.user_id
    `,
    [userId, token]
  );

  return { registered: true };
}


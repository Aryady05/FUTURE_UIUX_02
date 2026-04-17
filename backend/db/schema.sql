CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT,
  name TEXT NOT NULL,
  membership TEXT NOT NULL DEFAULT 'Guest Pass',
  city TEXT NOT NULL DEFAULT 'Pune',
  streak INTEGER NOT NULL DEFAULT 0,
  next_goal TEXT NOT NULL DEFAULT 'Book your first class',
  notification_preferences JSONB NOT NULL DEFAULT '{"bookingReminders": true, "scheduleChanges": true, "wellnessTips": false}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS yoga_classes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  style TEXT NOT NULL,
  instructor TEXT NOT NULL,
  date_label TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  energy TEXT NOT NULL,
  spots_left INTEGER NOT NULL DEFAULT 0,
  price_label TEXT NOT NULL,
  description TEXT NOT NULL,
  studio_room TEXT NOT NULL,
  focus_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  class_id TEXT NOT NULL REFERENCES yoga_classes(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('confirmed', 'waitlist')),
  attendees INTEGER NOT NULL DEFAULT 1,
  booked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, class_id)
);

CREATE TABLE IF NOT EXISTS device_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_device_tokens_user_id ON device_tokens(user_id);


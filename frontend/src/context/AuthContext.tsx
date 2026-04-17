import React, { createContext, useContext, useMemo, useState } from "react";

import { demoUser } from "../data/studio";
import { NotificationSettings, UserProfile } from "../types";

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  continueAsGuest: () => void;
  enterDemoStudio: () => void;
  signOut: () => void;
  updateNotificationSetting: (key: keyof NotificationSettings, value: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const continueAsGuest = () => {
    setUser({
      ...demoUser,
      id: "guest-mode",
      membership: "Guest Pass",
      email: "guest@shreeyoga.app"
    });
  };

  const enterDemoStudio = () => {
    setUser(demoUser);
  };

  const signOut = () => {
    setUser(null);
  };

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setUser((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        notificationSettings: {
          ...current.notificationSettings,
          [key]: value
        }
      };
    });
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      continueAsGuest,
      enterDemoStudio,
      signOut,
      updateNotificationSetting
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}


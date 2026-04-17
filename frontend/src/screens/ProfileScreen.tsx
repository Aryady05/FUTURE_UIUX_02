import React from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { SectionHeader } from "../components/SectionHeader";
import { useAuth } from "../context/AuthContext";
import { requestNotificationPermissions } from "../services/notifications";
import { AppTabParamList } from "../types";
import { colors, radii, spacing, typography } from "../theme";

type Props = BottomTabScreenProps<AppTabParamList, "Profile">;

export function ProfileScreen(_: Props) {
  const { user, signOut, updateNotificationSetting } = useAuth();

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermissions();

    Alert.alert(
      granted ? "Notifications enabled" : "Permission not granted",
      granted
        ? "Booking reminders and schedule updates can now be delivered on device."
        : "You can enable notifications later from device settings."
    );
  };

  if (!user) {
    return (
      <ScreenShell>
        <Text style={{ color: colors.text }}>Profile unavailable.</Text>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell gradient={["#F8F1E7", "#F0F5ED"]}>
      <SectionHeader eyebrow="Profile" title={user.name} subtitle={`${user.membership} - ${user.city}`} />

      <View style={styles.heroCard}>
        <Text style={styles.heroValue}>{user.streak} day streak</Text>
        <Text style={styles.heroText}>{user.nextGoal}</Text>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Notifications</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Booking reminders</Text>
          <Switch
            value={user.notificationSettings.bookingReminders}
            onValueChange={(value) => updateNotificationSetting("bookingReminders", value)}
            trackColor={{ false: colors.surfaceMuted, true: colors.sage }}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Schedule changes</Text>
          <Switch
            value={user.notificationSettings.scheduleChanges}
            onValueChange={(value) => updateNotificationSetting("scheduleChanges", value)}
            trackColor={{ false: colors.surfaceMuted, true: colors.sage }}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Wellness tips</Text>
          <Switch
            value={user.notificationSettings.wellnessTips}
            onValueChange={(value) => updateNotificationSetting("wellnessTips", value)}
            trackColor={{ false: colors.surfaceMuted, true: colors.sage }}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Enable device notifications" onPress={handleEnableNotifications} />
        <PrimaryButton label="Sign out" onPress={signOut} variant="secondary" />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm
  },
  heroValue: {
    ...typography.title,
    color: colors.text
  },
  heroText: {
    ...typography.body,
    color: colors.textMuted
  },
  settingsCard: {
    marginTop: spacing.xl,
    backgroundColor: "rgba(255,255,255,0.74)",
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border
  },
  settingsTitle: {
    ...typography.subtitle,
    color: colors.text
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  settingLabel: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md
  }
});

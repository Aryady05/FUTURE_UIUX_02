import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { useBookings } from "../context/BookingContext";
import { RootStackParamList } from "../types";
import { colors, radii, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "SessionDetails">;

export function SessionDetailsScreen({ navigation, route }: Props) {
  const { getSession, bookSession, isBooked } = useBookings();
  const session = getSession(route.params.sessionId);

  if (!session) {
    return (
      <ScreenShell>
        <Text style={{ color: colors.text }}>Session not found.</Text>
      </ScreenShell>
    );
  }

  const booked = isBooked(session.id);

  const handleReserve = () => {
    const success = bookSession(session.id);

    Alert.alert(
      success ? "Appointment reserved" : "Already booked",
      success
        ? `${session.title} has been added to your bookings.`
        : "This class is already in your schedule."
    );
  };

  return (
    <ScreenShell gradient={session.gradient}>
      <View style={styles.topRow}>
        <Text style={styles.kicker}>{session.style}</Text>
        <Text style={styles.spots}>{session.spotsLeft} spots left</Text>
      </View>

      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.subtitle}>
        {session.instructor} - {session.level} - {session.energy}
      </Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Ionicons name="calendar-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{session.dateLabel}</Text>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>
            {session.startTime} - {session.endTime}
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{session.studioRoom}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About this session</Text>
        <Text style={styles.body}>{session.description}</Text>

        <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Focus areas</Text>
        <View style={styles.tagWrap}>
          {session.focusTags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Pricing</Text>
        <Text style={styles.body}>{session.priceLabel}</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label={booked ? "Booked already" : "Reserve appointment"} onPress={handleReserve} />
        <PrimaryButton label="Back to classes" onPress={() => navigation.goBack()} variant="secondary" />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  topRow: {
    marginTop: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  kicker: {
    ...typography.caption,
    color: colors.primaryDark,
    textTransform: "uppercase",
    letterSpacing: 1.2
  },
  spots: {
    ...typography.caption,
    color: colors.primaryDark
  },
  title: {
    ...typography.display,
    color: colors.primaryDark,
    marginTop: spacing.md
  },
  subtitle: {
    ...typography.body,
    color: colors.primaryDark,
    marginTop: spacing.sm
  },
  infoGrid: {
    marginTop: spacing.xl,
    gap: spacing.md
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: radii.lg,
    padding: spacing.md
  },
  infoText: {
    ...typography.body,
    color: colors.primaryDark
  },
  card: {
    marginTop: spacing.xl,
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: radii.xl,
    padding: spacing.lg
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text
  },
  sectionSpacing: {
    marginTop: spacing.lg
  },
  body: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  tag: {
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radii.pill
  },
  tagText: {
    ...typography.caption,
    color: colors.primaryDark
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md
  }
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BookingCard } from "../components/BookingCard";
import { ScreenShell } from "../components/ScreenShell";
import { SectionHeader } from "../components/SectionHeader";
import { useBookings } from "../context/BookingContext";
import { AppTabParamList, RootStackParamList } from "../types";
import { colors, radii, spacing, typography } from "../theme";

type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, "Bookings">,
  NativeStackScreenProps<RootStackParamList>
>;

export function BookingsScreen({ navigation }: Props) {
  const { bookedSessions, cancelBooking } = useBookings();

  return (
    <ScreenShell gradient={["#F4EEE3", "#EEF6F0"]}>
      <SectionHeader
        eyebrow="My bookings"
        title="Appointments and upcoming visits"
        subtitle="Manage your current reservations and keep your schedule flexible."
      />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryValue}>{bookedSessions.length}</Text>
        <Text style={styles.summaryLabel}>active reservations</Text>
      </View>

      <View style={styles.list}>
        {bookedSessions.length ? (
          bookedSessions.map(({ booking, session }) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              session={session}
              onCancel={() => cancelBooking(booking.id)}
              onOpen={() => navigation.navigate("SessionDetails", { sessionId: session.id })}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No appointments booked yet</Text>
            <Text style={styles.emptyText}>
              Head to Explore to reserve your first class and build your weekly rhythm.
            </Text>
          </View>
        )}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    marginTop: spacing.xl,
    padding: spacing.xl,
    borderRadius: radii.xl,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    gap: spacing.xs
  },
  summaryValue: {
    ...typography.display,
    color: colors.white
  },
  summaryLabel: {
    ...typography.caption,
    color: "#DDE7E1",
    textTransform: "uppercase",
    letterSpacing: 1.4
  },
  list: {
    marginTop: spacing.xl,
    gap: spacing.md
  },
  emptyState: {
    backgroundColor: "rgba(255,255,255,0.78)",
    padding: spacing.xl,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm
  },
  emptyTitle: {
    ...typography.title,
    color: colors.text
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted
  }
});


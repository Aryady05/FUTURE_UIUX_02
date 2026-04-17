import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ClassCard } from "../components/ClassCard";
import { ScreenShell } from "../components/ScreenShell";
import { SectionHeader } from "../components/SectionHeader";
import { StudioMetricCard } from "../components/StudioMetricCard";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingContext";
import { AppTabParamList, RootStackParamList } from "../types";
import { colors, radii, spacing, typography } from "../theme";

type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { featuredSessions, bookedSessions } = useBookings();

  return (
    <ScreenShell gradient={["#F7EFE2", "#F5F8F2"]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Namaste, {user?.name.split(" ")[0] ?? "Guest"}</Text>
        <Text style={styles.tagline}>Your studio rhythm looks beautifully steady this week.</Text>
      </View>

      <View style={styles.moodCard}>
        <SectionHeader
          eyebrow="Today at a glance"
          title="One class booked, one featured recommendation."
          subtitle="Keep the momentum light, calm, and consistent."
        />
        <View style={styles.metricsRow}>
          <StudioMetricCard label="Current streak" value={`${user?.streak ?? 0} days`} />
          <StudioMetricCard label="Membership" value={user?.membership ?? "Guest Pass"} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          eyebrow="Featured sessions"
          title="Recommended classes"
          subtitle="Curated around balance, breath, and recovery."
        />
        <View style={styles.list}>
          {featuredSessions.map((session) => (
            <ClassCard
              key={session.id}
              session={session}
              onPress={() => navigation.navigate("SessionDetails", { sessionId: session.id })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          eyebrow="Upcoming"
          title="Your next appointment"
          subtitle="You are all set for your next visit."
        />
        <View style={styles.bookingPreview}>
          {bookedSessions.length ? (
            <>
              <Text style={styles.bookingTitle}>{bookedSessions[0].session.title}</Text>
              <Text style={styles.bookingMeta}>
                {bookedSessions[0].session.dateLabel} - {bookedSessions[0].session.startTime} -{" "}
                {bookedSessions[0].session.studioRoom}
              </Text>
            </>
          ) : (
            <Text style={styles.bookingMeta}>No appointments yet. Book one from Explore.</Text>
          )}
        </View>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.sm,
    gap: spacing.xs
  },
  greeting: {
    ...typography.display,
    color: colors.text
  },
  tagline: {
    ...typography.body,
    color: colors.textMuted
  },
  moodCard: {
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.lg
  },
  metricsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  section: {
    marginTop: spacing.xl,
    gap: spacing.md
  },
  list: {
    marginTop: spacing.md
  },
  bookingPreview: {
    marginTop: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.primaryDark,
    borderRadius: radii.xl,
    gap: spacing.sm
  },
  bookingTitle: {
    ...typography.title,
    color: colors.white
  },
  bookingMeta: {
    ...typography.body,
    color: "#DDE7E1"
  }
});

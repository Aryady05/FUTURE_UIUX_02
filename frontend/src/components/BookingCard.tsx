import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Booking, Session } from "../types";
import { colors, radii, spacing, typography, shadows } from "../theme";

type BookingCardProps = {
  booking: Booking;
  session: Session;
  onCancel: () => void;
  onOpen: () => void;
};

export function BookingCard({ booking, session, onCancel, onOpen }: BookingCardProps) {
  return (
    <Pressable onPress={onOpen} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.row}>
        <Text style={styles.title}>{session.title}</Text>
        <View style={styles.status}>
          <Text style={styles.statusLabel}>{booking.status}</Text>
        </View>
      </View>

      <View style={styles.metaWrap}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{session.dateLabel}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{session.studioRoom}</Text>
        </View>
      </View>

      <Text style={styles.timeText}>
        {session.startTime} - {session.endTime}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerNote}>{session.instructor}</Text>
        <Pressable onPress={onCancel} hitSlop={10}>
          <Text style={styles.cancelLabel}>Cancel</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.soft
  },
  pressed: {
    opacity: 0.96
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    flex: 1
  },
  status: {
    backgroundColor: "rgba(61, 139, 99, 0.12)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill
  },
  statusLabel: {
    ...typography.caption,
    color: colors.success,
    textTransform: "capitalize"
  },
  metaWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  metaText: {
    ...typography.body,
    color: colors.textMuted
  },
  timeText: {
    ...typography.body,
    color: colors.text
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footerNote: {
    ...typography.caption,
    color: colors.textMuted
  },
  cancelLabel: {
    ...typography.caption,
    color: colors.danger
  }
});


import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { Session } from "../types";
import { colors, radii, spacing, typography, shadows } from "../theme";

type ClassCardProps = {
  session: Session;
  compact?: boolean;
  onPress?: () => void;
};

export function ClassCard({ session, compact = false, onPress }: ClassCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <LinearGradient colors={session.gradient} style={[styles.card, compact && styles.compactCard]}>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{session.style}</Text>
          </View>
          <View style={styles.timePill}>
            <Ionicons name="time-outline" size={14} color={colors.primaryDark} />
            <Text style={styles.timePillLabel}>{session.startTime}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{session.title}</Text>
          <Text style={styles.meta}>
            {session.instructor} - {session.duration} - {session.level}
          </Text>
          {!compact ? <Text style={styles.description}>{session.description}</Text> : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLabel}>
            {session.dateLabel} - {session.studioRoom}
          </Text>
          <Text style={styles.footerLabel}>{session.spotsLeft} spots left</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md
  },
  pressed: {
    opacity: 0.96
  },
  card: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    minHeight: 190,
    ...shadows.soft
  },
  compactCard: {
    minHeight: 156
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  body: {
    flex: 1,
    justifyContent: "center",
    marginTop: spacing.md,
    gap: spacing.sm
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.68)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill
  },
  badgeLabel: {
    ...typography.caption,
    color: colors.primaryDark
  },
  timePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.58)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill
  },
  timePillLabel: {
    ...typography.caption,
    color: colors.primaryDark
  },
  title: {
    ...typography.title,
    color: colors.primaryDark
  },
  meta: {
    ...typography.body,
    color: colors.primaryDark
  },
  description: {
    ...typography.body,
    color: "rgba(36, 64, 52, 0.86)"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  footerLabel: {
    ...typography.caption,
    color: colors.primaryDark
  }
});

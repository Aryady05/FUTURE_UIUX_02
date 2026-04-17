import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, typography } from "../theme";

type StudioMetricCardProps = {
  label: string;
  value: string;
};

export function StudioMetricCard({ label, value }: StudioMetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs
  },
  value: {
    ...typography.title,
    color: colors.primaryDark
  },
  label: {
    ...typography.caption,
    color: colors.textMuted
  }
});

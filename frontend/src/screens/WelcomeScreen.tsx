import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { useAuth } from "../context/AuthContext";
import { colors, radii, spacing, typography } from "../theme";

const highlights = [
  {
    icon: "sunny-outline" as const,
    title: "Morning flows",
    text: "Reserve sunrise and evening classes in under a minute."
  },
  {
    icon: "notifications-outline" as const,
    title: "Smart reminders",
    text: "Stay on schedule with push-ready reminders and updates."
  },
  {
    icon: "leaf-outline" as const,
    title: "Mindful design",
    text: "A calm, premium experience shaped for mobile-first booking."
  }
];

export function WelcomeScreen() {
  const { continueAsGuest, enterDemoStudio } = useAuth();

  return (
    <ScreenShell gradient={["#F7F1E5", "#FDE7D6"]}>
      <LinearGradient colors={["#315444", "#6B8B76"]} style={styles.hero}>
        <Text style={styles.kicker}>Shree Yoga+</Text>
        <Text style={styles.heroTitle}>Book your next class with calm confidence.</Text>
        <Text style={styles.heroText}>
          A premium yoga studio booking experience for rituals, routines, and restorative care.
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        {highlights.map((item) => (
          <View key={item.title} style={styles.highlightCard}>
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={18} color={colors.primaryDark} />
            </View>
            <View style={styles.highlightBody}>
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Enter Demo Studio" onPress={enterDemoStudio} />
        <PrimaryButton label="Continue as Guest" onPress={continueAsGuest} variant="secondary" />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginTop: spacing.md,
    gap: spacing.md
  },
  kicker: {
    ...typography.caption,
    color: "#D8E8DE",
    textTransform: "uppercase",
    letterSpacing: 1.8
  },
  heroTitle: {
    ...typography.display,
    color: colors.white
  },
  heroText: {
    ...typography.body,
    color: "#EAF1EC"
  },
  section: {
    marginTop: spacing.xl,
    gap: spacing.md
  },
  highlightCard: {
    flexDirection: "row",
    gap: spacing.md,
    backgroundColor: "rgba(255,255,255,0.72)",
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted
  },
  highlightBody: {
    flex: 1,
    gap: spacing.xs
  },
  highlightTitle: {
    ...typography.subtitle,
    color: colors.text
  },
  highlightText: {
    ...typography.body,
    color: colors.textMuted
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md
  }
});


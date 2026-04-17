import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ClassCard } from "../components/ClassCard";
import { ScreenShell } from "../components/ScreenShell";
import { SectionHeader } from "../components/SectionHeader";
import { useBookings } from "../context/BookingContext";
import { AppTabParamList, RootStackParamList } from "../types";
import { colors, radii, spacing, typography } from "../theme";

type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, "Explore">,
  NativeStackScreenProps<RootStackParamList>
>;

const filters = ["All", "Vinyasa", "Restorative", "Power Yoga", "Yin", "Prenatal", "Community"];

export function ExploreScreen({ navigation }: Props) {
  const { sessions } = useBookings();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSessions = useMemo(() => {
    if (activeFilter === "All") {
      return sessions;
    }

    return sessions.filter((session) => session.style === activeFilter);
  }, [activeFilter, sessions]);

  return (
    <ScreenShell gradient={["#F8F3EA", "#ECF4EE"]}>
      <SectionHeader
        eyebrow="Explore classes"
        title="Find the right session for your day"
        subtitle="Browse by energy, studio room, and teaching style."
      />

      <View style={styles.filterWrap}>
        {filters.map((filter) => {
          const active = filter === activeFilter;

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterPill, active && styles.filterPillActive]}
            >
              <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {filteredSessions.map((session) => (
          <ClassCard
            key={session.id}
            session={session}
            compact
            onPress={() => navigation.navigate("SessionDetails", { sessionId: session.id })}
          />
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  filterWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderWidth: 1,
    borderColor: colors.border
  },
  filterPillActive: {
    backgroundColor: colors.primary
  },
  filterLabel: {
    ...typography.caption,
    color: colors.text
  },
  filterLabelActive: {
    color: colors.white
  },
  list: {
    marginTop: spacing.lg
  }
});


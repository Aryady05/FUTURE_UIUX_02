import React from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { spacing } from "../theme";

type ScreenShellProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  gradient?: [string, string];
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function ScreenShell({
  children,
  scrollable = true,
  gradient = ["#F6F1E8", "#F9F6EF"],
  contentContainerStyle
}: ScreenShellProps) {
  return (
    <LinearGradient colors={gradient} style={styles.gradient}>
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  safeArea: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl + 20
  },
  blobTop: {
    position: "absolute",
    top: -40,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(214, 140, 99, 0.14)"
  },
  blobBottom: {
    position: "absolute",
    bottom: 100,
    left: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(51, 92, 74, 0.08)"
  }
});


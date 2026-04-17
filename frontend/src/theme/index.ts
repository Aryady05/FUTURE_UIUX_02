export const colors = {
  background: "#F6F1E8",
  surface: "#FFFDF7",
  surfaceMuted: "#EFE4D4",
  card: "#FFF9F1",
  text: "#1D2A24",
  textMuted: "#6C766F",
  primary: "#335C4A",
  primaryDark: "#244034",
  accent: "#D68C63",
  accentSoft: "#F4C4A6",
  sage: "#9CB6A8",
  gold: "#D2B46F",
  border: "#E4D7C7",
  success: "#3D8B63",
  danger: "#B85C53",
  white: "#FFFFFF",
  shadow: "rgba(29, 42, 36, 0.12)"
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36
};

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999
};

export const typography = {
  display: {
    fontFamily: "serif",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700" as const
  },
  title: {
    fontFamily: "serif",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700" as const
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600" as const
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400" as const
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500" as const
  }
};

export const shadows = {
  soft: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6
  }
};


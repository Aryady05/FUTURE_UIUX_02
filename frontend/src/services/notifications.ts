import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export async function requestNotificationPermissions() {
  const current = await Notifications.getPermissionsAsync();

  if (current.status === "granted") {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("booking-reminders", {
      name: "Booking reminders",
      importance: Notifications.AndroidImportance.DEFAULT
    });
  }

  return requested.status === "granted";
}


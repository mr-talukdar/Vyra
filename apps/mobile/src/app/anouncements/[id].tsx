import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { router, useLocalSearchParams } from "expo-router";
import {
  announcementCategories,
  announcements,
} from "@/components/home/AnnouncementList";

export default function AnnouncementScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const announcement = announcements.find((item) => item.id === Number(id));

  if (!announcement) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9F9FF] p-6">
        <Text className="mb-4 text-xl font-bold text-gray-900">
          Announcement not found
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text className="font-bold text-blueButton">Go back</Text>
        </Pressable>
      </View>
    );
  }

  const category = announcementCategories.find(
    (item) => item.id === announcement.category,
  );

  return (
    <ScrollView className="flex-1 bg-[#F9F9FF]">
      <View className="p-6 pt-14">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="mb-8">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>

        {category && (
          <Text
            className="mb-3 text-xs font-bold uppercase"
            style={{ color: category.color }}>
            {category.name}
          </Text>
        )}
        <Text className="mb-4 text-3xl font-bold text-gray-900">
          {announcement.title}
        </Text>
        <Text className="text-base leading-6 text-gray-600">
          {announcement.description}
        </Text>
      </View>
    </ScrollView>
  );
}

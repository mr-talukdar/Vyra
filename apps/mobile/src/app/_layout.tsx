import {
  DarkTheme,
  DefaultTheme,
  ErrorBoundaryProps,
  Stack,
  ThemeProvider,
} from "expo-router";

import { Pressable, Text, View, useColorScheme } from "react-native";

import "../global.css";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View className="flex-1 items-center justify-center bg-[#F9F9FF] p-6">
      <Text className="mb-4 text-center text-xl font-bold text-gray-900">
        Something went wrong
      </Text>
      <Text className="mb-6 text-center text-sm text-gray-600">
        {error.message}
      </Text>
      <Pressable onPress={retry} className="rounded-xl bg-[#3525CD] px-5 py-3">
        <Text className="font-bold text-white">Try again</Text>
      </Pressable>
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="anouncements/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}

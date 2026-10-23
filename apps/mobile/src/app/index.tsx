import HomeScrollView from "@/components/HomeScrollView";
import { TopBar } from "@/components/NavBar";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="pt-14 bg-[##F9F9FF]  flex-1 flex-col">
      <TopBar />
      <HomeScrollView />
    </View>
  );
}

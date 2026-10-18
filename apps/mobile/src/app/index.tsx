import ReuseablePressable from "@/components/ui/ReuseablePressable";
import { View, Text, Image } from "react-native";
import CircleButton from "@/components/ui/CircleButton";

export default function HomeScreen() {
  return (
    <View className="pt-10 px-5 flex-1 flex-col">
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-2xl font-bold">Good Morning, Alex</Text>
          <Text className="text-md text-neutral">
            Here's your learning snapshot
          </Text>
        </View>
        <View className="flex flex-row gap-1 justify-center items-center">
          <CircleButton className="bg-">
            <Image
              src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
              className="w-[30px] h-[30px"
            />
          </CircleButton>
          <Text>Profile</Text>
        </View>
      </View>
    </View>
  );
}

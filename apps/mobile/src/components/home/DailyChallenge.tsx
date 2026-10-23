import { View, Text, Image, Pressable } from "react-native";
import ReusableCard from "../ui/ReusableCard";
import { HorizontalLine } from "../NavBar";
import { Ionicons } from "@expo/vector-icons";

const DailyChallenge = () => {
  return (
    <ReusableCard className="flex-1 flex-col gap-4 p-4">
      <View className="flex-1 flex-row justify-between items-center">
        <View className="flex flex-row">
          <Image
            source={require("../../../assets/images/Badge-Challenge.png")}
            className="rounded-full"
          />
          <Text className="font-semibold text-xl"> Daily Challenge</Text>
        </View>
        <Text>3 Mins</Text>
      </View>
      <Text className="text-neutral font-light text-sm">
        Complete 1 micro-lesson on Cloud Security Fundamentals.
      </Text>
      <HorizontalLine />
      <View className="flex flex-row justify-between">
        <View className="flex-row items-center gap-3">
          <View className="w-8 h-8 rounded-full border-4 border-[#C9C5DC] bg-white"></View>
          <Text className="text-sm font-semibold text-slate-600">
            0/1 Completed
          </Text>
        </View>
        <View className="rounded-2xl bg-[#DAE2FD] p-4">
          <Pressable className="flex flex-row gap-1">
            <Text className="text-blueButton font-medium">Begin</Text>
            <Ionicons name="play-outline" size={20} color="#3730D8" />
          </Pressable>
        </View>
      </View>
    </ReusableCard>
  );
};

export default DailyChallenge;


import { View, Text, Image, Pressable } from "react-native";
import ReusableCard from "../ui/ReusableCard";

import AntDesign from "@expo/vector-icons/AntDesign";

const FeaturedChallenge = () => {
  return (
    <ReusableCard
      id="featured-challenge"
      className="flex-1 gap-2 p-6 bg-blueButton">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row justify-center  gap-1 items-center bg-white/20 rounded-3xl p-2">
          <Image
            source={require("../../../assets/images/Bulb.png")}
            className="h-6 w-6 sepia"
          />
          <Text className="text-white font-semibold text-xs">
            FEATURED CHALLENGE
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center bg-white/20 rounded-3xl p-2">
          <Text className="text-white font-medium text-xs"> +50 POINTS</Text>
        </View>
      </View>
      <Text className="text-white font-semibold text-xl">Weekly Quiz</Text>
      <Text className="text-white text-xs">
        Test your knowledge and earn points
      </Text>
      <Pressable className="flex-1 flex-row mt-4 bg-white p-2 rounded-2xl justify-center items-center">
        <Text className="text-[#3525CD] p-4 font-bold">{"Start Quiz"}</Text>
        <AntDesign
          name="arrow-right"
          size={16}
          color="#3525CD"
          className="mt-1"
        />
      </Pressable>
    </ReusableCard>
  );
};

export default FeaturedChallenge;

import { View, Text, Image } from "react-native";
import ReusableCard from "../ui/ReusableCard";
import CircleButton from "../ui/CircleButton";

const StatsRow = () => {
  return (
    <View className="flex-1 flex-row gap-4 ">
      <ReusableCard id="points">
        <View className="flex flex-row justify-between gap-4 items-center ">
          <Text className="text-neutral text-sm">Total Earned</Text>
          <CircleButton className="items-center justify-center">
            <Image
              source={require("../../../assets/images/points.png")}
              className="h-10 w-10  rounded-full"
            />
          </CircleButton>
        </View>
        <View>
          <Text className="text-3xl font-extrabold">420</Text>
        </View>
        <View>
          <Text className="text-neutral ">Points</Text>
        </View>
      </ReusableCard>
      <ReusableCard id="streak">
        <View className="flex flex-row justify-between gap-4 items-center ">
          <Text className="text-neutral text-sm">Personal Best</Text>
          <CircleButton className=" items-center justify-center">
            <Image
              source={require("../../../assets/images/streak.png")}
              className="h-10 w-10  rounded-full"
            />
          </CircleButton>
        </View>
        <View>
          <Text className="text-3xl font-extrabold">8 Days</Text>
        </View>
        <View>
          <Text className=" text-red-800 ">Active Streak</Text>
        </View>
      </ReusableCard>
    </View>
  );
};

export default StatsRow;


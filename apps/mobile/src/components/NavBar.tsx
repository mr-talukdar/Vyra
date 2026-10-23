import { View, Image, Text } from "react-native";
import CircleButton from "./ui/CircleButton";

function HorizontalLine() {
  return <View className="my-4 h-[1px] w-full bg-gray-300" />;
}

const TopBar = () => {
  return (
    <View className="bg-white border-b px-4 border-slate-100 shadow-sm">
      <View className="flex flex-row justify-between ">
        <View>
          <Text className="text-2xl font-bold">Good Morning, Alex</Text>
          <Text className="text-md text-neutral pb-2">
            Here's your learning snapshot
          </Text>
        </View>
        <View className="flex flex-row gap-1 justify-center items-center">
          <CircleButton>
            <Image
              source={require("../../assets/images/notification.png")}
              className="w-8 h-8"
            />
          </CircleButton>
          <CircleButton className="w-10 h-10 p-1 ">
            <Image
              source={require("../../assets/images/profile-94.png")}
              className="w-8 h-8"
            />
          </CircleButton>
        </View>
      </View>
    </View>
  );
};

export { TopBar, HorizontalLine };

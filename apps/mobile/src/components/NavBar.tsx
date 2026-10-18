import { View, Image, Text } from "react-native";
import CircleButton from "./ui/CircleButton";

function HorizontalLine() {
  return <View className="my-4 h-[1px] w-full bg-gray-300" />;
}

const NavBar = () => {
  return (
    <>
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-2xl font-bold">Good Morning, Alex</Text>
          <Text className="text-md text-neutral">
            Here's your learning snapshot
          </Text>
        </View>
        <View className="flex flex-row gap-1 justify-center items-center">
          <CircleButton className=" bg-blue-300 w-8 h-8 p-1 ">
            <Image
              source={require("../../assets/images/notification.png")}
              className="w-6 h-6"
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
      <HorizontalLine />
    </>
  );
};

export default NavBar;

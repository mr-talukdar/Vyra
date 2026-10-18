import { Pressable, View } from "react-native";

interface IPressable {
  children?: React.ReactNode;
  className?: string;
}

const ReuseablePressable = ({ children, className }: IPressable) => {
  return (
    <Pressable className={`bg-slate-800 active:bg-slate-400 ${className}`}>
      <View className="flex flex-col gap-1">{children}</View>
    </Pressable>
  );
};

export default ReuseablePressable;

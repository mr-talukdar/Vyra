import { View } from "react-native";

interface ICircleButton {
  children?: React.ReactNode;
  className?: string;
}

const CircleButton = ({ children, className }: ICircleButton) => {
  return <View className={`rounded-full ${className}`}>{children}</View>;
};

export default CircleButton;

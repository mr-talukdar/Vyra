import { Pressable } from "react-native";

interface ICircleButton {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

const CircleButton = ({ children, className, onPress }: ICircleButton) => {
  return (
    <Pressable onPress={onPress} className={`rounded-full ${className}`}>
      {({ pressed }) => children}
    </Pressable>
  );
};

export default CircleButton;

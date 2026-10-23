import { View, Text, Image } from "react-native";

interface IRCard {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

const ReusableCard = ({ className, children, id }: IRCard) => {
  return (
    <View
      id={id}
      className={`bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-2 ${className} `}>
      {children}
    </View>
  );
};

export default ReusableCard;

import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
import ReusableCard from "@/components/ui/ReusableCard";

const rankings = [
  ["David Kim", "Design Systems", "780", "12d"],
  ["Priya Patel", "Cloud Architecture", "710", "8d"],
  ["Liam O'Connor", "Strategic Sales", "665", "14d"],
  ["Chloe Dupont", "Legal & Compliance", "590", "5d"],
  ["Kenji Takahashi", "Cybersecurity", "540", "9d"],
  ["Amara Okafor", "People Operations", "495", "3d"],
  ["Jordan Miller", "Global Finance", "460", "6d"],
];

const avatar = require("@/assets/images/profile-94.png");

export default function Leaderboard() {
  return (
    <ScrollView className="flex-1 bg-[#F9F9FF]" contentContainerClassName="gap-5 p-6 pb-8">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-3xl font-bold text-secondary">Leaderboard</Text>
          <Text className="mt-1 text-sm text-slate-600">Company-wide learning rankings</Text>
        </View>
        <View className="rounded-xl border border-slate-200 bg-white p-3">
          <Ionicons name="options-outline" size={20} color="#0F172A" />
        </View>
      </View>

      <View className="flex-row rounded-xl border border-blueButtonBackground bg-blueButtonBackground p-1">
        {["This Week", "This Month", "All-Time"].map((label, index) => (
          <View key={label} className={`flex-1 items-center rounded-lg py-3 ${index === 0 ? "bg-white" : ""}`}>
            <Text className={`text-xs font-semibold ${index === 0 ? "text-blueButton" : "text-slate-600"}`}>{label}</Text>
          </View>
        ))}
      </View>

      <ReusableCard className="p-4">
        <View className="flex-row items-end justify-around">
          {[
            ["Marcus V.", "Product", "980", "2"],
            ["Elena R.", "Engineering", "1,240", "1"],
            ["Sarah Chen", "Operations", "850", "3"],
          ].map(([name, team, points, rank], index) => (
            <View key={name} className="items-center">
              {index === 1 && <Ionicons name="star-outline" size={20} color="#F59E0B" />}
              <View className={`rounded-full border-4 ${index === 1 ? "border-yellowBtn" : "border-slate-300"}`}>
                <Image source={avatar} className={`${index === 1 ? "h-16 w-16" : "h-14 w-14"} rounded-full`} />
              </View>
              <Text className="mt-2 text-sm font-bold text-secondary">{name}</Text>
              <Text className="text-xs text-slate-500">{team}</Text>
              <View className={`mt-2 rounded-full px-3 py-1 ${index === 1 ? "bg-yellowBtnBg" : "bg-blueButtonBackground"}`}>
                <Text className={`text-xs font-bold ${index === 1 ? "text-yellowBtn" : "text-blueButton"}`}>{points} pts</Text>
              </View>
              <Text className="absolute -right-2 top-12 rounded-full bg-white px-2 py-1 text-xs font-bold text-secondary">{rank}</Text>
            </View>
          ))}
        </View>
      </ReusableCard>

      <ReusableCard className="flex-row items-center p-4">
        <Text className="mr-3 text-2xl font-bold text-blueButton">#14</Text>
        <Image source={avatar} className="h-11 w-11 rounded-full" />
        <View className="ml-3 flex-1">
          <Text className="font-bold text-secondary">Alex Mercer <Text className="text-xs text-blueButton">(You)</Text></Text>
          <Text className="text-xs text-emerald-600">↗ +45 pts this week</Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-bold text-secondary">420 <Text className="text-xs font-normal">pts</Text></Text>
          <Text className="rounded-full bg-blueButtonBackground px-2 py-1 text-xs font-bold text-blueButton">Top 10%</Text>
        </View>
      </ReusableCard>

      <View className="flex-row justify-between px-1">
        <Text className="text-xs font-bold text-slate-600">RANKINGS (4–10)</Text>
        <Text className="text-xs text-slate-600">Updated 10m ago</Text>
      </View>
      <View className="gap-2">
        {rankings.map(([name, team, points, streak], index) => (
          <ReusableCard key={name} className="flex-row items-center p-3">
            <Text className="w-8 text-center font-bold text-slate-500">{index + 4}</Text>
            <Image source={avatar} className="h-10 w-10 rounded-full" />
            <View className="ml-3 flex-1">
              <Text className="font-bold text-secondary">{name}</Text>
              <Text className="text-xs text-slate-600">{team}</Text>
            </View>
            <Text className="mr-3 text-xs font-bold text-yellowBtn">🔥{streak}</Text>
            <View className="items-end">
              <Text className="font-bold text-secondary">{points}</Text>
              <Text className="text-xs text-slate-600">pts</Text>
            </View>
          </ReusableCard>
        ))}
      </View>
    </ScrollView>
  );
}

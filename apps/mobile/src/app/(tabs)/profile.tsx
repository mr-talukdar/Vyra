import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
import ReusableCard from "@/components/ui/ReusableCard";

const avatar = require("@/assets/images/profile-94.png");

const SettingRow = ({ icon, title, subtitle }: { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string }) => (
  <View className="flex-row items-center border-b border-slate-100 p-4 last:border-b-0">
    <View className="rounded-xl bg-blueButtonBackground p-3">
      <Ionicons name={icon} size={20} color="#3525CD" />
    </View>
    <View className="ml-3 flex-1">
      <Text className="font-bold text-secondary">{title}</Text>
      <Text className="mt-1 text-xs text-slate-600">{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#64748B" />
  </View>
);

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-[#F9F9FF]" contentContainerClassName="gap-5 p-6 pb-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-secondary">Profile & Settings</Text>
        <View className="rounded-xl border border-slate-200 bg-white p-3">
          <Ionicons name="settings-outline" size={20} color="#64748B" />
        </View>
      </View>

      <ReusableCard className="p-4">
        <View className="flex-row items-center">
          <View className="relative">
            <Image source={avatar} className="h-16 w-16 rounded-2xl" />
            <View className="absolute -bottom-1 -right-1 rounded-full bg-blueButton p-1">
              <Ionicons name="pencil" size={12} color="white" />
            </View>
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-secondary">Alex Mercer</Text>
            <Text className="mt-1 text-sm text-slate-600">Senior Product Architect • Cloud Platform</Text>
            <Text className="mt-1 text-xs text-slate-500">Enterprise Systems Org</Text>
          </View>
        </View>
        <View className="my-4 h-px bg-slate-100" />
        <View className="flex-row items-center justify-between">
          <View className="rounded-full bg-blueButtonBackground px-3 py-2">
            <Text className="text-xs font-semibold text-blueButton">🏅 Level 4 Learner • <Text className="text-slate-600">Master Contributor</Text></Text>
          </View>
          <Text className="text-xs font-bold text-blueButton">Details ›</Text>
        </View>
      </ReusableCard>

      <View className="flex-row gap-2">
        {[
          ["Points", "420", "pts", "star"],
          ["Streak", "8", "Days", "flame"],
          ["Certificates", "3", "earned", "ribbon"],
        ].map(([label, value, suffix, icon]) => (
          <ReusableCard key={label} className={`flex-1 p-3 ${label === "Streak" ? "bg-yellowBtnBg" : ""}`}>
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-slate-600">{label}</Text>
              <Ionicons name={`${icon}-outline` as keyof typeof Ionicons.glyphMap} size={16} color={label === "Streak" ? "#D97706" : "#3525CD"} />
            </View>
            <Text className="mt-3 text-xl font-bold text-secondary">{value} <Text className="text-xs font-normal text-slate-600">{suffix}</Text></Text>
          </ReusableCard>
        ))}
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-secondary">Achievements & Badges</Text>
        <Text className="text-xs font-bold text-blueButton">View All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3">
        {[
          ["flash", "Fast Starter"],
          ["cloud", "Cloud Guru"],
          ["settings", "Quiz Master"],
        ].map(([icon, label]) => (
          <ReusableCard key={label} className="w-32 items-center p-4">
            <View className="rounded-xl border border-indigo-200 bg-blueButtonBackground p-3">
              <Ionicons name={`${icon}-outline` as keyof typeof Ionicons.glyphMap} size={24} color="#3525CD" />
            </View>
            <Text className="mt-3 text-center text-xs font-bold text-secondary">{label}</Text>
            <Text className="mt-1 text-xs text-blueButton">Unlocked</Text>
          </ReusableCard>
        ))}
      </ScrollView>

      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-secondary">Learning History & Credentials</Text>
        <Text className="text-xs font-bold text-blueButton">History</Text>
      </View>
      <ReusableCard className="p-4">
        <View className="flex-row">
          <View className="rounded-xl bg-blueButtonBackground p-3">
            <Ionicons name="accessibility-outline" size={22} color="#3525CD" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-xs font-semibold uppercase text-blueButton">● Enterprise Accreditation</Text>
            <Text className="mt-1 text-lg font-bold text-secondary">AWS Solutions Architect</Text>
            <Text className="text-xs text-slate-500">Completed May 2024 • Score 98%</Text>
          </View>
        </View>
        <View className="my-3 h-px bg-slate-100" />
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-slate-600">● ID: SAP-C02-88219</Text>
          <View className="rounded-xl bg-blueButtonBackground px-3 py-3">
            <Text className="text-xs font-bold text-blueButton">View Certificate</Text>
          </View>
        </View>
      </ReusableCard>

      <Text className="text-lg font-bold text-secondary">Account & Preferences</Text>
      <ReusableCard className="p-0">
        <SettingRow icon="alarm-outline" title="Learning Goals & Reminders" subtitle="Daily 15 mins" />
        <SettingRow icon="notifications-outline" title="Notification Preferences" subtitle="Push & Email" />
        <SettingRow icon="cloud-download-outline" title="Offline Downloads & Storage" subtitle="1.2 GB Cached" />
        <SettingRow icon="help-circle-outline" title="Help & Feedback" subtitle="Enterprise Helpdesk 24/7" />
      </ReusableCard>
    </ScrollView>
  );
}

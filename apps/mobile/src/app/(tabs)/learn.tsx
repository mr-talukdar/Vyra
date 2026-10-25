import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import ReusableCard from "@/components/ui/ReusableCard";

const FilterChip = ({ label, active = false }: { label: string; active?: boolean }) => (
  <View className={`rounded-full px-4 py-2 ${active ? "bg-blueButton" : "bg-white border border-slate-200"}`}>
    <Text className={`text-xs font-semibold ${active ? "text-white" : "text-slate-600"}`}>{label}</Text>
  </View>
);

const CourseCard = ({
  category,
  title,
  description,
  points,
  modules,
  duration,
}: {
  category: string;
  title: string;
  description: string;
  points: string;
  modules: string;
  duration: string;
}) => (
  <ReusableCard className="p-4">
    <View className="mb-3 flex-row items-center justify-between">
      <View className="rounded-full bg-blueButtonBackground px-3 py-1">
        <Text className="text-xs font-semibold text-secondary">{category}</Text>
      </View>
      <View className="rounded-full bg-yellowBtnBg px-3 py-1">
        <Text className="text-xs font-semibold text-yellowBtn">{points}</Text>
      </View>
    </View>
    <Text className="text-lg font-bold text-secondary">{title}</Text>
    <Text className="mt-1 text-sm leading-5 text-slate-500">{description}</Text>
    <View className="my-3 h-px bg-slate-100" />
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-1">
        <Ionicons name="book-outline" size={14} color="#64748B" />
        <Text className="text-xs text-slate-600">{modules}</Text>
        <Ionicons name="time-outline" size={14} color="#64748B" />
        <Text className="text-xs text-slate-600">{duration}</Text>
      </View>
      <View className="rounded-xl bg-blueButtonBackground px-4 py-2">
        <Text className="text-xs font-bold text-blueButton">Start →</Text>
      </View>
    </View>
  </ReusableCard>
);

export default function Learn() {
  return (
    <ScrollView className="flex-1 bg-[#F9F9FF]" contentContainerClassName="gap-5 p-6 pb-8">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-3xl font-bold text-secondary">Learn & Upskill</Text>
          <Text className="mt-1 text-sm text-slate-600">Explore micro-courses and track certifications</Text>
        </View>
        <View className="flex-row gap-2">
          <View className="rounded-xl border border-slate-200 bg-white p-3">
            <Ionicons name="search" size={20} color="#0F172A" />
          </View>
          <View className="rounded-xl border border-slate-200 bg-white p-3">
            <Ionicons name="bookmark-outline" size={20} color="#0F172A" />
          </View>
        </View>
      </View>

      <ReusableCard className="flex-row items-center gap-3 p-4">
        <Ionicons name="search-outline" size={20} color="#64748B" />
        <Text className="text-sm text-slate-400">Search topics, skills, courses...</Text>
      </ReusableCard>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        <FilterChip label="All" active />
        <FilterChip label="In Progress" />
        <FilterChip label="Leadership" />
        <FilterChip label="Cloud & Tech" />
      </ScrollView>

      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-secondary">Continue Learning</Text>
        <Text className="text-xs font-bold text-blueButton">View History</Text>
      </View>
      <ReusableCard className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="rounded-full bg-blueButtonBackground px-3 py-1">
            <Text className="text-xs font-semibold text-blueButton">⚡ In Progress</Text>
          </View>
          <View className="rounded-xl bg-blueButtonBackground p-3">
            <Ionicons name="cloud-outline" size={26} color="#3525CD" />
          </View>
        </View>
        <Text className="mt-3 text-xl font-bold text-secondary">Cloud Architecture{"\n"}Fundamentals</Text>
        <Text className="mt-1 text-sm text-slate-600">Module 3 of 5 • Distributed Systems</Text>
        <View className="mt-4 flex-row justify-between">
          <Text className="text-xs text-slate-600">Overall Progress</Text>
          <Text className="text-xs font-bold text-blueButton">60%</Text>
        </View>
        <View className="mt-2 h-2 rounded-full bg-blueButtonBackground">
          <View className="h-2 w-3/5 rounded-full bg-blueButton" />
        </View>
        <View className="mt-2 flex-row justify-between">
          <Text className="text-xs text-slate-600">◷ 18 mins left</Text>
          <Text className="text-xs text-slate-600">120 / 200 XP earned</Text>
        </View>
        <View className="mt-4 items-center rounded-xl bg-blueButton py-4">
          <Text className="font-bold text-white">▶ Resume Course</Text>
        </View>
      </ReusableCard>

      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-secondary">Recommended for You</Text>
        <Text className="text-xs text-slate-500">Curated for role</Text>
      </View>
      <CourseCard category="Leadership" title="Effective Executive Communication" description="High-impact persuasion frameworks for senior leadership syncs and key board reviews." points="+80 pts" modules="3 modules" duration="25 mins" />
      <CourseCard category="Technology" title="Generative AI in the Enterprise" description="Responsible deployment patterns, governance boundaries, and LLM automation tools." points="+120 pts" modules="4 modules" duration="40 mins" />

      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-secondary">Micro-Lessons & Drills</Text>
        <Text className="text-xs text-slate-500">Quick practice</Text>
      </View>
      <ReusableCard className="p-2">
        {[
          ["shield-outline", "Data Privacy 2025 Drill", "5 mins", "+25 XP"],
          ["shield-half-outline", "Phishing Incident Triage", "3 mins", "+15 XP"],
          ["bulb-outline", "Cognitive Bias in Hiring", "7 mins", "+30 XP"],
        ].map(([icon, title, duration, points]) => (
          <View key={title} className="flex-row items-center gap-3 border-b border-slate-100 p-3 last:border-b-0">
            <View className="rounded-xl bg-blueButtonBackground p-3">
              <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color="#3525CD" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-secondary">{title}</Text>
              <Text className="text-xs text-slate-600">◷ {duration} · <Text className="text-yellowBtn">{points}</Text></Text>
            </View>
            <View className="rounded-xl bg-blueButtonBackground px-3 py-3">
              <Text className="text-xs font-bold text-blueButton">Quick Review</Text>
            </View>
          </View>
        ))}
      </ReusableCard>
    </ScrollView>
  );
}

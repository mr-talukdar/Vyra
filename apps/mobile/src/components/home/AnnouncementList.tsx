import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ReusableCard from "../ui/ReusableCard";

export const announcementCategories = [
  {
    id: 1,
    name: "Product & Tech",
    renderIcon: "terminal-outline" as const,
    color: "#3525CD",
  },
  {
    id: 2,
    name: "People & Culture",
    renderIcon: "heart-outline" as const,
    color: "#087A59",
  },
  {
    id: 3,
    name: "Security & Compliance",
    renderIcon: "shield-checkmark-outline" as const,
    color: "#D97706",
  },
  {
    id: 4,
    name: "Learning & Growth",
    renderIcon: "book-outline" as const,
    color: "#7C3AED",
  },
  {
    id: 5,
    name: "Company News",
    renderIcon: "megaphone-outline" as const,
    color: "#DC2626",
  },
];

export const announcements = [
  {
    title: "Q3 Architecture Review Live",
    time: new Date().getTime(),
    category: 1,
    description: "Watch the recorded briefing and review key takeaways",
  },
  {
    title: "New Mentorship Program Launch",
    time: new Date().getTime(),
    category: 2,
    description: "Sign up to be a mentor or mentee for the next quarter",
  },
  {
    title: "Mandatory Security Training Due",
    time: new Date().getTime(),
    category: 3,
    description: "Complete your annual security awareness training by Nov 15",
  },
  {
    title: "AWS Certification Cohort Open",
    time: new Date().getTime(),
    category: 4,
    description:
      "Join the study group for AWS Solutions Architect certification",
  },
  {
    title: "Series C Funding Announced",
    time: new Date().getTime(),
    category: 5,
    description: "Read the CEO's letter about our latest funding milestone",
  },
  {
    title: "Platform Migration to K8s",
    time: new Date().getTime(),
    category: 1,
    description:
      "All services must migrate to the new Kubernetes cluster by Q4",
  },
  {
    title: "Hackathon Results Are In",
    time: new Date().getTime(),
    category: 2,
    description:
      "Congratulations to Team Phoenix for winning the fall hackathon",
  },
];

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getCategoryById(id: number) {
  return announcementCategories.find((c) => c.id === id);
}

const AnnouncementItem = ({
  title,
  description,
  time,
  category,
  isLast,
}: {
  title: string;
  description: string;
  time: number;
  category: number;
  isLast: boolean;
}) => {
  const cat = getCategoryById(category);
  if (!cat) return null;

  return (
    <View>
      <View className="flex flex-row items-center gap-3 py-3">
        {/* Icon */}
        <View
          className="w-12 h-12 rounded-xl items-center justify-center"
          style={{ backgroundColor: cat.color + "18" }}>
          <Ionicons name={cat.renderIcon} size={22} color={cat.color} />
        </View>

        {/* Content */}
        <View className="flex-1 flex-col gap-1">
          <View className="flex flex-row justify-between items-center">
            <Text
              className="text-xs font-bold uppercase"
              style={{ color: cat.color }}>
              {cat.name}
            </Text>
            <Text className="text-xs text-gray-400">{getTimeAgo(time)}</Text>
          </View>
          <Text className="text-base font-bold text-gray-900">{title}</Text>
          <Text className="text-sm text-gray-500">{description}</Text>
        </View>

        {/* Chevron */}
        <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
      </View>

      {/* Divider */}
      {!isLast && <View className="h-[1px] bg-gray-100 ml-15" />}
    </View>
  );
};

const AnnouncementList = () => {
  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Announcements</Text>
        <Text className="font-bold text-blueButton">See All</Text>
      </View>
      <ReusableCard className="p-2">
        {announcements.map((item, index) => (
          <AnnouncementItem
            key={index}
            title={item.title}
            description={item.description}
            time={item.time}
            category={item.category}
            isLast={index === announcements.length - 1}
          />
        ))}
      </ReusableCard>
    </View>
  );
};

export default AnnouncementList;

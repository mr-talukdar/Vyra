import { View, Text } from "react-native";

export const announcementCategories = [
  {
    id: 1,
    name: "Product & Tech",
    renderIcon: "terminal-outline",
    color: "#3525CD",
  },
  {
    id: 2,
    name: "People & Culture",
    renderIcon: "heart",
    color: "#087A59",
  },
  {
    id: 3,
    name: "Security & Compliance",
    renderIcon: "shield-checkmark-outline",
    color: "#D97706",
  },
  {
    id: 4,
    name: "Learning & Growth",
    renderIcon: "book-outline",
    color: "#7C3AED",
  },
  {
    id: 5,
    name: "Company News",
    renderIcon: "megaphone-outline",
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

const AnnouncementList = () => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="text-2xl font-bold"> Announcements</Text>
      <Text className="font-bold text-blueButton"> See All</Text>
    </View>
  );
};

export default AnnouncementList;


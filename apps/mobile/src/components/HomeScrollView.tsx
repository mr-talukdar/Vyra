import { ScrollView } from "react-native";
import StatsRow from "./home/StatsRow";
import FeaturedChallenge from "./home/FeaturedChallenge";
import DailyChallenge from "./home/DailyChallenge";
import AnnouncementList from "./home/AnnouncementList";

const HomeScrollView = () => {
  return (
    <ScrollView
      className="p-6 "
      contentContainerClassName="flex flex-col gap-4">
      <StatsRow />
      <FeaturedChallenge />
      <DailyChallenge />
      <AnnouncementList />
    </ScrollView>
  );
};

export default HomeScrollView;

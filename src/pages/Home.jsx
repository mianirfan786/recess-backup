import Activities from "../components/Home/Activities/Activities";
import HomeHeader from "../components/Home/HomeHeader";
import Popular from "../components/Home/Popular/Popular";
import RecentlyAdded from "../components/Home/RecentlyAdded/RecentlyAdded";
import Sponsored from "../components/Home/Sponsored/Sponsored";
import Upcoming from "../components/Home/Upcoming/Upcoming";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <Upcoming />
      <Sponsored />
      <Popular />
      <RecentlyAdded />
      <Activities />
    </div>
  );
};

export default Home;

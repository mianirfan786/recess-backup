import Activities from "../components/HomeComponents/Activities/Activities";
import HomeHeader from "../components/HomeComponents/HomeHeader";
import Popular from "../components/HomeComponents/Popular/Popular";
import RecentlyAdded from "../components/HomeComponents/RecentlyAdded/RecentlyAdded";
import Sponsored from "../components/HomeComponents/Sponsored/Sponsored";
import Upcoming from "../components/HomeComponents/Upcoming/Upcoming";

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

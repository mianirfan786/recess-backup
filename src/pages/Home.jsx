import HomeHeader from "../components/HomeComponents/HomeHeader";
import Popular from "../components/HomeComponents/Popular/Popular";
import Sponsored from "../components/HomeComponents/Sponsored/Sponsored";
import Upcoming from "../components/HomeComponents/Upcoming/Upcoming";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <Upcoming />
      <Sponsored />
      <Popular />
    </div>
  );
};

export default Home;

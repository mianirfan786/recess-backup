import Header from "../components/HomeComponents/Header";
import Sponsored from "../components/HomeComponents/Sponsored";
import Upcoming from "../components/HomeComponents/Upcoming";

const Home = () => {
  return (
    <div>
      <Header />
      <Upcoming />
      <Sponsored />
    </div>
  );
};

export default Home;

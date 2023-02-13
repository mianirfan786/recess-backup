import Activities from "../components/Home/Activities/Activities";
import HomeHeader from "../components/Home/HomeHeader";
import Popular from "../components/Home/Popular/Popular";
import RecentlyAdded from "../components/Home/RecentlyAdded/RecentlyAdded";
import Sponsored from "../components/Home/Sponsored/Sponsored";
import Upcoming from "../components/Home/Upcoming/Upcoming";
import Requested from "../components/Home/Requested";
import TagsModal from "../modals/TagsModal";
import { useModalsContext } from "../modals/ModalsContext";
import { MODALS } from "../modals/modals";
import Location from "../components/Home/Location";

const Home = () => {
  const { openModal, setOpenModal } = useModalsContext();

  return (
    <div>
      <HomeHeader />
      <Location />
      <Upcoming />
      <Sponsored />
      <Popular />
      <RecentlyAdded />
      <Activities />
      <Requested />
      <TagsModal
        onClose={() => setOpenModal(null)}
        open={openModal === MODALS.TAGS}
      />
    </div>
  );
};

export default Home;

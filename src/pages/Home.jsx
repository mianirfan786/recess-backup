import Activities from "../components/Home/Activities/Activities";
import HomeHeader from "../components/Home/HomeHeader";
import Popular from "../components/Home/Popular/Popular";
import RecentlyAdded from "../components/Home/RecentlyAdded/RecentlyAdded";
import Sponsored from "../components/Home/Sponsored/Sponsored";
import Upcoming from "../components/Home/Upcoming/Upcoming";
import Requested from "../components/Home/Requested";
import TagsModal from "../modals/TagsModal";
import {useModalsContext} from "../modals/ModalsContext";
import {MODALS} from "../modals/modals";
import Location from "../components/Home/Location";
import {useState} from "react";

const Home = () => {
    const {openModal, setOpenModal} = useModalsContext();
    const [currentCity, setCurrentCity] = useState("");
    const [initLoad, setInitLoad] = useState(0);
    const [updateKeywords, setUpdateKeywords] = useState(0);
    const [seedUpcoming, setSeedseedUpcoming] = useState(1);
    const [seedSponsored, setSeedSponsored] = useState(2);
    const [seedPopular, setSeedPopular] = useState(3);
    const [seedRecentlyAdded, setSeedRecentlyAdded] = useState(4);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);

    const HandleUpdate = (city) => {
        if (initLoad !== 0)
            setCurrentCity(city);
        else
            setInitLoad(initLoad + 1);
    }
    const UpdateKeywords = () => {
        setUpdateKeywords(updateKeywords + 1);
    }
    return (
        <div>
            <HomeHeader/>
            <Location onData={HandleUpdate}/>
            <Upcoming currentCity={currentCity}/>
            <Sponsored currentCity={currentCity}/>
            <Popular currentCity={currentCity}/>
            <RecentlyAdded currentCity={currentCity}/>
            <Activities/>
            <Requested updateKeywords={updateKeywords}/>
            <TagsModal
                onData={UpdateKeywords}
                onClose={() => setOpenModal(null)}
                open={openModal === MODALS.TAGS}
            />
        </div>
    );
};

export default Home;

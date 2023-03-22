import ExploreHeader from "../components/Explore/ExploreHeader/ExploreHeader";
import ExploreView from "../components/Explore/ExploreView/ExploreView";
import {useModalsContext} from "../modals/ModalsContext";
import SortAndFilterModal from "../modals/SortAndFilterModal";
import {MODALS} from "../modals/modals";

const Explore = () => {
    const {openModal, setOpenModal} = useModalsContext();

    return (
        <div>
            <SortAndFilterModal
                open={openModal === MODALS.SORT_FILTER}
                onClose={() => setOpenModal(null)}
            />
            <ExploreHeader/>
            <ExploreView/>
        </div>
    );
};

export default Explore;

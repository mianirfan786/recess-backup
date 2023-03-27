import ExploreHeader from "../components/Explore/ExploreHeader/ExploreHeader";
import ExploreView from "../components/Explore/ExploreView/ExploreView";
import {useModalsContext} from "../modals/ModalsContext";
import SortAndFilterModal from "../modals/SortAndFilterModal";
import {MODALS} from "../modals/modals";
import {useState} from "react";

const Explore = () => {
    const {openModal, setOpenModal} = useModalsContext();
    const [appliedFilters, setAppliedFilters] = useState(null);
    const FiltersChanged = (filters) => {
        setAppliedFilters(filters);
    }
    return (
        <div>
            <SortAndFilterModal
                onApply={FiltersChanged}
                open={openModal === MODALS.SORT_FILTER}
                onClose={() => setOpenModal(null)}
            />
            <ExploreHeader/>
            <ExploreView
                filters={appliedFilters}
            />
        </div>
    );
};

export default Explore;

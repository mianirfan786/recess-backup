import React, {useState} from "react";

const ModalsContext = React.createContext();

export const ModalsContextProvider = ({children}) => {
    const [openModal, setOpenModal] = useState(null);

    return (
        <ModalsContext.Provider value={{openModal, setOpenModal}}>
            {children}
        </ModalsContext.Provider>
    );
};

export const useModalsContext = () => React.useContext(ModalsContext);

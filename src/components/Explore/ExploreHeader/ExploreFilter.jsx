import {Box, Button} from "@mui/material";
import {BsViewList} from "react-icons/bs";
import {IoMapOutline} from "react-icons/io5";
import Mapicon from "../../../icons/Mapicon";
import "../../../styles/main.scss"

const ExploreFilter = ({view, setView, handleView}) => {
    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: {lg: 1, xs:0},
                    border: "1.5px solid #CED1DC80",
                    borderRadius: 8,
                }}
               

            >
                <Button
                    onClick={() => setView("list")}
                    sx={{
                        minWidth:"unset",
                        fontSize: 30,
                        borderRadius: 8,
                        bgcolor: view === "list" ? "text.primary" : "transparent",
                        color: view === "list" ? "info.main" : "text.secondary",
                        border: "none",
                        "&:hover": {
                            bgcolor: "text.primary",
                            color: "info.main",
                            border: "none",
                        },
                    }}
                    variant={view === "list" ? "contained" : "outlined"}
                >
                    <BsViewList className="icon-16" />
                </Button>
                <Button
                    onClick={() => setView("map")}
                    id={"iconHover"}
                    sx={{
                        minWidth:"unset",
                        fontSize: 30,
                        borderRadius: 8,
                        bgcolor: view === "map" ? "text.primary" : "transparent",
                        color: view === "map" ? "info.main" : "text.secondary",
                        border: "none",
                        "&:hover": {
                            bgcolor: "text.primary",
                            color: "info.main",
                            border: "none",
                        },
                    }}
                    variant={view === "map" ? "contained" : "outlined"}
                >
                    <Mapicon data={view === "map" ? "iconWhite icon-16" : "icon-16"}  />
                </Button>
            </Box>
        </div>
    );
};

export default ExploreFilter;

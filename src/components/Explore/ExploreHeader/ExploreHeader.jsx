import {Box, Container, Stack, Typography} from "@mui/material";
import {CiFilter} from "react-icons/ci";
import {useModalsContext} from "../../../modals/ModalsContext";
import {MODALS} from "../../../modals/modals";
import {useSelector} from "react-redux"
import { useState } from "react";
import { useEffect } from "react";

const ExploreHeader = () => {
    const {setOpenModal} = useModalsContext();
    const appliedFilters = useSelector(state => state.ModelReducer.appliedFilters)
    // const [filter, setFilter] = useState(0)
    // useEffect(()=>{
    // },[appliedFilters])
    console.log(appliedFilters);

    return (
        <Container sx={{py: {xs: 2, md: 4}}}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
            >
                <Box>
                    <Typography variant="h3">Explore</Typography>
                </Box>
                <Box>
                    <Box
                        onClick={() => setOpenModal(MODALS.SORT_FILTER)}
                        sx={{
                            bgcolor: "info.main",
                            color: "#28303F",
                            fontSize: {xs: 24, md: 30},
                            borderRadius: "50%",
                            width: {xs: 42, md: 60},
                            height: {xs: 42, md: 60},
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "none",
                        }}
                        variant="contained"
                    >
                        <CiFilter/>
                       
                    </Box>
                    {appliedFilters>0?<Box
                        onClick={() => setOpenModal(MODALS.SORT_FILTER)}
                        sx={{
                            position: "relative",
                            bottom: {xs:"41px",sm:"41px",md:"56px"},
                            left: {xs:"23px", sm:"23px", md:"33px"},
                            bgcolor: "#2DC6FF",
                            color: "white",
                            fontSize: {xs: 10, md: 12},
                            borderRadius: "50%",
                            width: {xs: 18, md: 24},
                            height: {xs: 18, md: 24},
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "none",
                        }}
                        variant="contained"
                    >
                        {appliedFilters}
                    </Box>:""}
                </Box>
            </Stack>
        </Container>
    );
};

export default ExploreHeader;

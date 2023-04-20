import {Container, Stack} from "@mui/material";
import Header from "../components/Profile/Header";
import Actions from "../components/Profile/Actions";
import Footer from "../components/Profile/Footer";

const Profile = () => {
    return (
        // <Container sx={{flex: 1, display: "flex", my: 2}}>
        //     <Stack flex={1} spacing={4}>
        <div>
                <Header/>
                <Actions/>
                <Footer/>
        </div>
                
        //     </Stack>
        // </Container>
    );
};

export default Profile;

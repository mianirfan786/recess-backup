import {Stack, Typography} from "@mui/material";
import {SwiperSlide} from "swiper/react";
import DefaultSwiper from "../../DefaultSwiper/DefaultSwiper";
import UserCard from "./UserCard";

const Registered = ({users, maxParticipants}) => {
    return (
        <Stack overflow="hidden" position="relative" gap={2}>
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography variant="h4" fontWeight="bold">
                    Registered
                </Typography>
                <Typography variant="h5">
                    <span>{users.length}</span> /{" "}
                    <span style={{color: "#CED1DC"}}>{maxParticipants}</span>
                </Typography>
            </Stack>
            <DefaultSwiper>
                {users.map((user) => (
                    <SwiperSlide key={user.uid}>
                        <UserCard user={user}/>
                    </SwiperSlide>
                ))}
            </DefaultSwiper>
        </Stack>
    );
};

export default Registered;

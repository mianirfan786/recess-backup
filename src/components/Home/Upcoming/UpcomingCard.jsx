import {Box, Button, Stack, Typography} from "@mui/material";
import {BsCalendarEvent} from "react-icons/bs";
import styles from "../../../styles/Home.module.scss";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../routes";
import {Timestamp} from "firebase/firestore";
import {timeTo12HrFormat} from "../../../utils/timeFunctions";
import {getContrastRatio} from "../../../utils/colors";
import { useEffect, useState } from "react";
import { GetUsersById } from "../../../firebase/functions/user";
import eventStyles from "../../../styles/Event.module.scss";


const UpcomingCard = ({event}) => {
    const [userPhotos, setPhotos] = useState([])
    try {
        event.date = (event.date).toDate();
    } catch {
        event.date = Timestamp.now().toDate();
    }
    const {id, title, startTime, date, photos, bgColor} = event;
    const navigate = useNavigate();

    useEffect(()=>{
        event.joined.forEach((user) => {
            /* get all details of this user and push it to setPhotos */
            /* only unique values in userPhotos and length 3 */
            if (userPhotos.length < 3){
                GetUsersById(user).then((res) => {
                    console.log(user);
                    setPhotos((userPhotos) => [...userPhotos, res]);
                });
            }
        });
    },[])

    /* check if bgColor is bright */
    const fontColor = getContrastRatio(bgColor, "ffffff") > 0.70 ? "#000000" : "#ffffff";
    return (
        <Box
            className={styles.eventCard}
            sx={{
                bgcolor: `${bgColor}`,
                color: `${fontColor}`,
                p: {xs: 1, md: 1.5},
                borderRadius: "25px !important",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <img id={'imgUpcoming' + id} className={styles.eventThumb} src={photos} alt=""/>
            <Box sx={{my: {xs: 1, md: 2}, px: 1}}>
                <Typography
                    color={fontColor} variant="h4">
                    {title}
                </Typography>
                <Stack
                    direction="row"
                    sx={{my: {xs: 1, md: 2}}}
                    gap={{xs: 0.5, md: 1}}
                >
                    <BsCalendarEvent color={fontColor} className={styles.calendarIcon}/>
                    <Typography color={fontColor} variant="h6">
                        {date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </Typography>
                    <Typography color={fontColor} variant="h6">
                        {timeTo12HrFormat(startTime)}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                >
                    {/* <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: {xs: 0.5, md: 1},
                        }}
                        className={styles.eventJoined}
                    >
                        <Box>
                                         {eventJoined.map((user) => (
                <img key={user.id} src={user.image} alt="" />
              ))}
                        </Box>
                        <Typography color={fontColor} variant="h6">
                            {event.attendees} joined
                        </Typography>
                    </Box> */}
                       {userPhotos && userPhotos?.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                marginTop: "10px",
                                alignItems: "center",
                                gap: {xs: 0.5, md: 1},
                            }}
                            className={eventStyles.eventJoined}
                        >
                            <Box>
                                {userPhotos.map((user, index) => {
                                    console.log(userPhotos);
                                    return (
                                    <img style={{
                                        width: "30px",
                                        aspectRatio: "1/1",
                                    }} key={index} src={user?.photoURL ? user.photoURL : "https://cdn1.iconfinder.com/data/icons/messenger-and-society/16/user_person_avatar_unisex-512.png"} alt=""/>
                                )})}
                            </Box>
                            <Typography variant="h6">
                                +{event.attendees} 
                            </Typography>
                        </Box>
                    )}
                    <Button
                        onClick={function (e) {
                            e.preventDefault();
                            navigate(ROUTES.EVENT_DETAILS.replace(":id", id));
                        }}
                        sx={{
                            px: 3,
                            borderRadius: 50,
                            fontSize: {xs: 14, md: 16},
                            fontWeight: 700,
                            textTransform: "capitalize",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
                            color: "text.primary",
                            boxShadow: 0,
                            "&:hover": {
                                backgroundColor: "primary.main",
                                color: "info.main",
                                boxShadow: 0,
                            },
                        }}
                        variant="contained"
                        color="info"
                    >
                        Join
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default UpcomingCard;

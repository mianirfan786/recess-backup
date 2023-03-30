import {Box, Button, Container, Grid, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import EventCard from "../components/EventCard/EventCard";


import {
    collection,
    getDocs,
    limit,
    orderBy,
    query as firebaseQuery,
    startAfter,
    Timestamp,
    where
} from "firebase/firestore";

import {db} from "../firebase/config";
import {useNavigate, useSearchParams} from "react-router-dom";
import {showToast} from "../utils/toast";
import {getCurrentUser} from "../firebase/functions/user";
import BackButton from "../icons/BackIcon";

const postLimit = 10;

export function documentDataToObject(doc) {
    return {id: doc.id, ...doc.data()};
}

const iconStyle = {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1/1",
    width: {xs: "30px", sm: "40px"},
    height: {xs: "30px", sm: "40px"},
    opacity: 0.8,
    padding: "7px",
    marginTop: "10px"
};


function Events({}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [lastDoc, setLastDoc] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");
    const keywordSearch = searchParams.get("keywordSearch");
    const navigate = useNavigate();

    /* autorun function that scroll to top */

    let displayText = "";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
    if (type) {
        displayText = type.replace(/-/g, " ");
    } else if (keywordSearch) {
        displayText = keywordSearch + " Events";
    } else {
        displayText = "Events";
    }

    async function fetchPosts(query) {
        try {
            const snapshot = await getDocs(query);
            const _fetched = (snapshot.docs.map(documentDataToObject));
            let fethcedEvents = _fetched;
            const today = new Date();
            if (type)
                switch (type) {
                    case "recently-added-event":
                        fethcedEvents = _fetched.filter((event) => event.date >= Timestamp.fromDate(today));
                        break;
                    case "upcoming-event":
                        break;
                    case "past-event":
                        fethcedEvents = _fetched.filter((event) => event.date < Timestamp.now().toDate());
                        break;
                    case "popular-event":
                        fethcedEvents = _fetched.filter((event) => event.date > Timestamp.fromDate(today));
                        break;
                }
            return {
                data: fethcedEvents,
                lastDoc: snapshot.docs[snapshot.docs.length - 1],
                isEnded: snapshot.docs.length !== postLimit,
            };
        } catch (error) {
            console.log(error);
            showToast({type: "error", message: error.message});
            return {data: []};
        }
    }


    useEffect(() => {
        setLoading(true);
        setIsEnded(false);
        setLastDoc(null);
        setEvents([]);
        _fetch(false);
    }, []);

    function _fetch(startAfterLastDoc = true) {
        const queries = [
            collection(db, "events"),
            limit(postLimit),
        ];

        if (type) {
            const whereQuery = [];

            if (startAfterLastDoc && lastDoc) {
                whereQuery.push(startAfter(lastDoc));
            }

            //   function _replace(val) {
            //     return val.toLowerCase().replaceAll(",", " ").replaceAll("  ", " ");
            //   }

            //   if (query.category) {
            //     whereQuery.push(where("categories", "array-contains", query.category));
            //   }

            switch (type) {
                case "recently-added-event":
                    const today = new Date();
                    const lastMonth = new Date(today);
                    lastMonth.setMonth(lastMonth.getMonth() - 1);
                    whereQuery.push(where("timeStamp", ">=", Timestamp.fromDate(lastMonth)));
                    break;
                case "upcoming-event":
                    whereQuery.push(where("date", ">=", Timestamp.fromDate(new Date())));
                    break;
                case "past-event":
                    whereQuery.push(where("date", "<", Timestamp.fromDate(new Date())));
                    break;
                case "popular-event":
                    whereQuery.push(orderBy("attendees", "desc"));
                    break;
                case "sponsored-event":
                    whereQuery.push(where("sponsored", "==", true));
                    break;
                case "hosted-by-you":
                    whereQuery.push(where("CreatedBy", "==", getCurrentUser()));
                    break;
                case "requested-by-you":
                    whereQuery.push(where("RequestedBy", "==", getCurrentUser()));
                    break;
                default:
                    whereQuery.push(orderBy("date", ">=", Timestamp.fromDate(new Date())));
                    break;
            }
            fetchPosts(firebaseQuery(...[...queries, ...whereQuery])).then((r) => {
                setEvents((prev) => [...prev, ...r.data]);
                if (r.isEnded !== undefined) setIsEnded(r.isEnded);
                if (r.lastDoc) setLastDoc(r.lastDoc);
                setLoading(false);
            });
        } else if (keywordSearch) {
            const whereQuery = [];

            if (startAfterLastDoc && lastDoc) {
                whereQuery.push(startAfter(lastDoc));
            }

            whereQuery.push(where("keywords", "==", keywordSearch));

            fetchPosts(firebaseQuery(...[...queries, ...whereQuery])).then((r) => {
                setEvents((prev) => [...prev, ...r.data]);
                if (r.isEnded !== undefined) setIsEnded(r.isEnded);
                if (r.lastDoc) setLastDoc(r.lastDoc);
                setLoading(false);
            });
        } else {
            fetchPosts(firebaseQuery(...[...queries])).then((r) => {
                setEvents((prev) => [...prev, ...r.data]);
                if (r.isEnded !== undefined) setIsEnded(r.isEnded);
                if (r.lastDoc) setLastDoc(r.lastDoc);
                setLoading(false);
            });
        }
    }

    function onClickLoadMore() {
        _fetch();
    }

    return (
        <div>
            <Container sx={{py: {xs: 2, md: 4}}}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                >
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                        }}
                    >
                        <IconButton onClick={() => navigate(-1)} size="small" sx={iconStyle}>
                            <BackButton/>
                        </IconButton>
                        <Typography style={{
                            textTransform: "capitalize",
                        }} variant="h3">{displayText}</Typography>
                    </Box>
                </Stack>
            </Container>
            <Box
                style={{
                    backgroundColor: "#ffffff",
                    padding: "40px 80px",
                }}
                flexDirection="column" width="100%" display="flex">
                <Grid boxSizing="border-box" width="100%" container spacing={3}>
                    {(loading ? [...new Array(6)] : events).map((event, index) => (
                        <Grid
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            width="100%"
                            key={loading ? index : event.id}
                            xs={12}
                            md={6}
                            item
                            boxSizing="border-box"
                        >
                            {loading ? (
                                <Skeleton
                                    variant="rectangular"
                                    height="300px"
                                    width="100%"
                                    sx={{borderRadius: 2}}
                                />
                            ) : (
                                <EventCard customBg={"#f6faff"} event={event}></EventCard>
                            )}
                        </Grid>
                    ))}


                </Grid>
                <div
                    style={{
                        margin: "auto",
                        padding: "10px",
                        width: "100%",
                        maxWidth: "250px",
                        paddingTop: "50px",
                    }}
                >
                    {isEnded ? (
                        <Button disabled fullWidth variant="outlined">
                            No more events
                        </Button>
                    ) : (
                        <Button onClick={onClickLoadMore} fullWidth variant="outlined">
                            Load More
                        </Button>
                    )}
                </div>
            </Box>
        </div>

    );
}

export default Events;
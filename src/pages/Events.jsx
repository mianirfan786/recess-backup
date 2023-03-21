import {Box, Button, Skeleton, Typography} from "@mui/material";
import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import UpcomingCard from "../components/Home/Upcoming/UpcomingCard";

import {
    collection,
    getDocs,
    limit,
    orderBy,
    query as firebaseQuery,
    startAfter,
    where,
    Timestamp
} from "firebase/firestore";

import {db} from "../firebase/config";
import {useSearchParams} from "react-router-dom";
import {showToast} from "../utils/toast";
import {getCurrentUser} from "../firebase/functions/user";

const postLimit = 10;

export function documentDataToObject(doc) {
    return {id: doc.id, ...doc.data()};
}


function Events({}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [lastDoc, setLastDoc] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");

    async function fetchPosts(query) {
        try {
            const snapshot = await getDocs(query);
            const _fetched = (snapshot.docs.map(documentDataToObject));
            let fethcedEvents = _fetched;
            const today = new Date();
            switch (type){
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
                default:
                    whereQuery.push(orderBy("date", ">=", Timestamp.fromDate(new Date())));
                    break;
            }
            console.log("whereQuery", whereQuery);
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
        <Box flexDirection="column" width="100%" display="flex">
            <Typography
                width="100%"
                mb={2}
                variant="h3"
                color="secondary"
                fontWeight={400}
            >
                {type ? `${type}s` : ""}
            </Typography>
            <Grid boxSizing="border-box" width="100%" container spacing={3}>
                {(loading ? [...new Array(6)] : events).map((event, index) => (
                    <Grid
                        width="100%"
                        key={loading ? index : event.id}
                        xs={12}
                        md={3}
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
                            <UpcomingCard event={event}></UpcomingCard>
                        )}
                    </Grid>
                ))}

                <div
                    style={{
                        margin: "auto",
                        padding: "10px",
                        width: "100%",
                        maxWidth: "250px",
                        paddingTop: "30px",
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
            </Grid>
        </Box>
    );
}

export default Events;
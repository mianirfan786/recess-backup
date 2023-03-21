import { Box, Button, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UpcomingCard from "../components/Home/Upcoming/UpcomingCard";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as firebaseQuery,
  startAfter,
  where,
} from "firebase/firestore";

import { Grid } from "swiper";
import { db } from "../firebase/config";
import { useSearchParams } from "react-router-dom";
import { showToast } from "../utils/toast";

const postLimit = 10;

export function documentDataToObject(doc) {
  return { id: doc.id, ...doc.data() };
}

async function fetchPosts(query) {
  console.log("query", query);
  try {
    const snapshot = await getDocs(query);
    const _fetched = snapshot.docs.map(documentDataToObject);
    return {
      data: _fetched,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      isEnded: snapshot.docs.length !== postLimit,
    };
  } catch (error) {
    console.log(error);
    showToast({ type: "error", message: error.message });
    return { data: [] };
  }
}

function Events({}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [lastDoc, setLastDoc] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

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
      orderBy("dateTime", "desc"),
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
        case "recently-added":
          whereQuery.push(orderBy("dateTime", "desc"));
          break;
        // TODO add logic for other fields e.g. (Upcoming Events, Sponsored Activities, Most Popular, Activities Hosted by You)
        //   case "hosted-by-you":
        //     whereQuery.push(where("host_uid", "==", FirebaseAuth.uid));
        //     break;
        default:
          break;
      }

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
            md={6}
            item
            boxSizing="border-box"
          >
            {loading ? (
              <Skeleton
                variant="rectangular"
                height="300px"
                width="100%"
                sx={{ borderRadius: 2 }}
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

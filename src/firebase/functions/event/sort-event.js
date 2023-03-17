import {collection, getDocs, getFirestore, limit, orderBy, query} from "firebase/firestore";

import app from "../../config";


/* Basic Variables */
const db = getFirestore(app);


/* sort event By Date :: Start */
export const SortEventByUpcoming = async (maxItems) => {
    const q = query(collection(db, "events"), orderBy("date", "desc"), limit(maxItems));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event By Date :: End */


/* Implementation Left To Do */
/* sort event By Popularity :: Start */
export const SortEventByPopular = async (maxItems) => {
    return SortEventByUpcoming(maxItems);
}
/* sort event By Popularity :: End */

/* sort event by time creation :: Start */
export const SortEventByTimeStamp = async (maxLimit) => {
    const q = query(collection(db, "events"), orderBy("timeStamp", "desc"), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by time creation :: End */

/* sort event by max players :: Start */
export const SortEventByMaxPlayers = async (maxPlayers, maxLimit) => {
    const q = query(collection(db, "events"), orderBy("maxParticipants", "desc"), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by max players :: End */

/* sort event by no. of attendees :: Start */
export const SortEventByAttendees = async (maxLimit) => {
    const q = query(collection(db, "events"), orderBy("attendees", "desc"), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by no. of attendees :: End */

/* sort event by No of participants :: Start */
export const SortEventByParticipantCount = async ( maxLimit) => {
    const q = query(collection(db, "events"), orderBy("participantCount", "desc"), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by No of participants :: End */

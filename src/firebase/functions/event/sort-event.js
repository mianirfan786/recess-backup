import {collection, getDocs, getFirestore, limit, orderBy, query, Timestamp, where} from "firebase/firestore";

import app from "../../config";
import {GetAreaNearUser} from "./index";


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


/* -------------------------------------- */
/* For Event Page */

/* sort event by no. of attendees :: Start */
export const SortEventByAttendees = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("attendees", "desc"), limit(maxLimit));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("attendees", "desc"), limit(maxLimit));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("attendees", "desc"), limit(maxLimit));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by no. of attendees :: End */

/* sort event by No of participants :: Start */
export const SortEventByParticipantCount = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("participantCount", "desc"), limit(maxLimit));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("participantCount", "desc"), limit(maxLimit));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("participantCount", "desc"), limit(maxLimit));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by No of participants :: End */

/* sort event by time creation :: Start */
export const SortEventByTimeStamp = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("timeStamp", "desc"), limit(maxLimit));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("timeStamp", "desc"), limit(maxLimit));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("timeStamp", "desc"), limit(maxLimit));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by time creation :: End */

/* sort event by start date :: Start */
export const SortEventByStartDate = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("date", "desc"), limit(maxLimit));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("date", "desc"), limit(maxLimit));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("date", "desc"), limit(maxLimit));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}

/* sort event by max players :: Start */
export const SortEventByMaxPlayers = async (maxPlayers, maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("maxParticipants", "desc"), limit(maxLimit));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("maxParticipants", "desc"), limit(maxLimit));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("maxParticipants", "desc"), limit(maxLimit));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by max players :: End */


export const SortEventWithLocationByUpcoming = async (maxItems) => {
    const q = query(collection(db, "events"), where("date", ">=", Timestamp.fromDate(new Date()), orderBy("date", "desc")));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const area = await GetAreaNearUser(50);
    const eventWithLocation = events.filter((event) => {
        return area.lowerLat <= event.latitude && area.greaterLat >= event.latitude && area.lowerLon <= event.longitude && area.greaterLon >= event.longitude;
    });
    /* return maxItems */
    return eventWithLocation.slice(0, maxItems);
}

export const SortEventWithLocationByPopular = async (maxItems) => {
    const q = query(collection(db, "events"), orderBy("attendees", "desc"));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const area = await GetAreaNearUser(50);
    return (events.filter((event) => {
        return area.lowerLat <= event.latitude && area.greaterLat >= event.latitude && area.lowerLon <= event.longitude && area.greaterLon >= event.longitude && event.date >= Timestamp.fromDate(new Date());
    })).slice(0, maxItems);
}

export const SortEventWithLocationByTimeStamp = async (maxItems, minPrice, MaxPrice) => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const q = query(collection(db, "events"), orderBy("timeStamp", "desc"));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const area = await GetAreaNearUser(50);
    return (events.filter((event) => {
        return area.lowerLat <= event.latitude && area.greaterLat >= event.latitude && area.lowerLon <= event.longitude && area.greaterLon >= event.longitude && event.date >= Timestamp.fromDate(new Date());
    })).slice(0, maxItems);
}


export const SortEventWithCityByUpcoming = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const returnEvents = events.sort((a, b) => {
        return b.date - a.date;
    });
    return returnEvents.filter((event) => {
        return event.date >= Timestamp.fromDate(new Date());
    }).slice(0, maxItems);
}

export const SortEventWithCityByPopular = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const returnEvents = events.sort((a, b) => {
        return b.participantCount - a.participantCount;
    });
    return returnEvents.filter((event) => {
        return event.date >= Timestamp.fromDate(new Date());
    }).slice(0, maxItems);
}

export const SortEventWithCityByTimeStamp = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const returnEvents = events.sort((a, b) => {
        return b.timeStamp - a.timeStamp;
    });
    return returnEvents.filter((event) => {
        return event.date >= Timestamp.fromDate(new Date());
    }).slice(0, maxItems);
}

export const SortEventWithCityBySponsor = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const returnEvents = events.sort((a, b) => {
        return b.timeStamp - a.timeStamp;
    });
    return returnEvents.filter((event) => {
        return event.date >= Timestamp.fromDate(new Date()) && event.sponsor === true;
    }).slice(0, maxItems);
}
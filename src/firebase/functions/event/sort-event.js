import {collection, getDocs, getFirestore, limit, orderBy, query, where} from "firebase/firestore";

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
    const events = await SortEventByUpcoming(maxItems);
    const area = await GetAreaNearUser(50);
    /* area.lowerLat >= events.latitude && area.greaterLat <= events.latitude */
    return events.filter((event) => {
        return area.lowerLat <= event.latitude && area.greaterLat >= event.latitude && area.lowerLon <= event.longitude && area.greaterLon >= event.longitude;
    } );
}

export const SortEventWithLocationByPopular = async (maxItems) => {
    const events = await SortEventByPopular(maxItems);
    const area = await GetAreaNearUser(50);
    return events.filter((event) => {
        return area.lowerLat <= event.latitude && area.greaterLat >= event.latitude && area.lowerLon <= event.longitude && area.greaterLon >= event.longitude;
    } );
}

export const SortEventWithLocationByTimeStamp = async (maxItems, minPrice, MaxPrice) => {
    const events = await SortEventByTimeStamp(maxItems, minPrice, MaxPrice);
    const area = await GetAreaNearUser(50);
    return events.filter((event) => {
        return area.lowerLat <= event.latitude && area.greaterLat >= event.latitude && area.lowerLon <= event.longitude && area.greaterLon >= event.longitude;
    } );
}


export const SortEventWithCityByUpcoming = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return events.sort((a, b) => {
        return a.date - b.date;
    }).slice(0, maxItems);
}

export const SortEventWithCityByPopular = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return events.sort((a, b) => {
        return b.participantCount - a.participantCount;
    }).slice(0, maxItems);
}

export const SortEventWithCityByTimeStamp = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return events.sort((a, b) => {
        return b.timeStamp - a.timeStamp;
    }).slice(0, maxItems);
}

export const SortEventWithCityBySponsor = async (city, maxItems) => {
    const q = query(collection(db, "events"), where("address.city", "==", city));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return events.sort((a, b) => {
        return b.sponsored - a.sponsored;
    }).slice(0, maxItems);
}
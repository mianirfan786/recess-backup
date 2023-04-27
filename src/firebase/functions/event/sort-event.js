import {collection, getDocs, getFirestore, limit, orderBy, query, Timestamp, where} from "firebase/firestore";

import app from "../../config";
import {GetAreaNearUser, GetLatitudeAndLongitudeOfDistance} from "./index";
import {toast} from "react-toastify";


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
/*export const SortEventByPopular = async (maxItems) => {
    return SortEventByUpcoming(maxItems);
}*/
/* sort event By Popularity :: End */


/* -------------------------------------- */
/* For Event Page */

/* sort event by no. of attendees :: Start */
export const SortEventByAttendees = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("attendees", "desc"));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("attendees", "desc"));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("attendees", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by no. of attendees :: End */

/* sort event by No of participants :: Start */
export const SortEventByParticipantCount = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("participantCount", "desc"));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("participantCount", "desc"));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("participantCount", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by No of participants :: End */

/* sort event by time creation :: Start */
export const SortEventByTimeStamp = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("timeStamp", "desc"));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("timeStamp", "desc"));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("timeStamp", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* sort event by time creation :: End */

/* sort event by start date :: Start */
export const SortEventByStartDate = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("date", "desc"));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("date", "desc"));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("date", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}

/* sort event by max players :: Start */
export const SortEventByMaxPlayers = async (maxLimit, minPriceLimit, maxPriceLimit) => {
    if (minPriceLimit === -1 && maxPriceLimit === -1) {
        var q = query(collection(db, "events"), orderBy("maxParticipants", "desc"));
    } else if (minPriceLimit === 0 && maxPriceLimit === 0) {
        var q = query(collection(db, "events"), where("cost", "==", 0), orderBy("maxParticipants", "desc"));
    } else {
        var q = query(collection(db, "events"), where("cost", ">=", minPriceLimit), where("cost", "<=", maxPriceLimit), orderBy("maxParticipants", "desc"));
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

export const filterEventsByTags = async ( maxItems, tags) => {
    let q = query(collection(db, "events"), where("keywords", "in", tags));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    const returnEvents = events.sort((a, b) => {
        return b.timeStamp - a.timeStamp;
    });
    return returnEvents.filter((event) => {
        return event.date >= Timestamp.fromDate(new Date())
    });
}


export const GetExploreEvents = async (maxItems, filters, location, tags) => {
    const showToast = toast("Getting Events", {type: "info", autoClose: 1500});
    let events = await SortEventByStartDate(maxItems, -1, -1);
    let lowerPrice = -1;
    let higherPrice = -1;
    if ((filters !== null)) {
        try{
            switch (filters.selectedSortOption.name) {
                case "No of Attendees":
                    events = await SortEventByAttendees(maxItems, lowerPrice, higherPrice);
                    break;
                case "No of Registered":
                    events = await SortEventByParticipantCount(maxItems, lowerPrice, higherPrice);
                    break;
                case "Date Created":
                    events = await SortEventByTimeStamp(maxItems, lowerPrice, higherPrice);
                    break;
                case "Start Date":
                    events = await SortEventByStartDate(maxItems, lowerPrice, higherPrice);
                    break;
                case "Max No of Players":
                    events = await SortEventByMaxPlayers(maxItems, lowerPrice, higherPrice);
                    break;
                default:
                    events = await SortEventByStartDate(maxItems, lowerPrice, higherPrice);
                    break;
            }
        } catch (e) {
            console.log("error");
        }
        if (filters.sponsoredListings) {
            events = events.filter((event) => {
                return event.sponsored === true;
            })
        }
        if (filters.priceRange === 0) {
            lowerPrice = 0;
            higherPrice = 0;
        } else if (filters.priceRange === 1) {
            lowerPrice = 1;
            higherPrice = 5;
        } else if (filters.priceRange === 2) {
            lowerPrice = 6;
            higherPrice = 15;
        } else if (filters.priceRange === 3) {
            lowerPrice = 16;
            higherPrice = 1000;
        }
    } else if(tags.length) {
        try{
            events = await filterEventsByTags(10, tags);
        }
        catch(e){
            console.log(e);
        }
       

    }
    else {
        events = await SortEventByStartDate(maxItems, lowerPrice, higherPrice);

    }

    events = events.filter((event) => {
        return event.date >= Timestamp.fromDate(new Date()) && event.address.city === location;
    });

    if (lowerPrice !== -1 && higherPrice !== -1) {
        events = events.filter((event) => {
            return event.cost >= lowerPrice && event.cost <= higherPrice;
        })
    }
    // toast.dismiss(showToast);
    return events;
}


export const GetExploreEventsFromUserLocation = async (maxItems, filters, lat, lng,tags) => {
    const area = await GetLatitudeAndLongitudeOfDistance(lat, lng, 50);
    const showToast = toast("Getting Events", {type: "info", autoClose: 1500});
    let events= await SortEventByStartDate(maxItems, -1, -1);
    let lowerPrice = -1;
    let higherPrice = -1;
    if ((filters !== null)) {
        try{
            switch (filters.selectedSortOption.name) {
                case "No of Attendees":
                    events = await SortEventByAttendees(maxItems, lowerPrice, higherPrice);
                    break;
                case "No of Registered":
                    events = await SortEventByParticipantCount(maxItems, lowerPrice, higherPrice);
                    break;
                case "Date Created":
                    events = await SortEventByTimeStamp(maxItems, lowerPrice, higherPrice);
                    break;
                case "Start Date":
                    events = await SortEventByStartDate(maxItems, lowerPrice, higherPrice);
                    break;
                case "Max No of Players":
                    events = await SortEventByMaxPlayers(maxItems, lowerPrice, higherPrice);
                    break;
            }
        } catch (e) {
            console.log("error");
        }
        if (filters.sponsoredListings) {
            events = events.filter((event) => {
                return event.sponsored === true;
            })
        }
        if (filters.priceRange === 0) {
            lowerPrice = 0;
            higherPrice = 0;
        } else if (filters.priceRange === 1) {
            lowerPrice = 1;
            higherPrice = 5;
        } else if (filters.priceRange === 2) {
            lowerPrice = 6;
            higherPrice = 15;
        } else if (filters.priceRange === 3) {
            lowerPrice = 16;
            higherPrice = 1000;
        }
    } 
    else if(tags.length) {
        try{
            events = await filterEventsByTags(10, tags);
        }
        catch(e){
            console.log(e);
        }
       

    } else {
        events = await SortEventByStartDate(maxItems, lowerPrice, higherPrice);
    }

    events = events.filter((event) => {
        return event.date >= Timestamp.fromDate(new Date()) && area.lowerLat <= event.latitude && area.greaterLat >= event.latitude && area.lowerLon <= event.longitude && area.greaterLon >= event.longitude
    });

    if (lowerPrice !== -1 && higherPrice !== -1) {
        events = events.filter((event) => {
            return event.cost >= lowerPrice && event.cost <= higherPrice;
        })
    }
    // toast.dismiss(showToast);
    return events;
}
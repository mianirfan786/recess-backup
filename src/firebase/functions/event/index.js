import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    query,
    setDoc,
    Timestamp,
    where
} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

import app from "../../config";
import {getCurrentUser} from "../user";
import {calculateRGB} from "../../../utils/getAverageRGB";

import store from "../../../store/store";


/* Basic Variables */
const storage = getStorage();
const db = getFirestore(app);
let currentUser = null;
// getCurrentUser();

/* add event :: Start */
export const addEvent = async (event) =>{
    debugger
    const eventId = Math.random().toString(36).substring(2);
    currentUser = await getCurrentUser();
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgSrc = e.target.result;
        calculateRGB(imgSrc).then(async (rgb) => {
            event = {...event, bgColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`}

            // Upload each photo to Firebase Storage With Random Name
            const photoUrls = await Promise.all(
                event.photos.map(async (photo) => {
                    const photoRef = ref(storage, `photos/${Math.random().toString(36).substring(2)}`);
                    await uploadBytes(photoRef, photo);
                    return await getDownloadURL(photoRef);
                })
            );
            
            debugger
            // Add photo URLs to the event object
            const eventWithPhotos = {...event, photos: photoUrls};
                
            // Add Event to Firebase with Timestamp and CreatedBy
            const res = await setDoc(doc(db, "events", eventId), {
                ...eventWithPhotos,
                timeStamp: Timestamp.fromDate(new Date()),
                CreatedBy: currentUser,
                date: Timestamp.fromDate(new Date(event.date)),
                joined: [currentUser],
                attendees: 1,
                participantCount: 1,
                latitude: event.address.latitude,
                longitude: event.address.longitude,
                comments: [],
            });
            debugger
            /* after Doc is set */
        })
    };
    reader.readAsDataURL(event.photos[0]);
    return eventId;
}
/* add event :: End */

/* view event by id :: Start */
export const ViewEventById = async (id) => {
    debugger
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    debugger
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}
/* view event by id :: End */

/* view event created by user :: Start */
export const ViewEventCreatedByUser = async (CreatedBy, maxItems) => {
    try {
        // Get a reference to the Firestore collection that contains the events
        const eventsRef = collection(db, 'events');

        // Query the collection to get events that were created by the specified user
        const q = query(eventsRef, where('CreatedBy', '==', CreatedBy), limit(maxItems));

        // Map the query snapshot to an array of event objects
        // Return the array of event objects
        const querySnapshot = await getDocs(q);
        const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        /* sort events by date */
        return events.sort((a, b) => {
            return b.date.seconds - a.date.seconds;
        });
    } catch (error) {
        console.log("error");
        // Return an empty array or throw an error, depending on your use case
        return [];
    }
};
/* view event created by user :: End */

/* view event created by current loggedIn user :: Start */
export const ViewEventsCreatedByMe = async (maxLimit) => {
    currentUser = await getCurrentUser();
    return ViewEventCreatedByUser(currentUser, maxLimit);
}
/* view event created by current loggedIn user :: End */


export const GetLatitudeAndLongitudeOfDistance = async (latitude, longitude, distance) => {
    let lat = 0.0144927536231884
    let lon = 0.0181818181818182

    let lowerLat = latitude - (lat * distance)
    let lowerLon = longitude - (lon * distance)

    let greaterLat = latitude + (lat * distance)
    let greaterLon = longitude + (lon * distance)

    return {lowerLat, lowerLon, greaterLat, greaterLon}
}

// const GetUserLocation = async () => {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             resolve(position);
//             /* console it */
//             return {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude
//             }
//         }, function (error) {
//             reject(error);
//         });
//     });
// }

export const GetAreaNearUser = async (distance) => {
    const {LocationReducer:{location}} = store.getState()
    // const userLocation = await GetUserLocation();
    return GetLatitudeAndLongitudeOfDistance(location.latitude, location.longitude, distance);
}

export const getUserLocationCity = async () => {
    try {
        const {LocationReducer:{location}} = store.getState()
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=locality&key=${"AIzaSyDAXr7GY62OB8KITsDM33BNEdYq7Z6f8aA"}`);
        const data = await response.json();
        if (data.results.length > 0) {
            return data.results[0].formatted_address;
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const GetKeywordsFromAllEvents = async () => {
    const eventsCol = collection(db, "events");  // Get a reference to the "events" collection.
    const eventDocs = await getDocs(eventsCol);  // Retrieve all documents in the "events" collection.
    return eventDocs.docs.map((doc) => doc.data().keywords);   // Return an array of the data objects for each document.
}

export const FlagEvent = async (eventId, content) => {
    const docRef = doc(db, "events", eventId);
    /* add new collection flag */
    const flagRef = collection(db, "events", eventId, "flags");
    currentUser = await getCurrentUser();
    const flagDoc = await addDoc(flagRef, {
        reason: content,
        timeStamp: Timestamp.fromDate(new Date()),
        createdBy: currentUser
    });
    return flagDoc.id;
}


export const checkIfEventIsFlaggedByCurrentUser = async (eventId) => {
    const docRef = collection(db, "events", eventId, "flags");
    currentUser = await getCurrentUser();
    const q = query(docRef, where("createdBy", "==", currentUser));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return events.length > 0;
}
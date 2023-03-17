import {collection, doc, getDoc, getDocs, getFirestore, limit, query, setDoc, where} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

import app from "../../config";
import {getCurrentUser} from "../user";
import {calculateRGB} from "../../../utils/getAverageRGB";


/* Basic Variables */
const storage = getStorage();
const db = getFirestore(app);
let currentUser = null;
getCurrentUser();

/* add event :: Start */
export const addEvent = async (event) => {

    // Read the first photo from the event object
    currentUser = await getCurrentUser();
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgSrc = e.target.result;
        calculateRGB(imgSrc).then(async (rgb) => {
            event = {...event, bgColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`}

            // Upload each photo to Firebase Storage With Random Name
            const photoUrls = await Promise.all(
                event.photos.map(async (photo) => {
                    console.log(photo.path);
                    const photoRef = ref(storage, `photos/${Math.random().toString(36).substring(2)}`);
                    await uploadBytes(photoRef, photo);
                    return await getDownloadURL(photoRef);
                })
            );

            // Add photo URLs to the event object
            const eventWithPhotos = {...event, photos: photoUrls};

            // Add Event to Firebase with Timestamp and CreatedBy
            const res = await setDoc(doc(db, "events", Math.random().toString(36).substring(2)), {
                ...eventWithPhotos,
                timeStamp: Date.now(),
                CreatedBy: currentUser,
                joined: [currentUser],
                attendees: 1,
                participantCount: 1,
                comments: [],
            });
            /* after Doc is set */
            console.log(res);
        })
    };
    reader.readAsDataURL(event.photos[0]);
}
/* add event :: End */

/* view event by id :: Start */
export const ViewEventById = async (id) => {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
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
        return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    } catch (error) {
        console.log('Error retrieving events: ', error);
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


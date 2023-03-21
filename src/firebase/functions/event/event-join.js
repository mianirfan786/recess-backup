import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

import app from "../../config";
import {getCurrentUser} from "../user";

const db = getFirestore(app);

let currentUser = null;
getCurrentUser();

/* join event :: Start */
export const JoinEventById = async (id, noOfAttendees) => {

    currentUser = await getCurrentUser();
    const eventRef = doc(db, "events", id);
    const event = await getDoc(eventRef);
    if (event.exists) {
        const data = event.data();
        if (event.data().joined === undefined) {
            return updateDoc(eventRef, {
                joined: [currentUser]
            })
        }
        if (event.data().joined.includes(currentUser)) {
            return;
        }
        return await updateDoc(eventRef, {
            joined: [...data.joined, currentUser],
            attendees: data.attendees + noOfAttendees,
            participantCount: data.participantCount + 1
        })
    }
}
/* join event :: End */

export const HasUserJoinedEvent = async (id) => {
    currentUser = await getCurrentUser();
    const eventRef = doc(db, "events", id);
    const event = await getDoc(eventRef);
    if (event.exists) {
        const data = event.data();
        if (data.joined !== undefined)
            return data.joined.includes(currentUser);
        else
            return false;
    }
    return false;
}
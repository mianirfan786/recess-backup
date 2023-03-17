import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

import app from "../../config";
import {getCurrentUser} from "../user";

const db = getFirestore(app);

let currentUser = null;
getCurrentUser();

/* join event :: Start */
export const JoinEventById = async (id) => {
    currentUser = await getCurrentUser();
    const eventRef = doc(db, "events", id);
    const event = await getDoc(eventRef);
    if (event.exists) {
        const data = event.data();
        if (event.joined === undefined) {
            return updateDoc(eventRef, {
                joined: [currentUser]
            })
        }
        if (event.joined.includes(currentUser)) {
            return;
        }
        return await eventRef.update({
            joined: [...data.joined, currentUser]
        });
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
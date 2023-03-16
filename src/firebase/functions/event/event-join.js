import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

import app from "../../config";
import {getCurrentUser} from "../user";

const db = getFirestore(app);

const currentUser = getCurrentUser();

/* join event :: Start */
export const JoinEventById = async (id) => {
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
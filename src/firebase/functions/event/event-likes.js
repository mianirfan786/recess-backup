import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

import {getCurrentUser} from "../user";
import app from "../../config";

const currentUser = getCurrentUser()
const db = getFirestore(app);

/* is event liked by the user :: Start */
export const IsEventLikedByUser = async (id) => {
    const eventRef = doc(db, "events", id);
    const event = await getDoc(eventRef);
    if (event.exists) {
        const data = event.data();
        if (data.likes !== undefined)
            return data.likes.includes(currentUser);
        else
            return false;
    }
    return false;
}
/* is event liked by the user :: End */

/* like the event :: Start */
export const LikeEventById = async (id) => {
    const eventRef = doc(db, "events", id);
    const event = await getDoc(eventRef);
    if (event.exists) {
        const data = event.data();
        if (event.likes === undefined) {
            return updateDoc(eventRef, {
                likes: [currentUser]
            })
        }
        if (event.likes.includes(currentUser)) {
            return;
        }
        return await eventRef.update({
            likes: [...data.likes, currentUser]
        });
    }
}
/* like the event :: End */

/* dislike the event :: Start */
export const DislikeEventById = async (id) => {
    const eventRef = doc(db, "events", id);
    const event = await getDoc(eventRef);
    console.log("disliked");
    if (event.exists) {
        const data = event.data();
        if (event.likes === undefined) {
            return;
        }
        if (!event.likes.includes(currentUser)) {
            return;
        }
        return await updateDoc(eventRef, {
            likes: data.likes.filter((item) => item !== currentUser)
        })
    }
}
/* dislike the event :: End */



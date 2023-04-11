import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

import app from "../config";

const storage = getStorage();


const db = getFirestore(app);

/* export add event */
export const addEvent = async (event) => {
    console.log("addEvent", event);

    // Upload each photo to Firebase Storage
    const photoUrls = await Promise.all(
        event.photos.map(async (photo) => {
            const photoRef = ref(storage, `photos/${Math.random().toString(36).substring(2)}`);
            await uploadBytes(photoRef, photo);
            const photoUrl = await getDownloadURL(photoRef);
            return photoUrl;
        })
    );

    // Add photo URLs to the event object
    const eventWithPhotos = { ...event, photos: photoUrls };

    await setDoc(doc(db, "events", Math.random().toString(36).substring(2)), eventWithPhotos);
}


export const ViewEventById = async (id) => {
    const docRef = doc(db, "events", id.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

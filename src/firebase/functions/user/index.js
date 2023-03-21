import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

import app from "../../config";
import {getAuth, deleteUser} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage();

let currentUser = null;

export const auth = getAuth(app);

getAuth().onAuthStateChanged(function (user) {
    if (user) {
        currentUser = user.uid;
    }
});

export const getCurrentUser = () => {
    return currentUser;
}

export const GetUsersByIds = async (ids) => {
    const users = [];
    for (let i = 0; i < ids.length; i++) {
        const user = await GetUsersById(ids[i]);
        users.push(user);
    }
    return users;
}

export const GetUsersById = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export const GetCurrentUserDetails = async () => {
    currentUser = await getCurrentUser();
    return GetUsersById(currentUser);
}


export const DeleteUserById = async (id) => {
    currentUser = await getCurrentUser();
    deleteUser(currentUser).then(() => {
        console.log("User Deleted")
    }).catch((error) => {
        console.log(error)
    });
}


/* update user photo and name :: Start */
export const UpdateUserPhotoAndNameById = async (id, user) => {
    // Upload each photo to Firebase Storage With Random Name
    const photoUrls = await Promise.all(
        user.photos.map(async (photo) => {
            console.log(photo.path);
            const photoRef = ref(storage, `photos/${Math.random().toString(36).substring(2)}`);
            await uploadBytes(photoRef, photo);
            return await getDownloadURL(photoRef);
        })
    );

    // Add photo URLs to the event object
    const userWithPhotos = {...user, photos: photoUrls};

    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return await updateDoc(docRef, userWithPhotos);
    } else {
        return null;
    }
}
/* update user photo and name :: End */

export const AddKeywordInUser = async (keyword) => {
    const currentUser = await getCurrentUser();
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const currentKeywords = docSnap.data().keywords || []; // Get the current keywords array or initialize to empty array.
        const updatedKeywords = [...new Set([...currentKeywords, keyword])]; // Create a new array with the existing keywords and the new keyword, removing any duplicates.
        return await updateDoc(docRef, {
            keywords: updatedKeywords
        });
    }
}

export const GetAllKeywordsFromUser = async () => {
    const currentUser = await getCurrentUser();
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().keywords;
    }
}
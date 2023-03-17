import {doc, getDoc, getFirestore} from "firebase/firestore";

import app from "../../config";
import {getAuth} from "firebase/auth";

const db = getFirestore(app);
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
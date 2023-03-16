import {getFirestore} from "firebase/firestore";

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
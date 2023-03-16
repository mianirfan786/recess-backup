import {collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, where, updateDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

import app from "../config";
import {getAuth} from "firebase/auth";

const storage = getStorage();
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
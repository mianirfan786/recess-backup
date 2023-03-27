import {deleteDoc, doc, getDoc, getFirestore, updateDoc,} from "firebase/firestore";

import app from "../../config";
import {deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword, signInWithPhoneNumber, RecaptchaVerifier} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {toast} from "react-toastify";


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


export const DeleteUserById = async (password) => {
    const currentUser = await getCurrentUser();
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
        user.email,
        password
    );
    try {
        const result = await reauthenticateWithCredential(user, credential);
        if (result === null || result === undefined) {
            toast("Password is incorrect", {type: "error"})
            return;
        }
        await deleteUser(user);
        await deleteDoc(doc(db, "users", currentUser));
    } catch(error) {
        console.log(error);
    }
}

export const ResetPersonalPassword = async (password, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
        const credential = EmailAuthProvider.credential(
            user.email,
            password
        );
        const result = await reauthenticateWithCredential(user, credential);
        if (result === null || result === undefined) {
            toast("Password is incorrect", {type: "error"})
            return;
        }
        updatePassword(user, newPassword).then(() => {
            toast("Password updated successfully", {type: "success"})
        }).catch((error) => {
            console.log(error);
        });

    } catch {
    }

}

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

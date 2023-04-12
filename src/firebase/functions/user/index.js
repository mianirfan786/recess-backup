import {deleteDoc, doc, getDoc, getFirestore, updateDoc,} from "firebase/firestore";

import app from "../../config";
import {deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword, signInWithPhoneNumber, RecaptchaVerifier} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {toast} from "react-toastify";
import {GOOGLE_MAPS_API_KEY} from "../../../components/GoogleAutocomplete";


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
    console.log(currentUser);
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


export const updateUserLocation = async () =>{
    /* get user location */
    let lat = 0;
    let lng = 0;
    let city = "";
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;

            /* get city from Google Maps API */
            const apiKey = GOOGLE_MAPS_API_KEY; // Replace with your Google Maps API key
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === "OK") {
                    const results = data.results;
                    const cityResult = results.find((result) =>
                        result.types.includes("locality")
                    );
                    if (cityResult) {
                        city = cityResult.address_components[0].long_name;
                    } else {
                        console.log("No city information found.");
                    }
                } else {
                    console.log("Error fetching city information:", data.status);
                }
            } catch (error) {
                console.log("Error fetching city information:", error.message);
            }
        },
        (error) => {
            console.log("Error fetching user location:", error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const currentUser = await getCurrentUser();
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return await updateDoc(docRef, {
            location: {
                lat: lat,
                lng: lng,
                city: city
            }
        });
    }
}
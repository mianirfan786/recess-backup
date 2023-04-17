import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    OAuthProvider,
    signInWithPopup,
    signOut,
    updateEmail,
    updateProfile,
} from "firebase/auth";
import {doc, updateDoc} from "firebase/firestore";
import {auth, db} from "./config";

import {remove} from "lodash";
import {showToast} from "../utils/toast";

export default class FirebaseAuth {
    static logInWithEmailAndPassword(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    static googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    static facebookSignIn() {
        const facebookAuthProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookAuthProvider);
    }

    static appleSignIn() {
        const appleAuthProvider = new OAuthProvider();
        return signInWithPopup(auth, appleAuthProvider);
    }

    static passwordReset(email) {
        return sendPasswordResetEmail(auth, email);
    }

    static signUpWithEmailAndPassword(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    static async updateName(user, name) {
        const n = await updateProfile(user, {displayName: name});
        this.updateUserDoc(auth.currentUser);

        return n;
    }

    static async updateEmail(user, email) {
        try {
            await updateEmail(user, email);
            this.updateUserDoc(auth.currentUser);
            return true;
        } catch (error) {
            if ("message" in error) {
                if (error.code === "auth/requires-recent-login") {
                    showToast({
                        type: "error",
                        message: "Please logout and login again to change your email.",
                    });
                } else {
                    showToast({
                        type: "error",
                        message: error.message.replace("Firebase: ", ""),
                    });
                }
            } else {
                showToast({type: "error", message: error});
            }
            return false;
        }
    }

    static updatePhoto(user, url) {
        updateDoc(doc(db, "users", user.uid), {
            photoURL: url,
        });
        return updateProfile(user, {photoURL: url});
    }

    static logOut() {
        return signOut(auth);
    }

    static async updateUserDoc() {
        const user = auth.currentUser;

        if (!user) return;

        const searchVal = [];

        function _replace(val) {
            return val
                .toLowerCase()
                .replaceAll("-", " ")
                .replaceAll("(", "")
                .replaceAll(")", "")
                .replaceAll("?", "")
                .replaceAll("/", " ")
                .replaceAll("  ", " ");
        }

        searchVal.push(
            ..._replace(user.displayName).split(" "),
            user.email.split("@")[0],
            user.email
        );

        remove(searchVal, (val) => val === "");

        updateDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            search: searchVal,
            notificationControls: {
                new: true,
                join: true,
                reminder: true,
            }
        });
    }
}

import {getMessaging, getToken} from "firebase/messaging";
import app from "../../config";
import {getCurrentUser} from "../user";
import {collection, doc, getDoc, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import axios from "axios";

export const messaging = getMessaging(app);
let currentUser = null;
const db = getFirestore(app);

const url = "https://us-central1-recessmobile-d2ab0.cloudfunctions.net/send_notification"

export const setUserToken = async () => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            getToken(messaging, {
                vapidKey: "BCUDnw1dZZ75la9Hll0KqIErbvCKMwSmQFcWgotMe-YzpemW-ZUIzPunDbXJKv0NnqBc4SxpGHUxZ-7Ip6lMRMk"
            }).then((currentToken) => {
                updateUserToken(currentToken);
            }).catch((err) => {
                console.log("error");
            })
        } else {
            console.log("No permission to send notifications");
        }
    })
}


export const updateUserToken = async (token) => {
    currentUser = await getCurrentUser();
    if (currentUser) {
        const userRef = doc(db, "users", currentUser);
        const userDoc = await getDoc(userRef);
        const user = userDoc.data();
        if (!user.controls) {
            try {
                const res = await updateDoc(userRef, {
                    notificationControls: {
                        new: true,
                        join: true,
                        reminder: true,
                    },
                })
            } catch {
                console.log("error");
            }
        }
        const res = await updateDoc(userRef, {
            token: token,
        })
        if (res) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


export const sendNewEventNotification = async (event) => {
    const eventCity = event.address.city;
    const users = [];

    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);


    usersSnapshot.forEach((doc) => {
        const user = doc.data();
        try {
            const userCity = user.location?.city;
            if (userCity === eventCity) {
                users.push(user);
            }
        } catch {
            console.log("error");
        }

    });

    for (const user of users) {
        sendEventScheduleNotification(event, user).then((res) => {
        }).catch((err) => {
            console.log("error");
        });
        if (user.notificationControls.new-event === true) {
            const userToken = user.token;
            const data = {
                to: userToken,
                notification: {
                    title: `New Event - ${event.title}`,
                    body: "There is a new event near you",
                    priority: "high",
                    link: `${window.location.origin}/event/${event.id}`,
                    sound: "default",
                },
                data: {
                    id: user.uid,
                    link: `${window.location.origin}/event/${event.id}`,
                    type: "new-event",
                }
            }
            const headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post(url, JSON.stringify(data), {headers: headers});
        }
    }
};

export const sendEventJoinNotification = async (title, eventId, creatorId) => {
    const user = await getCurrentUser();
    const receiverRef = await getDoc(doc(db, "users", user));
    const receiverUser = receiverRef.data();
    const eventCreatedBy = creatorId;
    const userRef = doc(db, "users", eventCreatedBy);
    const userDoc = await getDoc(userRef);
    const userToken = userDoc.data().token;
    if (userDoc.data().notificationControls.join === true) {
        const data = {
            to: userToken,
            notification: {
                title: `${receiverUser.displayName} joined ${title}`,
                body: `joined your event`,
                priority: "high",
                link: `${window.location.origin}/event/${eventId}`,
                sound: "default",
            },
            data: {
                id: userDoc.data().uid,
                link: `${window.location.origin}/event/${eventId}`,
                type: "join",
            }
        }
        /* axios use headers content-type=text/plain */
        const headers = {
            'Content-Type': 'text/plain'
        }
        const res = await axios.post(url, JSON.stringify(data), {headers: headers});
    }
}

export const sendEventScheduleNotification = async (event, user) => {
    if (user.notificationControls.reminder === true) {
        const userToken = user.token;
        const data = {
            to: userToken,
            notification: {
                title: `${event.title} - Starting In 1 Hour`,
                body: "Event Starting In 1 Hour",
                priority: "high",
                link: `${window.location.origin}/event/${event.id}`,
                sound: "default",
            },
            data: {
                id: user.uid,
                link: `${window.location.origin}/event/${event.id}`,
                type: "new-event",
                isScheduled: true,
                scheduledTime: event.date - 3600000
            }
        }
        const headers = {
            'Content-Type': 'text/plain'
        }
        const res = await axios.post(url, JSON.stringify(data), {headers: headers});
    }
}


export const getNotificationControls = async () => {
    currentUser = await getCurrentUser();
    if (currentUser) {
        const userRef = doc(db, "users", currentUser);
        const userDoc = await getDoc(userRef);
        const user = userDoc.data();
        return user.notificationControls;
    } else {
        return false;
    }
}

export const updateNotificationControls = async (controls) => {
    currentUser = await getCurrentUser();
    if (currentUser) {
        const userRef = doc(db, "users", currentUser);
        const userDoc = await getDoc(userRef);
        const res = await updateDoc(userRef, {
            notificationControls: controls,
        })
        if (res) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
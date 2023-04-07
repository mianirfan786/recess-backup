import {getCurrentUser} from "../user";
import {db} from "../../config";
import {collection, getDocs} from "firebase/firestore";


let notifications = []
let currentUser = null
export const getAllNotifications = async () => {
    currentUser = await getCurrentUser()
    notifications = []
    const notificationsRef = collection(db, 'users', currentUser, 'notifications');
    const notificationsSnapshot = await getDocs(notificationsRef);
    notificationsSnapshot.forEach((doc) => {
        /* add notification id also */
        const notification = ({id: doc.id, time: new Date(doc.data().timeStamp.seconds * 1000), ...doc.data()})
        notifications.push(notification)
    })
}

export const returnJoinedNotifications = () => {
    return (notifications.filter((notification) => {
        return notification.type === "join"
    })).sort((a, b) => {
        return b.time - a.time
    })
}
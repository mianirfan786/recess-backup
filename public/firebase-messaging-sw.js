importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-auth-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore-compat.js")

const firebaseConfig = {
    apiKey: "AIzaSyC472iJYq1Xf8h6_X7uZRP-a0UsrcujGC0",
    authDomain: "recessmobile-d2ab0.firebaseapp.com",
    projectId: "recessmobile-d2ab0",
    storageBucket: "recessmobile-d2ab0.appspot.com",
    messagingSenderId: "1033527257692",
    appId: "1:1033527257692:web:bab9c85df9f9f9c6c29499",
    measurementId: "G-NJN21E53N5"
};


firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    const user = payload.data.id
    const notification = {
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        title: payload.notification.title,
        body: payload.notification.body,
        type: payload.data.type || "update",
        link: payload.data.link || null,
    }
    console.log("Received background message ", payload)
    /* add to sub collection notification in users collection */
    const docCollection = firebase.firestore().collection("users").doc(user).collection("notifications")
    docCollection.add(notification)
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }
    self.registration.showNotification(notificationTitle, notificationOptions)
})
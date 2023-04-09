import {messaging, updateUserToken} from './firebase/functions/messaging';
import {getToken} from "firebase/messaging";

export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;

            navigator.serviceWorker
                .register(swUrl)
                .then((registration) => {
                    getToken(messaging,{ vapidKey: 'BCUDnw1dZZ75la9Hll0KqIErbvCKMwSmQFcWgotMe-YzpemW-ZUIzPunDbXJKv0NnqBc4SxpGHUxZ-7Ip6lMRMk' })
                        .then((currentToken) => {
                            if (currentToken) {
                                updateUserToken(currentToken);
                            } else {
                                console.log('No FCM token available. Request permission to generate one.');
                            }
                        })
                        .catch((err) => {
                            console.log('An error occurred while retrieving the FCM token. ', err);
                        });
                })
                .catch((registrationError) => {
                    console.log('Service Worker registration failed: ', registrationError);
                });
        });
    }
}

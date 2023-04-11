import {getCurrentUser} from "../user";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../../config";
import {Timestamp} from "firebase/firestore";


/* eventId, timeStamp, cost, transactionId */

export const saveTransaction = async (data) => {
    const user = await getCurrentUser()
    if (user) {
        const userRef = collection(db, 'users', user, 'transactions')
        /* add timeStamp to data timeStamp: Timestamp.fromDate(new Date()), */
        data.timeStamp = Timestamp.fromDate(new Date())
        addDoc(userRef, data)
    }
}

export const getAllTransactions = async () => {
    const user = await getCurrentUser()
    if (user) {
        const userRef = collection(db, 'users', user, 'transactions')
        const querySnapshot = await getDocs(userRef)
        if (!querySnapshot.empty) {
            return (querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))).sort((a, b) => b.timeStamp - a.timeStamp)
        } else {
            return null
        }
    }
}
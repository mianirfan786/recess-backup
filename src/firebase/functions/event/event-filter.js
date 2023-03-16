import {collection, getDocs, getFirestore, limit, orderBy, query, where} from "firebase/firestore";

import app from "../../config";

const db = getFirestore(app);


/* filter event by start date :: Start */
export const FilterEventByStartDate = async (startDate, maxLimit) => {
    const q = query(collection(db, "events"), where("date", "==", startDate), orderBy("date", "desc"), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* filter event by start date :: End */


/* filter event by event date creation :: Start */
export const FilterEventByTimeStamp = async (date, maxLimit) => {
    const q = query(collection(db, "events"), where("timeStamp", "==", date), orderBy("date", "desc"), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
/* filter event by event date creation :: End */
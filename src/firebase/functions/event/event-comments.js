import {addDoc, collection, doc, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import app from "../../config";
import {getCurrentUser} from "../user";


const db = getFirestore(app);
let currentUser = null;
getCurrentUser();

export const AddCommentInEventById = async (eventId, text) => {
    currentUser = await getCurrentUser();
    const eventRef = doc(db, "events", eventId);
    const commentsCollectionRef = collection(eventRef, "comments");

    const newComment = {
        userId: currentUser,
        text: text,
        replies: [],
        timeStamp: Date.now(),
    };

    await addDoc(commentsCollectionRef, newComment);

};

export const AddReplyInCommentById = async (eventId, commentId, text) => {
    currentUser = await getCurrentUser();
    const eventRef = doc(db, "events", eventId);
    const commentRef = doc(eventRef, "comments", commentId);

    const newReply = {
        userId: currentUser,
        text: text,
        timeStamp: Date.now(),
    }

    await updateDoc(commentRef, {
        replies: [...commentRef.replies, newReply]
    });
}

export const GetAllCommentsInEventById = async (eventId) => {

    const eventRef = doc(db, "events", eventId);
    const commentsCollectionRef = collection(eventRef, "comments");
    const commentsQuerySnapshot = await getDocs(commentsCollectionRef);
    if (!commentsQuerySnapshot.empty) {
        return commentsQuerySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    } else {

        return null;
    }
}
import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";
import app from "../../config";



const db = getFirestore(app);

const AddCommentInEventById = async (eventId, commenter, commentText) => {
    const postRef = doc(db, "events", eventId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
        const comments = postSnap.data().comments;
        const newComment = {
            commenter: commenter,
            text: commentText,
            replies: [],
        };
        comments.push(newComment);
        await updateDoc(postRef, { comments: comments });
        console.log("Comment added to event: ", eventId);
    } else {
        console.log("Post not found");
    }
};


const AddReplyToCommentInEvent = async (eventId, commentIndex, replier, replyText) => {
    const postRef = doc(db, "events", eventId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
        const comments = postSnap.data().comments;
        const replies = comments[commentIndex].replies;
        const newReply = {
            replier: replier,
            text: replyText,
        };
        replies.push(newReply);
        await updateDoc(postRef, { comments: comments });
        console.log("Reply added to comment ", commentIndex, " in events ", eventId);
    } else {
        console.log("Post not found");
    }
};


const getCommentsByEventId = async (eventId) => {
    const postRef = doc(db, "events", eventId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
        const comments = postSnap.data().comments;
        return comments;
    } else {
        console.log("Post not found");
        return null;
    }
};

const GetRepilesByCommentInEvent = async (eventId, commentIndex) => {
    const postRef = doc(db, "events", eventId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
        const comments = postSnap.data().comments;
        const replies = comments[commentIndex].replies;
        return replies;
    } else {
        console.log("Post not found");
        return null;
    }
};
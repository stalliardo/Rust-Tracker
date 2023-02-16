import { db } from '../../firebase';
import { getDocs, collection, query, where, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';

export const checkInvitations = async (recipientId) => {
    const q = query(collection(db, "invitations"), where("recipientId", "==", recipientId));
    const querySnapshot = await getDocs(q);
    const data = [];

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {

            if (doc.data().status === "Pending") data.push({ ...doc.data(), id: doc.id });
        })
    }
    return data;
}

export const acceptInvite = async (data) => {
    const inviteRef = doc(db, "invitations", data.inviteId);
    const promises = [];

    const acceptInvitePromise = await updateDoc(inviteRef, {
        status: "Accepted"
    });

    const userRef = doc(db, "users", data.userId);

    const addGangIdToDocPromise = await updateDoc(userRef, {
        gangId: data.gangId
    });

    return Promise.all(promises);
}

export const declineInvite = async (inviteId) => {
    const inviteRef = doc(db, "invitations", inviteId);

    return await updateDoc(inviteRef, {
        status: "Declined"
    });
}

export const addNotification = async (userId, notificationData) => {
    const notificationRef = collection(db, "users", userId, "notifications");
    const { playerName, serverName, alertType } = notificationData;

    return addDoc(notificationRef, {
        playerName,
        serverName,
        alertType,
        createdAt: new Date()
    });
}

export const getAlertNotifications = async (userId) => {
    const snapshot = await getDocs(collection(db, "users", userId, "notifications"));
    const data = [];

    if (!snapshot.empty) {
        snapshot.forEach((snap) => {
            data.push({ ...snap.data(), id: snap.id, createdAt: snap.data().createdAt.toDate().toString() });
        })
    }

    return data;
}
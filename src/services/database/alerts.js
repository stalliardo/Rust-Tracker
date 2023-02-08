import { db } from '../../firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const createAlert = (userId, playerName, playerId, serverName, serverId, alertType, notificationType) => {
    return addDoc(collection(db, "alerts"), {
        userId,
        playerName,
        playerId,
        serverName,
        serverId,
        alertType,
        notificationType
    });
}

export const getAlerts = async (userId) => {
    // query for all where userId is equal to arg
    const q = query(collection(db, "alerts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const data = [];

    querySnapshot.forEach((snapshot) => {
        console.log("snapshot = ", snapshot.data());
        data.push({...snapshot.data(), id: snapshot.id});
    });

    return data;
}
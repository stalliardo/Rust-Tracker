import { db } from '../../firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const createAlert = (playerName, playerId, serverName, serverId, alertType, notificationType) => {
    return addDoc(collection(db, "alerts"), {
        playerName,
        playerId,
        serverName,
        serverId,
        alertType,
        notificationType
    });
}
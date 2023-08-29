import { db } from '../../firebase';

import { doc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

export const createAlert = async (data) => {

    const q1 = query(collection(db, "alerts"), where("playerId", "==", data.playerId), where("serverId", "==", data.serverId));
    const queryResult = await getDocs(q1);

    if(queryResult.empty){
        const result = await addDoc(collection(db, "alerts"), {
            ...data,
            isOnline: true
        });

        return {...data, id: result.id};
    } else {
        throw Error("Error: Duplicate alert!");
    }
}

export const getAlerts = async (userId) => {
    const q = query(collection(db, "alerts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const data = [];

    querySnapshot.forEach((snapshot) => {
        data.push({...snapshot.data(), id: snapshot.id});
    });

    return data;
}

export const updateAlert = (alertType, notificationType, alertId) => {
    return updateDoc(doc(db, "alerts", alertId), {
       alertType,
       notificationType 
    });
}

export const deleteAlert = (alertId) => {
    return deleteDoc(doc(db, "alerts", alertId));
}
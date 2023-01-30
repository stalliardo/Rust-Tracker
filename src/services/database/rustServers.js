import { db } from '../../firebase';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';

export const addServer = async (data) => {    
    const serverRef = doc(db, "users", data.userId, "servers", data.serverId);
   
    return await setDoc(serverRef, {
        name: data.serverName,
        notes: data.notes || "",
    });
}

export const deleteServer = async(data) => {
    const serverRef = doc(db, "users", data.userId, "servers", data.serverId);

    return await deleteDoc(serverRef);
}
import { db } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';

export const addServer = async (data) => {
    console.log('data from addServer = ', data);
    
    const serverRef = doc(db, "users", data.userId, "servers", data.serverId);
   
    return await setDoc(serverRef, {
        name: data.serverName,
        notes: data.notes || "",
    });
}
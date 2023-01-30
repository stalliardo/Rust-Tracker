import { db } from '../../firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();

export const signUpUserWithEmailAndPassword = async (formData) => {
    const q = query(collection(db, "usernames"), where("username", "==", formData.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        throw Error("Username already taken");
    } else {
        const { firstName, lastName, username, email, password } = formData;
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", credential.user.uid), {
            fullName: firstName + " " + lastName,
            firstName,
            lastName,
            username
        });

        await addDoc(collection(db, "usernames"), {
            username,
            lowerCaseUsername: username.toLowerCase(),
            userId: credential.user.uid
        });

        return credential;
    }
}

export const signInUserWithEmailAndPassword = async (formData) => {
    const { email, password } = formData;
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential;
}

export const getUserDoc = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const serversRef = collection(db, "users", userId, "servers");
        const serverSnapshot = await getDocs(serversRef);
        const serverData = [];

        serverSnapshot.forEach((doc) => {
            console.log('server data = ', doc.data());
            serverData.push({...doc.data(), id: doc.id});
        });

        return { ...docSnap.data(), id: userId, serverData };
    }
}

export const logUserOut = async () => {
    return signOut(auth);
}
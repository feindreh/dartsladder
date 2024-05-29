




import { getFirestore } from "firebase/firestore";
import {collection, query, getDocs, doc, setDoc ,getDoc} from "firebase/firestore"; 

import app from "./hmm";

const db = getFirestore(app);

const main = "users"
const second = "dusers"

const inUse = main

const addName = async (name) => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, inUse, name), {
        "name": name,
        "elo": 1200
    });
}

export const updateElo = async (name,elo) => {
    await setDoc(doc(db,inUse,name),{
        "name":name,
        "elo":elo
    })
}

export const hasName = async (name) => {
    const docRef = doc(db, inUse, name);
    const docSnap = await getDoc(docRef);
    if(docSnap.data() === undefined){return false}
    return true
}

export const getPlayer = async (name) => {
    const docRef = doc(db, inUse, name);
    const docSnap = await getDoc(docRef);
    if(docSnap.data() === undefined){return false}
    return docSnap.data()
}

export const getLadder = async () => {
    
    const q = query(collection(db, inUse));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => (arr.push(doc.data())))
    return arr
}

export default addName
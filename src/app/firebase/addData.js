




import { getFirestore } from "firebase/firestore";
import {collection, query, getDocs, doc, setDoc ,getDoc, updateDoc} from "firebase/firestore"; 
import uniqid from 'uniqid';

import app from "./hmm";

const db = getFirestore(app);

const main = "users"
const second = "dusers"

const mainMatches = "matches"
const secondMatches = "secondMatches"

const inUse = second
const inUseDatabase = secondMatches

// Player 

const addName = async (name) => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, inUse, name), {
        "name": name,
        "elo": 0,
        "mmr":1200
    });
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

// Elo/MMR

export const updateElo = async (name,elo) => {
    await updateDoc(doc(db,inUse,name),{
        "elo":elo
    })
}
export const updateMMR = async (name,mmr) => {
    await updateDoc(doc(db,inUse,name),{
        "mmr":mmr
    })
}

// Ladder

export const getLadder = async () => {
    
    const q = query(collection(db, inUse));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => (arr.push(doc.data())))
    return arr
}

// Matches

export const addMatch = async (game) => {
    const id = uniqid()
    const time = Date.now()

    await setDoc(doc(db, inUseDatabase, id), {
        game:game,
        time:time
    } );
 
}

export const getMatches = async () => {

    const q = query(collection(db, inUseDatabase));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => (arr.push(doc.data())))
    return arr

}

export default addName
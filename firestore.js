// ==========================================
// Ramphal Memorial Inter College
// Firestore Database
// P4A
// ==========================================

import { app } from "./firebase-config.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const db = getFirestore(app);

export { db };


// ==========================================
// Save User
// ==========================================

export async function saveUser(uid, data){

    await setDoc(

        doc(db,"users",uid),

        {

            ...data,

            createdAt:serverTimestamp()

        }

    );

}


// ==========================================
// Get User
// ==========================================

export async function getUser(uid){

    const snap = await getDoc(

        doc(db,"users",uid)

    );

    if(snap.exists()){

        return snap.data();

    }

    return null;

}


// ==========================================
// Update User
// ==========================================

export async function updateUser(uid,data){

    await updateDoc(

        doc(db,"users",uid),

        data

    );

}

// ======================================
// Role Manager
// Ramphal Memorial Inter College
// ======================================

import { getUser } from "./firestore.js";

export async function checkUserRole(uid){

    const user = await getUser(uid);

    if(!user){

        alert("User Not Found");

        return;
    }

    switch(user.role){

        case "student":

            window.location.href="student-dashboard.html";

            break;

        case "teacher":

            window.location.href="teacher-dashboard.html";

            break;

        case "principal":

            window.location.href="principal-dashboard.html";

            break;

        case "parent":

            window.location.href="parent-dashboard.html";

            break;

        default:

            alert("Invalid Role");

    }

}


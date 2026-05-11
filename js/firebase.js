// ==============================
// VERTICAL TECHNOLOGY
// FIREBASE CONFIGURATION
// ==============================

// Firebase SDKs

import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getStorage
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ==============================
// FIREBASE CONFIG
// ==============================

const firebaseConfig = {

apiKey: "AIzaSyCFuqPFMI66oc7sKMBTWAtJTUkvuCScubs",

authDomain: "vertical-technology-592c7.firebaseapp.com",

projectId: "vertical-technology-592c7",

storageBucket: "vertical-technology-592c7.appspot.com",

messagingSenderId: "852661748457",

appId: "1:852661748457:web:61438c40c89ec5843ce678",

measurementId: "G-CRRH733QK7"

};

// ==============================
// INITIALIZE FIREBASE
// ==============================

const app = initializeApp(firebaseConfig);

// ==============================
// SERVICES
// ==============================

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

// ==============================
// EXPORTS
// ==============================

export {
auth,
db,
storage
};

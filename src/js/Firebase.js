import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDIz4R0mCpoLMr5VVI-T2ulUG0sASGWxkU",
    authDomain: "internship-project-ccbf7.firebaseapp.com",
    databaseURL: "https://internship-project-ccbf7-default-rtdb.firebaseio.com",
    projectId: "internship-project-ccbf7",
    storageBucket: "internship-project-ccbf7.appspot.com",
    messagingSenderId: "846242990334",
    appId: "1:846242990334:web:5a8ba84158cb79fae1bdaf",
    measurementId: "G-NNRKFM7W43"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app)
import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from './Firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from 'firebase/auth'

import { ref, push, set, onValue } from 'firebase/database'


const AuthContext = React.createContext()

export function useFirebase() {
    return useContext(AuthContext);
}

export function FirebaseProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const value = {
        currentUser,
        login,
        signup,
        logout,
        writeData,
        childCount
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsub
    }, []);

    function login(email, pass) {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    function signup(email, pass) {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    function logout() {
        return signOut(auth)
    }


    function writeData(path, data, id) {
        return set(ref(database, path + id), data)
    }


    function childCount(path) {
        onValue(ref(database, path), snapshot => snapshot.val().length)
    }





    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

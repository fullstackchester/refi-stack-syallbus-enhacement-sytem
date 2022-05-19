import React, { useContext, useState, useEffect } from 'react'
import { auth, database, storage } from './Firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'

import { ref, set, onValue, remove } from 'firebase/database'
import { uploadBytes, ref as StorageRef } from 'firebase/storage';


const AuthContext = React.createContext()

export function useFirebase() {
    return useContext(AuthContext);
}

export function FirebaseProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [isAdmin, setAdmin] = useState()
    const [isAreaChair, setAreaChair] = useState()
    const [role, setRole] = useState()

    const value = {
        currentUser,
        login,
        signup,
        logout,
        writeData,
        deleteData,
        uploadAvatar,
        uploadFile,
        role
    }

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
            if (user) {
                onValue(ref(database, `users/${user.uid}`), snapshot => {
                    setRole(snapshot.val().userType)
                })
            }
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

    function deleteData(path) {
        return remove(ref(database, path))
    }

    function uploadAvatar(ref, file) {
        return uploadBytes(ref, file)
    }


    function uploadFile(file, path) {
        return uploadBytes(StorageRef(storage, path), file)
    }



    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

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
    const [admin, setAdmin] = useState()
    const [isAreaChair, setAreaChair] = useState()

    const value = {
        currentUser,
        login,
        signup,
        logout,
        writeData,
        childCount,
        deleteData,
        uploadAvatar,
        uploadFile,
        admin,
        isAreaChair,
    }

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)

            onValue(ref(database, `users/${user.uid}`), snapshot => {
                setAreaChair(snapshot.val().userType === 'area-chair' ? true : false)
                setAdmin(snapshot.val().userType === 'administrator' ? true : false)
            })

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

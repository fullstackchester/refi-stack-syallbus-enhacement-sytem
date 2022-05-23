import React, { useContext, useState, useEffect } from 'react'
import { auth, database, storage } from './Firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    deleteUser
} from 'firebase/auth'

import { ref, set, onValue, remove, update } from 'firebase/database'
import { uploadBytes, ref as StorageRef, deleteObject } from 'firebase/storage';


const AuthContext = React.createContext()

export function useFirebase() {
    return useContext(AuthContext);
}

export function FirebaseProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [isFetching, setFecthing] = useState(true)
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
        updateData,
        deleteFile,
        deleteAccount,
        role,
        loading,
        isFetching
    }

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            if (user) {
                onValue(ref(database, `users/${user.uid}`), snapshot => {
                    if (snapshot.exists()) {
                        setRole(snapshot.val().userType)
                    }
                })
            }
            setFecthing(false)
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

    function deleteData(path) {
        return remove(ref(database, path))
    }

    function uploadAvatar(ref, file) {
        return uploadBytes(ref, file)
    }


    function uploadFile(file, path) {
        return uploadBytes(StorageRef(storage, path), file)
    }

    function updateData(path, data) {
        return update(ref(database, path), data)
    }


    function deleteFile(path) {
        return deleteObject(StorageRef(storage, path))
    }

    function deleteAccount() {
        return deleteUser(currentUser)
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

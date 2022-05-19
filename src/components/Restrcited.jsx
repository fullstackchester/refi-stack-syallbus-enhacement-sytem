import { onAuthStateChanged } from 'firebase/auth'
import { child, onValue, ref } from 'firebase/database'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { auth, database } from '../js/Firebase'

export default function Restrcited({ children }) {

    const [account, setAccount] = useState()
    onAuthStateChanged(auth, user => {
        if (user) {
            onValue(ref(database, `users/${user.uid}`), snap => {
                if (snap.exists()) {
                    setAccount(snap.val().userType)
                }
            })
        }
    })

    if (account !== 'faculty') {
        return children
    } else {
        return <Navigate to='/subjects' replace />
    }
}

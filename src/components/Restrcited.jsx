import { onValue, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { database } from '../js/Firebase'
import { useFirebase } from '../js/FirebaseContext'

export default function Restrcited({ children }) {

    const [role, setRole] = useState()
    const [isFetching, setFecthing] = useState(true)
    const { currentUser } = useFirebase()
    const uid = currentUser.uid

    useEffect(() => {
        onValue(ref(database, `users/${uid}`), user => {
            if (user.exists()) {
                setRole(user.val().userType)
                setFecthing(false)
            }
        })
    }, [])


    if (!isFetching) {
        if (role === 'faculty') {
            return <Navigate to='/subjects' replace />
        } else {
            return children
        }
    } else {
        return <></>
    }
}


// const { role } = useFirebase()

//     if (role === 'faculty') {
//         return <Navigate to='/subjects' replace />
//     }

//     return children

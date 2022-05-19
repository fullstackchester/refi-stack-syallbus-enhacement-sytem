import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../js/Firebase'

export default function ProtectedRoute({ children }) {

    const [currentUser, setCurrentUser] = useState()
    onAuthStateChanged(auth, user => {
        if (user) {
            <Navigate to='/' replace />
        }
    })

    return children
}
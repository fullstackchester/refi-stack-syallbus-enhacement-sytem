import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../js/FirebaseContext'

export default function ProtectedRoute({ children }) {

    const { currentUser } = useFirebase()

    if (currentUser === null) {
        return <Navigate to='/' replace />
    }

    return children
}
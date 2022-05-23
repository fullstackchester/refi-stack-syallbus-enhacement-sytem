import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../js/FirebaseContext'

export default function ProtectedRoute({ children }) {

    const { currentUser, isFetching } = useFirebase()
    if (!isFetching) {
        if (currentUser === null) {
            return <Navigate to='/' replace />
        } else {
            return children
        }
    } else {
        return
    }
}
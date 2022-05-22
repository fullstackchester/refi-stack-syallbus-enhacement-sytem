import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../js/FirebaseContext'

export default function Restrcited({ children }) {

    const { role } = useFirebase()

    if (role === 'faculty') {
        return <Navigate to='/subjects' replace />
    }

    return children
}

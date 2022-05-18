import React from 'react'
import { Route } from 'react-router-dom'
import { useFirebase } from '../js/FirebaseContext'

export default function ProtectedRoute({ element, path }) {
    const { role } = useFirebase()
    return (
        <Route path={role === 'faculty' ? '/subjects' : path} element={<element />} />
    )
}

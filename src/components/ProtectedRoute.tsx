import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../js/FirebaseContext'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authentication } = useFirebase()

  if (authentication.status === 'loading') {
    return null
  }

  if (authentication.status === 'unauthenticated') {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

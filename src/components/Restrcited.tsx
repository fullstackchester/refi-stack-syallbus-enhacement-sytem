import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { database } from 'clients/Firebase'
import { snapshotValue } from 'utils/FirebaseData'
import { useFirebase } from 'context/FirebaseContext'
import type { UserProfile, UserRole } from 'types/domain'

interface RestrictedProps {
  children: ReactNode
}

export default function Restrcited({ children }: RestrictedProps) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [isFetching, setFetching] = useState(true)
  const { currentUser } = useFirebase()

  useEffect(() => {
    if (!currentUser) {
      setFetching(false)
      return
    }

    return onValue(ref(database, `users/${currentUser.uid}`), (snapshot) => {
      if (snapshot.exists()) {
        setRole(snapshotValue<UserProfile>(snapshot).userType)
      }
      setFetching(false)
    })
  }, [currentUser])

  if (isFetching) {
    return null
  }

  if (!currentUser) {
    return <Navigate to='/' replace />
  }

  if (role === 'faculty') {
    return <Navigate to='/subjects' replace />
  }

  return <>{children}</>
}

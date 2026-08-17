import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { onValue, ref, remove, set, update } from 'firebase/database'
import {
  deleteObject,
  ref as storageRef,
  uploadBytes,
  type StorageReference,
  type UploadResult,
} from 'firebase/storage'
import { auth, database, storage } from './Firebase'
import { snapshotValue } from './FirebaseData'
import type { UserProfile, UserRole } from '../types/domain'

export type AuthenticationState =
  | { status: 'loading'; user: null }
  | { status: 'authenticated'; user: User }
  | { status: 'unauthenticated'; user: null }

export interface FirebaseContextValue {
  authentication: AuthenticationState
  currentUser: User | null
  role: UserRole | null
  loading: boolean
  isFetching: boolean
  login: (email: string, password: string) => Promise<UserCredential>
  signup: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
  writeData: (path: string, data: unknown, id: string) => Promise<void>
  deleteData: (path: string) => Promise<void>
  uploadAvatar: (reference: StorageReference, file: Blob | Uint8Array | ArrayBuffer) => Promise<UploadResult>
  uploadFile: (file: Blob | Uint8Array | ArrayBuffer, path: string) => Promise<UploadResult>
  updateData: (path: string, data: object) => Promise<void>
  deleteFile: (path: string) => Promise<void>
  deleteAccount: () => Promise<void>
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined)

export function useFirebase(): FirebaseContextValue {
  const context = useContext(FirebaseContext)

  if (!context) {
    throw new Error('useFirebase must be used within FirebaseProvider.')
  }

  return context
}

export function FirebaseProvider({ children }: PropsWithChildren) {
  const [authentication, setAuthentication] = useState<AuthenticationState>({
    status: 'loading',
    user: null,
  })
  const [role, setRole] = useState<UserRole | null>(null)

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeProfile?.()

      if (!user) {
        setRole(null)
        setAuthentication({ status: 'unauthenticated', user: null })
        return
      }

      setAuthentication({ status: 'authenticated', user })
      unsubscribeProfile = onValue(ref(database, `users/${user.uid}`), (snapshot) => {
        if (snapshot.exists()) {
          setRole(snapshotValue<UserProfile>(snapshot).userType)
        }
      })
    })

    return () => {
      unsubscribeProfile?.()
      unsubscribeAuth()
    }
  }, [])

  const value = useMemo<FirebaseContextValue>(() => {
    const currentUser = authentication.status === 'authenticated' ? authentication.user : null
    const loading = authentication.status === 'loading'

    return {
      authentication,
      currentUser,
      role,
      loading,
      isFetching: loading,
      login: (email, password) => signInWithEmailAndPassword(auth, email, password),
      signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
      logout: () => signOut(auth),
      writeData: (path, data, id) => set(ref(database, path + id), data),
      deleteData: (path) => remove(ref(database, path)),
      uploadAvatar: (reference, file) => uploadBytes(reference, file),
      uploadFile: (file, path) => uploadBytes(storageRef(storage, path), file),
      updateData: (path, data) => update(ref(database, path), data),
      deleteFile: (path) => deleteObject(storageRef(storage, path)),
      deleteAccount: () => currentUser
        ? deleteUser(currentUser)
        : Promise.reject(new Error('No authenticated user is available.')),
    }
  }, [authentication, role])

  return (
    <FirebaseContext.Provider value={value}>
      {!value.loading && children}
    </FirebaseContext.Provider>
  )
}

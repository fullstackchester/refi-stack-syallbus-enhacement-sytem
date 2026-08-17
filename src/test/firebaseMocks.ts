import { vi } from 'vitest'
import type { User } from 'firebase/auth'

export interface MockSnapshot {
  exists: () => boolean
  val: () => unknown
}

export const mockOnAuthStateChanged = vi.fn((_auth: unknown, callback: (user: User | null) => void) => {
  callback(null)
  return vi.fn()
})
export const mockOnValue = vi.fn((
  _reference: unknown,
  _callback: (snapshot: MockSnapshot) => void,
) => vi.fn())

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({ name: 'test-app' })),
}))

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: {} })),
  deleteUser: vi.fn(() => Promise.resolve()),
  getAuth: vi.fn(() => ({ name: 'test-auth' })),
  onAuthStateChanged: mockOnAuthStateChanged,
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: {} })),
  signOut: vi.fn(() => Promise.resolve()),
  updateEmail: vi.fn(() => Promise.resolve()),
  updatePassword: vi.fn(() => Promise.resolve()),
}))

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({ name: 'test-database' })),
  onValue: mockOnValue,
  ref: vi.fn((_database: unknown, path?: string) => ({ path })),
  remove: vi.fn(() => Promise.resolve()),
  set: vi.fn(() => Promise.resolve()),
  update: vi.fn(() => Promise.resolve()),
}))

vi.mock('firebase/storage', () => ({
  deleteObject: vi.fn(() => Promise.resolve()),
  getDownloadURL: vi.fn(() => Promise.resolve('https://example.test/file')),
  getStorage: vi.fn(() => ({ name: 'test-storage' })),
  ref: vi.fn((_storage: unknown, path?: string) => ({ path })),
  uploadBytes: vi.fn(() => Promise.resolve({ ref: {} })),
}))

import { act, render, screen } from '@testing-library/react'
import type { User } from 'firebase/auth'
import { vi } from 'vitest'
import { FirebaseProvider, useFirebase } from './FirebaseContext'
import { mockOnAuthStateChanged, mockOnValue } from '../test/firebaseMocks'

function ContextStatus() {
  const { authentication, currentUser, role } = useFirebase()
  return <div>{authentication.status}:{currentUser?.uid ?? 'none'}:{role ?? 'none'}</div>
}

function HookWithoutProvider() {
  useFirebase()
  return null
}

describe('FirebaseProvider', () => {
  it('moves from loading through unauthenticated and authenticated states', () => {
    let authCallback: ((user: User | null) => void) | undefined
    mockOnAuthStateChanged.mockImplementationOnce((_auth, callback) => {
      authCallback = callback
      return vi.fn()
    })
    mockOnValue.mockImplementationOnce((_reference, callback) => {
      callback({
        exists: () => true,
        val: () => ({ userType: 'administrator' }),
      })
      return vi.fn()
    })

    const { container } = render(
      <FirebaseProvider><ContextStatus /></FirebaseProvider>,
    )
    expect(container).toBeEmptyDOMElement()

    act(() => authCallback?.(null))
    expect(screen.getByText('unauthenticated:none:none')).toBeInTheDocument()

    const user = { uid: 'user-1' } as User
    act(() => authCallback?.(user))
    expect(screen.getByText('authenticated:user-1:administrator')).toBeInTheDocument()
  })

  it('rejects context access outside its provider', () => {
    expect(() => render(<HookWithoutProvider />)).toThrow(
      'useFirebase must be used within FirebaseProvider.',
    )
  })
})

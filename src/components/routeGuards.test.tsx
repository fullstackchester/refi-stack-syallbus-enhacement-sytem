import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import ProtectedRoute from './ProtectedRoute'
import Restrcited from './Restrcited'
import { mockOnValue } from '../test/firebaseMocks'

const firebaseState = vi.hoisted(() => ({
  authentication: { status: 'unauthenticated', user: null } as
    | { status: 'loading'; user: null }
    | { status: 'unauthenticated'; user: null }
    | { status: 'authenticated'; user: { uid: string } },
  currentUser: null as { uid: string } | null,
}))

vi.mock('../js/FirebaseContext', () => ({
  useFirebase: () => firebaseState,
}))

function renderProtected() {
  return render(
    <MemoryRouter initialEntries={['/private']}>
      <Routes>
        <Route path='/' element={<div>login destination</div>} />
        <Route
          path='/private'
          element={<ProtectedRoute><div>private content</div></ProtectedRoute>}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('route guards', () => {
  it('renders nothing while authentication is loading', () => {
    firebaseState.authentication = { status: 'loading', user: null }
    const { container } = renderProtected()
    expect(container).toBeEmptyDOMElement()
  })

  it('redirects an unauthenticated visitor to login', () => {
    firebaseState.authentication = { status: 'unauthenticated', user: null }
    renderProtected()
    expect(screen.getByText('login destination')).toBeInTheDocument()
  })

  it('allows an authenticated visitor', () => {
    firebaseState.authentication = { status: 'authenticated', user: { uid: 'user-1' } }
    renderProtected()
    expect(screen.getByText('private content')).toBeInTheDocument()
  })

  it.each([
    ['faculty', 'subjects destination'],
    ['administrator', 'report content'],
  ])('applies report access for the %s role', async (role, expected) => {
    firebaseState.currentUser = { uid: 'user-1' }
    mockOnValue.mockImplementationOnce((_reference, callback) => {
      callback({ exists: () => true, val: () => ({ userType: role }) })
      return vi.fn()
    })

    render(
      <MemoryRouter initialEntries={['/reports']}>
        <Routes>
          <Route path='/' element={<div>login destination</div>} />
          <Route path='/subjects' element={<div>subjects destination</div>} />
          <Route path='/reports' element={<Restrcited><div>report content</div></Restrcited>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByText(expected)).toBeInTheDocument()
  })
})

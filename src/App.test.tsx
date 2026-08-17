import { render, screen } from '@testing-library/react'
import App from './App'

describe('application boot', () => {
  it('renders the public login route', async () => {
    window.history.pushState({}, '', '/')

    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Signup' })).toHaveAttribute('href', '/signup')
  })
})

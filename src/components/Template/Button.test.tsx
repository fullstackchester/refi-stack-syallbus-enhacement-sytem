import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('shared Button color variants', () => {
  it.each([
    ['red', 'bg-red-600', 'hover:bg-red-700'],
    ['sky', 'bg-sky-600', 'hover:bg-sky-700'],
  ] as const)('renders the complete %s utility classes', (color, background, hover) => {
    render(<Button title={`${color} action`} color={color} />)

    expect(screen.getByRole('button', { name: `${color} action` })).toHaveClass(
      background,
      hover,
    )
  })
})

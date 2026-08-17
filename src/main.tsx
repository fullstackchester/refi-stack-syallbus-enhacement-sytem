import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Application root element was not found.')
}

createRoot(container).render(<App />)

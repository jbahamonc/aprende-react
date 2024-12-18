import { StrictMode } from 'react'
import reactDom from 'react-dom/client'
import './style.css'

import App from './App.jsx'

const root = reactDom.createRoot(document.getElementById('app'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

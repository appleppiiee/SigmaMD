import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../src/css/index.css'
// import App from './App.jsx'
import App from '../../src/pages/App.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

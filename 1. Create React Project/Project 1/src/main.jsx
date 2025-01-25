import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// or

// const root = createRoot(document.getElementById('root'));

// root.render(
//   <StrictMode>  // StrictMode is not neccessary
//     <App />
//   </StrictMode>
// )
import { Toaster } from './components/ui/sonner.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    <App />
    <Toaster position="bottom-right" outline="none" toastOptions={{ duration: 3000 }}/> 
    </BrowserRouter>
  </StrictMode>,
)

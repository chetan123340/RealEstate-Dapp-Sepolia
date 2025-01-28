import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddProperty from './pages/AddProperty.tsx'
import Approval from './pages/Approval.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/add-property' element={<AddProperty />} />
        <Route path='/approval' element={<Approval />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

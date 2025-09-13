// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Services from './components/Services.tsx'
import ServiceDetails from './components/Services/Details.tsx'
import { BagProvider } from "./context/BagContextType";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BagProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/components/Services" element={<Services />} />
          <Route path="/components/Services/:id" element={<ServiceDetails />} />
        </Routes>
      </BagProvider>
    </BrowserRouter>
  </StrictMode>,
)

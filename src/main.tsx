import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { FluidProvider } from './context/fluid-context/index.tsx'

createRoot(document.getElementById('root')!).render(
  <FluidProvider>
    <App />
  </FluidProvider>
)

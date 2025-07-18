import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { FluidProvider } from './context/fluid-context/index.tsx';
import './i18n';
import './index.scss';

createRoot(document.getElementById('root')!).render(
    <FluidProvider>
        <App />
    </FluidProvider>
);

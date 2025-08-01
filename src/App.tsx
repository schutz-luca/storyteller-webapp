import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { useContext } from 'react';
import { AnimatedBackground } from './components/animated-background';
import { LangButton } from './components/lang-button';
import { FluidContext } from './context/fluid-context';
import { IntroPage } from './pages/intro';
import { MainPage } from './pages/main';
import './App.scss';

const App = () => {
    const { isNewSession } = useContext(FluidContext);

    return (
        <div className="app-container">
            <AnimatedBackground />
            <LangButton />
            <div className="content-container">
                {isNewSession ?
                    <IntroPage />
                    :
                    <MainPage />
                }
            </div>
            <Analytics />
            <SpeedInsights />
        </div>
    );
};

export default App;
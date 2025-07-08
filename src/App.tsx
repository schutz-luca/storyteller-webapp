import "./App.scss";
import { AnimatedBackground } from "./components/animated-background";
import { useSharedMaps } from "./lib/fluid-framework/useSharedMaps";
import { IntroPage } from "./pages/intro";
import { MainPage } from "./pages/main";

const App = () => {
  const { storyMap, loadingMap, containerId, isNewSession, setIsNewSession } = useSharedMaps();

  return (
    <div className="app-container">
      <AnimatedBackground/>
      <div className="content-container">
        {isNewSession ?
          <IntroPage setIsNewSession={setIsNewSession} />
          :
          <MainPage
            storyMap={storyMap}
            loadingMap={loadingMap}
            containerId={containerId}
          />
        }
      </div>
    </div>
  );
}

export default App;
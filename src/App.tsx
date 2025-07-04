import "./App.scss";
import { StorytellerBanner } from "./components/storyteller";
import { useSharedMaps } from "./lib/fluid-framework/useSharedMaps";
import { IntroPage } from "./pages/intro";
import { MainPage } from "./pages/main";

const App = () => {
  const { storyMap, loadingMap, containerId, isNewSession, setIsNewSession } = useSharedMaps();

  return (
    <div className="app-container">
      {!isNewSession && <StorytellerBanner />}
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
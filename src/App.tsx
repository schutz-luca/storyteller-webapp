import "./App.scss";
import { StorytellerBanner } from "./components/storyteller";
import { MainPage } from "./pages";

const App = () => (
  <div className="app-container">
    <StorytellerBanner />
    <div className="content-container">
      <MainPage />
    </div>
  </div>
);

export default App;
import "./App.scss";
import { StorytellerBanner } from "./components/storyteller";
import { MainPage } from "./pages";

const App = () => (
  <div className="app-container">
    <StorytellerBanner />
    <MainPage />
  </div>
);

export default App;
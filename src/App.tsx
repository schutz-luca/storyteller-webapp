import { useContext } from "react";
import "./App.scss";
import { AnimatedBackground } from "./components/animated-background";
import { FluidContext } from "./context/fluid-context";
import { IntroPage } from "./pages/intro";
import { MainPage } from "./pages/main";
import { LangButton } from "./components/lang-button";

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
    </div>
  );
}

export default App;
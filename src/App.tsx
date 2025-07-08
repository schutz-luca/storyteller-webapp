import { useContext } from "react";
import "./App.scss";
import { AnimatedBackground } from "./components/animated-background";
import { FluidContext } from "./context/fluid-context";
import { IntroPage } from "./pages/intro";
import { MainPage } from "./pages/main";
import { Loading } from "./components/loading";

const App = () => {
  const { isNewSession, sharedLoading } = useContext(FluidContext);

  if (sharedLoading) return <Loading text={sharedLoading} />
  return (
    <div className="app-container">
      <AnimatedBackground />
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
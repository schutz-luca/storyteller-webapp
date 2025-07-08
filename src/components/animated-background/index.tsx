import Lottie from "lottie-react";
import PlanetAnimation from '../../assets/lottie/planet-blob.json';
import "./styles.scss";

export const AnimatedBackground = () => {

    return (
        <div className="animated-background">
            <Lottie animationData={PlanetAnimation} loop={true} autoPlay={true} className="planet-blob" />
        </div>
    )
}
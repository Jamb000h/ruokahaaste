import { LayerZIndex } from "../../enums/LayerZIndex";
import "./Foreground.css";
import { ParallaxLayer } from "./ParallaxLayer";

export const Foreground = () => {
  return (
    <>
      <ParallaxLayer
        className="foreground"
        parallaxModifier={1}
        isInteractive={false}
        style={{ zIndex: LayerZIndex.FOREGROUND }}
      >
        <div className="ground">
          <div className="rock rock--left rock--small"></div>
          <div className="rock rock--center rock--small"></div>
          <div className="rock rock--right rock--small"></div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        className="foreground"
        parallaxModifier={2}
        isInteractive={false}
        style={{ zIndex: LayerZIndex.FOREGROUND }}
      >
        <div className="ground">
          <div className="rock rock--left"></div>
          <div className="rock rock--center"></div>
          <div className="rock rock--right"></div>
        </div>
      </ParallaxLayer>
    </>
  );
};

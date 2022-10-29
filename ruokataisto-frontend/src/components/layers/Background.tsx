import { LayerZIndex } from "../../enums/LayerZIndex";
import "./Background.css";
import { ParallaxLayer } from "./ParallaxLayer";

export const Background = () => {
  return (
    <ParallaxLayer
      className="background"
      parallaxModifier={0.1}
      style={{ zIndex: LayerZIndex.BACKGROUND }}
    >
      <div className="tree tree--left"></div>
      <div className="tree tree--center"></div>
      <div className="tree tree--right"></div>
    </ParallaxLayer>
  );
};

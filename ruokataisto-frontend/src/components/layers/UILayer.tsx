import { LayerZIndex } from "../../enums/LayerZIndex";
import { ILayerProps, Layer } from "./Layer";

export const UILayer = (props: ILayerProps) => {
  return (
    <Layer
      style={{ zIndex: LayerZIndex.UI }}
      ui={true}
      isInteractive={props.isInteractive || false}
      {...props}
    />
  );
};

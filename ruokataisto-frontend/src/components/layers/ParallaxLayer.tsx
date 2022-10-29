import { ILayerProps, Layer } from "./Layer";

interface IProps extends ILayerProps {
  parallaxModifier: number;
}

export const ParallaxLayer = (props: IProps) => {
  return (
    <Layer
      {...props}
      parallax={true}
      parallaxModifier={props.parallaxModifier}
    />
  );
};

import { ReactNode } from "react";
import "./Layer.css";

export interface ILayerProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  background?: boolean;
  parallax?: boolean;
  isInteractive?: boolean;
  ui?: boolean;
  parallaxModifier?: number;
}

export const Layer = (props: ILayerProps) => {
  const { children } = props;

  if (!children) {
    return <></>;
  }

  const interactiveClassName = props.isInteractive
    ? ""
    : " layer--not-interactive";

  if (props.ui) {
    const backgroundClassName = props.background ? "" : " layer--ui-no-bg";
    return (
      <div
        className={`layer layer--ui${backgroundClassName}${interactiveClassName}`}
      >
        {children}
      </div>
    );
  }

  const parallaxClassName =
    props.parallax && props.parallaxModifier ? " layer--parallax" : "";

  const formattedClassName = props.className
    ? " " + props.className.trim()
    : "";

  return (
    <div
      className={`layer${interactiveClassName}${parallaxClassName}${formattedClassName}`}
      data-parallaxModifier={props.parallaxModifier}
    >
      <div className="content">{children}</div>
    </div>
  );
};

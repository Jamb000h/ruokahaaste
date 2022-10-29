import "./StatBar.css";

interface IProps {
  fillAmount: number;
  fillColor: string;
  orientation?: "left" | "right";
  remainingValue?: string;
  maxValue?: string;
}

export const StatBar = (props: IProps) => {
  const orientation = props.orientation ? props.orientation : "left";
  const orientationClassName = " stat-bar--" + orientation;
  return (
    <div className={`stat-bar${orientationClassName}`}>
      <div className="stat-bar-bar">
        <div
          className="stat-bar-bar-fill"
          style={{
            backgroundColor: props.fillColor,
            width: props.fillAmount + "%",
          }}
        ></div>
      </div>
    </div>
  );
};

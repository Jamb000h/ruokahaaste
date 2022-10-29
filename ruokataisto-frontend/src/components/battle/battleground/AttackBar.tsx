import "./AttackBar.css";

interface IProps {
  attackSpeed: number;
  orientation?: "left" | "right";
}

export const AttackBar = (props: IProps) => {
  const { attackSpeed } = props;
  const orientation = props.orientation ? props.orientation : "left";
  const orientationClassName = " attack-bar-wrapper--" + orientation;

  return (
    <div className={`attack-bar-wrapper${orientationClassName}`}>
      <div className="attack-bar">
        <div
          className="attack-bar-fill attack-bar-fill-animate"
          style={{ animationDuration: attackSpeed + "s" }}
        ></div>
      </div>
    </div>
  );
};

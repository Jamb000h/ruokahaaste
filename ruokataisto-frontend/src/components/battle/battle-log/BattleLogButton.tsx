import "./BattleLogButton.css";

interface IProps {
  onClick: () => void;
  isOpenBattleLog: boolean;
}

export const BattleLogButton = (props: IProps) => {
  return (
    <button onClick={props.onClick} className="battle-log-button">
      {props.isOpenBattleLog ? "Sulje loki" : "Avaa loki"}
    </button>
  );
};

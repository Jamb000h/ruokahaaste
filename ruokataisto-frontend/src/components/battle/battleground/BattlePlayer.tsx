import { useMemo } from "react";
import { Player } from "../../../domain/Player";
import { IAttack } from "../../../interfaces/IAttack";
import { StatBar } from "../../common/StatBar";
import { AttackBar } from "./AttackBar";
import "./BattlePlayer.css";

interface IProps {
  player: Player;
  attacks: IAttack[];
  orientation: "left" | "right";
}

const remainingHpPercentage = (player: Player) =>
  (player.remainingHp / player.hitPoints) * 100;

export const BattlePlayer = (props: IProps) => {
  const { player } = props;

  const attackElements = useMemo(() => {
    return props.attacks.map((attack, i) => {
      return (
        <div
          key={i}
          className={"hit" + (attack.isCritical ? " crit" : "")}
        ></div>
      );
    });
  }, [props.attacks]);

  const orientationClassName = " player--" + props.orientation;

  return (
    <div className={`player${orientationClassName}`}>
      <StatBar
        fillAmount={remainingHpPercentage(player)}
        fillColor="red"
        orientation={props.orientation}
      />
      <AttackBar
        attackSpeed={player.attackSpeed / 1000}
        orientation={props.orientation}
      />
      <div className={"battleground-player " + player.name.toLowerCase()}>
        <div className="hitbox">{attackElements}</div>
      </div>
    </div>
  );
};

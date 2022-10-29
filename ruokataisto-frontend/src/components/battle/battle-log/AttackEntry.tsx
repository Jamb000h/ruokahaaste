import { IAttackEntry } from "../../../interfaces/IBattleLogEntry";

interface IProps {
  logEntry: IAttackEntry;
}

export const AttackEntry = (props: IProps) => {
  const { attacker, target, damage, remainingHp, isCritical } = props.logEntry;
  return (
    <p className="log-entry log-entry--attack">
      <span className="attacker">{attacker}</span> lyö{" "}
      <span className="target">{target}a</span>{" "}
      {isCritical && " (KRIITTINEN OSUMA)"} ja tekee{" "}
      <span className="damage">{damage.toFixed(1)}</span> vahinkoa!{" "}
      <span className="target">{target}</span> sinnittelee{" "}
      <span className="hp">{remainingHp.toFixed(1)}</span> elämäpisteellä.
    </p>
  );
};

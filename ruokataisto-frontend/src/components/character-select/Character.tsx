import { ICharacter } from "../../interfaces/ICharacter";
import { StatBar } from "../common/StatBar";

interface IProps {
  character: ICharacter;
  selectCharacter: (character: ICharacter) => void;
  selected: boolean;
  maxStats: {
    maxHp: number;
    maxAttack: number;
    maxDefence: number;
    maxAttackSpeed: number;
  };
}

export const Character = (props: IProps) => {
  const selectedCharacterClassName = props.selected
    ? " character--selected"
    : "";

  const comparisonHp = (props.character.hitPoints / props.maxStats.maxHp) * 100;
  const comparisonAttack =
    (props.character.attack / props.maxStats.maxAttack) * 100;
  const comparisonDefence =
    (props.character.defence / props.maxStats.maxDefence) * 100;
  const comparisonAttackSpeed =
    (props.character.attackSpeed / props.maxStats.maxAttackSpeed) * 100;

  return (
    <div
      className={`character character--character-select${selectedCharacterClassName}`}
      onClick={() => props.selectCharacter(props.character)}
    >
      <div
        className={"character-image " + props.character.name.toLowerCase()}
      ></div>
      <ul className="stats">
        <li>
          <p>Elämäpisteet</p>
          <StatBar fillAmount={comparisonHp} fillColor="red" />
        </li>
        <li>
          <p>Hyökkäys</p>
          <StatBar fillAmount={comparisonAttack} fillColor="blue" />
        </li>
        <li>
          <p>Puolustus</p>
          <StatBar fillAmount={comparisonDefence} fillColor="green" />
        </li>
        <li>
          <p>Hitaus</p>
          <StatBar fillAmount={comparisonAttackSpeed} fillColor="yellow" />
        </li>
      </ul>
    </div>
  );
};

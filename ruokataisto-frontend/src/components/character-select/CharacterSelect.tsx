import { ICharacter } from "../../interfaces/ICharacter";
import { UILayer } from "../layers/UILayer";
import { Character } from "./Character";
import "./CharacterSelect.css";

interface IProps {
  characters: ICharacter[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<ICharacter[]>>;
  selectedCharacters: ICharacter[];
  startBattle: () => void;
}

const isSelected = (
  selectedCharacters: ICharacter[],
  character: ICharacter
) => {
  return !!selectedCharacters.find(
    (selected) => selected.name === character.name
  );
};

export const CharacterSelect = (props: IProps) => {
  const selectCharacter = (character: ICharacter) => {
    const alreadySelected = !!props.selectedCharacters.find(
      (selected) => selected.name === character.name
    );

    if (alreadySelected) {
      props.setSelectedCharacters((prevState) => {
        return prevState.filter((selected) => selected.name !== character.name);
      });

      return;
    }

    if (props.selectedCharacters.length === 2) {
      return;
    }

    props.setSelectedCharacters((prevState) => {
      return [...prevState, character];
    });
  };

  const maxStats = {
    maxHp: Math.max(
      ...props.characters.map((character) => character.hitPoints)
    ),
    maxAttack: Math.max(
      ...props.characters.map((character) => character.attack)
    ),
    maxDefence: Math.max(
      ...props.characters.map((character) => character.defence)
    ),
    maxAttackSpeed: Math.max(
      ...props.characters.map((character) => character.attackSpeed)
    ),
  };

  return (
    <UILayer background={true} isInteractive={true}>
      <div className="character-select">
        <h2>Valitse kaksi ruokaa</h2>
        <div className="character-list">
          {props.characters.map((character, i) => (
            <Character
              key={i}
              character={character}
              selectCharacter={selectCharacter}
              selected={isSelected(props.selectedCharacters, character)}
              maxStats={maxStats}
            />
          ))}
        </div>
      </div>
      <button
        onClick={props.startBattle}
        className="start-battle"
        disabled={props.selectedCharacters.length !== 2}
      >
        <span>Aloita taistelu</span>
      </button>
    </UILayer>
  );
};

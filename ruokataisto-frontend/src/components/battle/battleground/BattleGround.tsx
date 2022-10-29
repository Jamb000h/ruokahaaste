import { useEffect } from "react";
import { Player } from "../../../domain/Player";
import { LayerZIndex } from "../../../enums/LayerZIndex";
import { IAttack } from "../../../interfaces/IAttack";
import { ParallaxLayer } from "../../layers/ParallaxLayer";
import "./Battleground.css";
import { BattlePlayer } from "./BattlePlayer";

interface IProps {
  players: Player[];
  attacks: IAttack[];
}

export const Battleground = (props: IProps) => {
  const { attacks, players } = props;

  const notFinished = players.every((player) => player.isAlive);

  useEffect(() => {
    const resetAttackAnimation = () => {
      const attack = attacks.at(-1);

      if (!attack) return;

      // Should go with refs or some other solution, but here we are :)
      const attackBarFills = document.querySelectorAll(".attack-bar-fill");

      if (attackBarFills.length < 2) return;

      const targetElement =
        attack.attacker === players[0] ? attackBarFills[0] : attackBarFills[1];

      // Trigger reflow to reset animation
      targetElement.classList.remove("attack-bar-fill-animate");
      void targetElement.clientWidth;
      targetElement.classList.add("attack-bar-fill-animate");
    };

    if (notFinished) {
      resetAttackAnimation();
    }
  }, [attacks, players, notFinished]);

  if (players.length === 0) {
    return <></>;
  }

  return (
    <ParallaxLayer
      parallaxModifier={0.3}
      isInteractive={true}
      style={{ zIndex: LayerZIndex.BATTLEGROUND }}
    >
      <div className="battle-view">
        <div className="battleground">
          <div className="players">
            <BattlePlayer
              player={players[0]}
              attacks={props.attacks.filter(
                (attack) => attack.target === players[0]
              )}
              orientation="left"
            />
            <BattlePlayer
              player={players[1]}
              attacks={props.attacks.filter(
                (attack) => attack.target === players[1]
              )}
              orientation="right"
            />
          </div>
        </div>
      </div>
    </ParallaxLayer>
  );
};

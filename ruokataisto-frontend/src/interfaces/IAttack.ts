import { ICharacter } from "./ICharacter";

export interface IAttack {
  attacker: ICharacter;
  target: ICharacter;
  damage: number;
  isCritical: boolean;
}

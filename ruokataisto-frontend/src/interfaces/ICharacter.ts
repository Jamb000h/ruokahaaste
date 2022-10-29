export interface ICharacter {
  name: string;
  hitPoints: number;
  attack: number;
  defence: number;
  attackSpeed: number;
  remainingHp?: number;
}

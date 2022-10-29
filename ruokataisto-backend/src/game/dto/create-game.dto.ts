export interface ICharacter {
  name: string;
  hitPoints: number;
  attack: number;
  defence: number;
  attackSpeed: number;
}

export class CreateGameDto {
  characterNames: string[];
}

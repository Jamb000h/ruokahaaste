import { Food } from 'src/foods/entities/food.entity';

export class Character {
  name: string;
  attack: number;
  hitPoints: number;
  defence: number;
  attackSpeed: number;

  static foodToCharacter = (food: Food): Character => {
    const attack = Number(food.carbsInGrams.toFixed(1));
    const defence = Number(food.proteinInGrams.toFixed(1));
    const baseAttackSpeed = Number(food.fatsInGrams.toFixed(1));
    const attackSpeed = Number((baseAttackSpeed + attack + defence).toFixed(1));

    return {
      name: food.name.split(',')[0], // Get rid of possible extra parts in name (e.g. "omena, kuivattu")
      hitPoints: Math.round(food.energyInKcal),
      attack,
      defence,
      attackSpeed,
    };
  };
}

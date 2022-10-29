import { ICharacter } from '../dto/create-game.dto';

export class Player {
  private _name: string;
  private _hitPoints: number;
  private _remainingHp: number;
  private _attack: number;
  private _defence: number;
  private _attackSpeed: number;

  static fromCharacter(character: ICharacter) {
    const { name, hitPoints, attack, defence, attackSpeed } = character;
    return new this(
      name,
      Number(hitPoints.toFixed(1)),
      Number(attack.toFixed(1)),
      Number(defence.toFixed(1)),
      Number((attackSpeed * 1000).toFixed(1)),
    );
  }

  constructor(
    name: string,
    hitPoints: number,
    attack: number,
    defence: number,
    attackSpeed: number,
  ) {
    this._name = name;
    this._hitPoints = hitPoints;
    this._remainingHp = hitPoints;
    this._attack = attack;
    this._defence = defence;
    this._attackSpeed = attackSpeed;
  }

  public get name() {
    return this._name;
  }

  public get hitPoints() {
    return this._hitPoints;
  }

  public get remainingHp() {
    return this._remainingHp;
  }

  public get attack() {
    return this._attack;
  }

  public get defence() {
    return this._defence;
  }

  public get attackSpeed() {
    return this._attackSpeed;
  }

  public takeDamage(damage: number) {
    this._remainingHp -= damage;
    if (this._remainingHp < 0) {
      this._remainingHp = 0;
    }
  }
}

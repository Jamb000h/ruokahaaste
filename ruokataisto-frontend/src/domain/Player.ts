import { ICharacter } from "../interfaces/ICharacter";

export class Player implements ICharacter {
  private _name: string;
  private _hitPoints: number;
  private _remainingHp: number;
  private _attack: number;
  private _defence: number;
  private _attackSpeed: number;
  private _isAlive: boolean = true;

  constructor(
    name: string,
    hitPoints: number,
    attack: number,
    defence: number,
    attackSpeed: number
  ) {
    this._name = name;
    this._hitPoints = hitPoints;
    this._remainingHp = hitPoints;
    this._attack = attack;
    this._defence = defence;
    this._attackSpeed = attackSpeed;
  }

  static fromCharacter(character: ICharacter) {
    const { name, hitPoints, attack, defence, attackSpeed } = character;
    return new this(name, hitPoints, attack, defence, attackSpeed * 1000);
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

  public get isAlive() {
    return this._isAlive;
  }

  public set remainingHp(remainingHp: number) {
    this._remainingHp = remainingHp;
  }

  public set isAlive(isAlive: boolean) {
    this._isAlive = isAlive;
  }

  public takeDamage(damage: number) {
    this._remainingHp -= damage;
    if (this._remainingHp < 0) {
      this._remainingHp = 0;
    }
  }
}

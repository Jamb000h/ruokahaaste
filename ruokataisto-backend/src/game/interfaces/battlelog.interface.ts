export enum BattleLogEntryType {
  START = 'START',
  ATTACK = 'ATTACK',
  FINISH = 'FINISH',
}

export type IBattleLogEntry = IAttackEntry | IStartEntry | IFinishEntry;

export interface IAttackEntry {
  type: BattleLogEntryType.ATTACK;
  attacker: string;
  target: string;
  damage: number;
  remainingHp: number;
  isCritical: boolean;
}

export interface IStartEntry {
  type: BattleLogEntryType.START;
  characters: string[];
}

export interface IFinishEntry {
  type: BattleLogEntryType.FINISH;
  winner: string;
}

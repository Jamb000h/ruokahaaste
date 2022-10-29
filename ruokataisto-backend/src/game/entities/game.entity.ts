import {
  IBattleLogEntry,
  BattleLogEntryType,
} from '../interfaces/battlelog.interface';
import { Player } from './player.entity';

interface AttackTimer {
  attacker: Player;
  targets: Player[];
  timer: number;
}

export enum GameState {
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  BATTLING = 'BATTLING',
  FINISHED = 'FINISHED',
}

export class Game {
  // Internal Bookkeeping
  private _battleStart: undefined | number = undefined;
  private _lastTick: undefined | number = undefined;

  // Players and timed actions
  private _players: Player[];
  private _attackTimers: AttackTimer[];

  // Side effects / signaling outside world of changes
  private _eventListener?: (logEntry: IBattleLogEntry) => void;

  constructor() {
    this._players = [];
    this._attackTimers = [];
  }

  public addPlayer = (player: Player) => {
    this._players.push(player);
  };

  public addAttackTimer = (attacker: Player, targets: Player[]) => {
    this._attackTimers.push({
      attacker,
      targets,
      timer: attacker.attackSpeed,
    });
  };

  public addEventListener = (
    eventListener: (logEntry: IBattleLogEntry) => void,
  ) => {
    this._eventListener = eventListener;
  };

  public startBattle = () => {
    if (this._players.length > 1) {
      this._battleStart = undefined;
      this._lastTick = undefined;

      this._eventListener &&
        this._eventListener({
          type: BattleLogEntryType.START,
          characters: this._players.map((player) => player.name),
        });

      setImmediate(this.battleLoop);
    }
  };

  private attack = (attacker: Player, target: Player) => {
    const isCritical = Math.random() >= 0.9;
    const attackDamage = isCritical ? attacker.attack * 2 : attacker.attack;
    const defence = target.defence;
    const damage = Math.max(Number((attackDamage - defence).toFixed(1)), 0);
    target.takeDamage(damage);

    !!this._eventListener &&
      this._eventListener({
        type: BattleLogEntryType.ATTACK,
        attacker: attacker.name,
        target: target.name,
        damage,
        remainingHp: target.remainingHp,
        isCritical,
      });
  };

  private updateGameTimers = (timestamp: number) => {
    if (this._battleStart === undefined) {
      this._battleStart = timestamp;
    }

    if (this._lastTick === undefined) {
      this._lastTick = timestamp;
    }

    const delta = timestamp - this._lastTick;
    this._lastTick = timestamp;

    return delta;
  };

  private updateAttackTimers = (delta: number) => {
    this._attackTimers = this._attackTimers.map((attackTimer) => {
      return {
        ...attackTimer,
        timer: (attackTimer.timer -= delta),
      };
    });
  };

  private handleAttacks = () => {
    this._attackTimers.forEach((attackTimer) => {
      const { attacker } = attackTimer;
      if (attackTimer.timer <= 0) {
        attackTimer.targets.forEach((target) => this.attack(attacker, target));

        attackTimer.timer = attacker.attackSpeed;
      }
    });
  };

  private checkForLostPlayers = () => {
    return this._players.filter((player) => player.remainingHp <= 0);
  };

  private battleLoop = () => {
    const delta = this.updateGameTimers(Date.now());

    this.updateAttackTimers(delta);
    this.handleAttacks();

    const lostPlayers = this.checkForLostPlayers();

    if (lostPlayers.length > 0) {
      !!this._eventListener &&
        this._eventListener({
          type: BattleLogEntryType.FINISH,
          winner: this._players.filter(
            (player) => !lostPlayers.includes(player),
          )[0].name,
        });
    } else {
      setImmediate(this.battleLoop);
    }
  };
}

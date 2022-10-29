import { Character } from 'src/entities/character.entity';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';

export class GameService {
  create(characters: Character[]) {
    const players = characters.map((character) =>
      Player.fromCharacter(character),
    );

    const game = new Game();
    players.forEach(game.addPlayer);
    game.addAttackTimer(players[0], [players[1]]);
    game.addAttackTimer(players[1], [players[0]]);

    game.startBattle();

    return game;
  }
}

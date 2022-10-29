import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Socket } from 'socket.io';
import {
  BattleLogEntryType,
  IBattleLogEntry,
} from './interfaces/battlelog.interface';
import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { FoodsService } from 'src/foods/foods.service';
import { Character } from 'src/entities/character.entity';

@Injectable()
@WebSocketGateway({ cors: true })
export class GameGateway {
  private games: Game[];
  constructor(
    private readonly gameService: GameService,
    private readonly foodsService: FoodsService,
  ) {
    this.games = [];
  }

  @SubscribeMessage('createGame')
  async create(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    const createGameDto: CreateGameDto = JSON.parse(data);
    try {
      const characters = await this.getCharactersFromCreateGameDto(
        createGameDto,
      );
      const game: Game = this.gameService.create(characters);

      game.addEventListener((logEntry: IBattleLogEntry) => {
        this.sendLog(logEntry, socket);
        if (logEntry.type === BattleLogEntryType.FINISH) {
          this.games.filter((someGame) => someGame !== game);
          socket.disconnect();
        }
      });

      this.games.push(game);
      game.startBattle();

      return 'Battle is starting!';
    } catch (e: any) {
      // Such sophisticated
      return (e as Error).message;
    }
  }

  private sendLog(battleLogEntry: IBattleLogEntry, socket: Socket) {
    socket.emit('battleLog', JSON.stringify(battleLogEntry));
  }

  private async getCharactersFromCreateGameDto(createGameDto: CreateGameDto) {
    const { characterNames } = createGameDto;
    const foods = await this.foodsService.findAll();
    return foods
      .filter((food) =>
        characterNames.some(
          (characterName) => characterName === food.name.split(',')[0],
        ),
      )
      .map(Character.foodToCharacter);
  }
}

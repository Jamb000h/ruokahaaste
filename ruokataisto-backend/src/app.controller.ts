import { Controller, Get } from '@nestjs/common';
import { Character } from './entities/character.entity';
import { FoodsService } from './foods/foods.service';

@Controller()
export class AppController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  getHello(): string {
    return 'Get characters from /characters and start battle by opening a websocket and emitting message startBattle with two characterNames';
  }

  @Get('/characters')
  async getCharacters(): Promise<Character[]> {
    const foods = await this.foodsService.findAll();
    return foods.map(Character.foodToCharacter);
  }
}

import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { FoodsModule } from 'src/foods/foods.module';

@Module({
  providers: [GameGateway, GameService],
  imports: [FoodsModule],
})
export class GameModule {}

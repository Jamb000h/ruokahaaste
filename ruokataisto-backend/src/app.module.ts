import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FoodsModule } from './foods/foods.module';
import { FoodsService } from './foods/foods.service';
import { GameModule } from './game/game.module';

@Module({
  imports: [FoodsModule, GameModule],
  controllers: [AppController],
  providers: [FoodsService],
})
export class AppModule {}

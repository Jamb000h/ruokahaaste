import { CacheModule, Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService, HttpModule, CacheModule],
})
export class FoodsModule {}

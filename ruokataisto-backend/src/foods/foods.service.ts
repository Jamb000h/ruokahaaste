import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Food } from './entities/food.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class FoodsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Gotta regulate these quite a lot to keep the battles more interesting
  // [porkkana, paprika, munakoiso, sipuli, kurkku, tomaatti, banaani, omena]
  private readonly foodIdList = [300, 355, 362, 335, 346, 352, 28934, 28916];

  async findAll(): Promise<Food[]> {
    const cachedFoods = await this.cacheManager.get<Food[]>('foods');

    if (cachedFoods !== undefined) {
      return cachedFoods;
    }

    const foods: Food[] = [];
    const promises = this.foodIdList.map(this.getFoodFromFineliById);

    for await (const res of promises) {
      foods.push(this.fineliResponseToFood(res.data));
    }

    // Cache result for a year, dem veggies probably not changing much
    // And it is not very nice to spam Fineli API too much as they're
    // already being very nice by providing a free API :)
    if (foods.length > 0) {
      await this.cacheManager.set('foods', foods, 365 * 24 * 60 * 60 * 1000);
    }

    return foods;
  }

  private fineliResponseToFood = (fineliResponse: any): Food => {
    return {
      name: fineliResponse.name?.fi,
      energyInKcal: fineliResponse.energyKcal,
      carbsInGrams: fineliResponse.carbohydrate,
      proteinInGrams: fineliResponse.protein,
      fatsInGrams: fineliResponse.fat,
    };
  };

  private getFoodFromFineliById = (id: number) => {
    return firstValueFrom(
      this.httpService.get('https://fineli.fi/fineli/api/v1/foods/' + id),
    );
  };
}

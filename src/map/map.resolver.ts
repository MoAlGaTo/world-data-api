import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { MapService } from './map.service';
import { Country } from './dtos/country.dto';

@Resolver(() => Country)
@UseGuards(JwtAuthGuard)
export class MapResolver {
  constructor(private mapService: MapService) {}

  @Query(() => [Country])
  async getCountriesData(): Promise<Country[]> {
    const countries: Country[] = await this.mapService.getCountriesData();
    return countries;
  }
}

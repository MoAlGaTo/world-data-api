import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { Country } from './dtos/country.dto';
import * as geoJsonPlaces from 'geojson-places';

@Injectable()
export class MapService {
  constructor(private httpService: HttpService) {}

  async getCountriesData(): Promise<Country[]> {
    const response = await firstValueFrom(
      this.httpService
        .get<Country[]>('https://restcountries.com/v3.1/all')
        .pipe(
          map((response) => {
            const countries = response.data;
            return countries.map((country) => ({
              ...country,
              capital: country.capital || [],
              currencies: Object.keys(country.currencies || {}).map(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                (key) => country.currencies[key],
              ),
              languages: Object.values(country.languages || {}),
              geoJson: geoJsonPlaces.getCountryGeoJSONByAlpha2(country.cca2),
            }));
          }),
        ),
    );
    return response;
  }
}

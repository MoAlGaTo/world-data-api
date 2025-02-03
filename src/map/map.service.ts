import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { Country } from './dtos/country.dto';
// import { lookUp } from 'geojson-places';
import * as geoJsonPlaces from 'geojson-places';

@Injectable()
export class MapService {
  constructor(private httpService: HttpService) {}

  async getCountriesData(): Promise<Country[]> {
    // console.log('');
    // console.log(
    //   '>>> ',
    //   JSON.stringify(geoJsonPlaces.getCountryGeoJSONByAlpha2('AF')),
    // );
    // console.log('');
    const response = await firstValueFrom(
      this.httpService
        .get<Country[]>('https://countryinfoapi.com/api/countries')
        .pipe(
          map((response) => {
            const countries = response.data;
            return countries.map((country) => ({
              ...country,
              currencies: Object.entries(country.currencies || {}).map(
                ([code, details]) => ({ code, ...details }),
              ),
              languages: Object.values(country.languages),
              geoJson: geoJsonPlaces.getCountryGeoJSONByAlpha2(country.cca2),
            }));
          }),
        ),
    );
    return response;
  }

  getCountryGeoJson() {}
}

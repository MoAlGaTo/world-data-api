import { ObjectType, Field } from '@nestjs/graphql';
import { GeoJSONScalar } from './geojson.scalar';

@ObjectType()
class Currency {
  @Field()
  name: string;

  @Field()
  symbol: string;
}

@ObjectType()
class Maps {
  @Field()
  googleMaps: string;

  @Field()
  openStreetMaps: string;
}

@ObjectType()
class CountryName {
  @Field()
  common: string;

  @Field()
  official: string;
}

@ObjectType()
class Flags {
  @Field()
  png: string;
}

@ObjectType()
export class Country {
  @Field()
  name: CountryName;

  @Field(() => GeoJSONScalar, { nullable: true })
  geoJson: string;

  @Field(() => [String])
  tld: string[];

  @Field()
  cca2: string;

  @Field()
  ccn3: string;

  @Field()
  cca3: string;

  @Field()
  cioc: string;

  @Field()
  fifa: string;

  @Field()
  independent: boolean;

  @Field()
  status: string;

  @Field()
  unMember: boolean;

  @Field(() => [Currency])
  currencies: Currency[];

  @Field(() => [String])
  capital: string[];

  @Field(() => [String])
  altSpellings: string[];

  @Field()
  region: string;

  @Field()
  subregion: string;

  @Field(() => [String])
  continents: string[];

  @Field(() => [String])
  languages: string[];

  @Field(() => [Number])
  latlng: number[];

  @Field()
  landlocked: boolean;

  @Field(() => [String])
  borders: string[];

  @Field()
  area: number;

  @Field()
  flags: Flags;

  @Field()
  coatOfArms: string;

  @Field()
  population: number;

  @Field(() => Maps)
  maps: Maps;

  @Field({ nullable: true })
  postalCodeFormat?: string;

  @Field()
  startOfWeek: string;

  @Field(() => [String])
  timezones: string[];
}

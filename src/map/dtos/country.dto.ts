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
export class Country {
  @Field()
  name: string;

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

  @Field()
  callingcode: string;

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
  flag: string;

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

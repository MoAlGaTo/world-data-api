import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class UserDto {
  @Expose()
  @Field()
  firstName: string;

  @Expose()
  @Field()
  lastName: string;

  @Expose()
  @Field()
  email: string;

  @Expose()
  @Field()
  birthDate: Date;
}

import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Field()
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Field()
  password: string;

  @IsDate()
  @Field()
  birthDate: Date;
}

import { ObjectType, Field } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ObjectType()
export class LoginResponseDto {
  @Field()
  user: UserDto;
}

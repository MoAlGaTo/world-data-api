import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { UsersService } from './users.service';
import { CreateUserInput } from './dtos/create-user.input';
import { LoginInput } from './dtos/login.input';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { LoginResponseDto } from './dtos/login-response.dto';
import { CurrentUser } from './decorators/current-user-decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Mutation(() => User)
  @Serialize(UserDto)
  createUser(@Args('input') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => LoginResponseDto)
  async login(
    @Args('input') loginInput: LoginInput,
    @Context() context,
  ): Promise<LoginResponseDto> {
    return this.userService.login(loginInput, context);
  }

  @Query(() => User)
  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    return user;
  }

  @Mutation(() => Boolean)
  logout(@Context() context) {
    context.res.clearCookie('token');
    return true;
  }
}

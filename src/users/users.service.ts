import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dtos/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dtos/login.input';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async create(user: CreateUserInput) {
    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(user.password, salt);

    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async login(user: LoginInput): Promise<{
    user: UserDto;
    access_token: string;
  }> {
    const foundUser: User | null = await this.userModel.findOne({
      email: user.email,
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      user.password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Bad password');
    }

    const token = this.authService.login(foundUser._id);

    return {
      ...token,
      user: plainToClass(UserDto, foundUser),
    };
  }

  findOneById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId);
  }
}

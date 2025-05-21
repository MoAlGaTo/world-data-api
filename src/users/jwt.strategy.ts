import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';
import { PayloadToken } from './types/payload-token';
import { User } from './user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = (req as any).cookies?.token;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: PayloadToken): Promise<User> {
    const user: User | null = await this.usersService.findOneById(
      payload.userId,
    );

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

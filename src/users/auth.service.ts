import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './types/payload-token';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(userId: string): string {
    const payload: PayloadToken = { userId };
    return this.jwtService.sign(payload);
  }

  storeTokenInCookie(token: string, context): void {
    context.res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.production,
      sameSite: 'lax',
      maxAge: process.env.cookieMaxAge,
    });
  }
}

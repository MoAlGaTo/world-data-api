import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './types/payload-token';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(userId: string): { access_token: string } {
    const payload: PayloadToken = { userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

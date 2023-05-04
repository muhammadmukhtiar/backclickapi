import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
// import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    console.log("login3",ExtractJwt.fromAuthHeaderAsBearerToken())
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.getUser(payload);
    console.log("login3", payload, user)

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}



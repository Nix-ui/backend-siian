import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from './dto/auth-user.dto';
import { AuthService } from './auth.service';
import config from 'src/config/configuration';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
    const jwtSecret = config().jwt.secret;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtSecret,
    });
    }

    async validate(payload: JwtPayloadDto) {
    const user = await this.authService.validateUserByUuid(payload.uuid);
    if (!user) {
        throw new UnauthorizedException();
    }
    return user;
  }
}
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../config.json';

class AuthService extends Strategy {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.PASSPORT_JWT_SECRET,
    }, (payload, done) => {
      console.log(payload);
      return done(null, payload);
    });

  }
}

export default AuthService;
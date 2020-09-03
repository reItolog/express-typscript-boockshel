import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../config.json';

import { usersModel } from '../models/users/users.model';

class AuthService extends Strategy {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.PASSPORT_JWT_SECRET,
    },async (payload, done) => {
        try {
          const user = await usersModel.findUserById(payload.id)
           if (user) {
             return done(null, user)
           }
        } catch (e) {
          done(e.message, false)
        }
    });

  }
}

export default AuthService;
import passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';
import { usersModel } from '../models/users/users.model';
import config from '../config.json';

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: config.PASSPORT_JWT_SECRET,
};


const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await usersModel.findUserById(payload.id).catch(e => {
      console.log('user from jwtAuth not found')
    });

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate('jwt', {
  session: false,
});
import passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';
import {usersModel} from '../models/users/users.model';
import config from '../config.json';

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: config.PASSPORT_JWT_SECRET,
};



const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    console.log(payload);
    // Identify user by ID
    const user = await usersModel.findUserById(payload.id);

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
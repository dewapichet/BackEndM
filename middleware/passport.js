const User = require("../models/User");
const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require('passport');
require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
  module.exports.isLogin = passport.authenticate('jwt', { session: false });
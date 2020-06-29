const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../user/model/User");
const keys = process.env.JWT_USER_SECRET_KEY;
const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;
const userJWTLoginStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  const userEmail = payload.email;
  try {
    if (userEmail) {
      const user = await User.findOne({ email: userEmail });
      if (!user || user === null) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  } catch (e) {
    return done(error, false);
  }
});
module.exports = userJWTLoginStrategy;
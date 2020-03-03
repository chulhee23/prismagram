import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // authorization header 에서 jwt 찾는 역할
  secretOrKey: process.env.JWT_SECRET
}

const verifyUser  = async (payload, done) => {
  try {
    const user = await prisma.user({id: payload.id})
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);

    }

  } catch(err) {
    return done(err, false)
  }
}
passport.use(new Strategy(jwtOptions, verifyUser))

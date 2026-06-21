const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "http://localhost:4000/api/v1/auth/google/callback",
      passReqToCallback: true,
    },

    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const accountType = req.query.state || "Student";
        console.log("ACCOUNT TYPE =", accountType);
        
        let user = await User.findOne({
          email: profile.emails[0].value,
        });

        if (!user) {

          const randomPassword = await bcrypt.hash(
            Math.random().toString(36),
            10
          );

          const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
          });

          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName || "",
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            accountType,
            password: randomPassword,
            additionalDetails: profileDetails._id,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
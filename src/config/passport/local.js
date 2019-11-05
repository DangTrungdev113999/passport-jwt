const passport    = require('passport');
const passportJWT = require("passport-jwt");
const User = require("./../../models/User");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, cb) {
        try {       
          let user = await User.findOne({email}).lean().exec();
          if (!user) {
            return cb(null, false, {message: 'Incorrect email or password.'});
          };
          return cb(null, user, {
            message: 'Logged In Successfully'
          });
        } catch (error) {
          return cb(error);
        }
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return User.findOneById(jwtPayload._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
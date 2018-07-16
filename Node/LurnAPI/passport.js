var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./models/users');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findUserById(jwt_payload.id, function (err, user) {
            if (err) {
                console.log(jwt_payload.id)
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                console.log(user);
                return done(null, false)
            }
        })
    }))
}
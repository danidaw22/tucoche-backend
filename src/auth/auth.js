const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config')
const User = require('../models/usuario')

passport.use('auth', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
}, async(payload, done) => {
    try {
        const user = await User.findById(payload.sub)
        if (!user) {
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

const auth = passport.authenticate('auth', {
    session: false,
})

passport.use('user', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
}, async(payload, done) => {

    try {

        const user = await User.findById(payload.sub)

        if (!user) {
            done(null, false)
        } else {
            done(null, user)
        }

    } catch (error) {
        done(error, false)
    }
}))

const user = passport.authenticate('user', {
    session: false,
})

module.exports = { auth, user }
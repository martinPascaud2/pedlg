const passport = require('passport');

const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');

const {
    CLIENT_URL,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = process.env;

const LoadStrategyOAuth = () => {
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    const callback = (accessToken, refreshToken, profile, done) => done(null, profile);

    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: `${CLIENT_URL}/auth/oauth?p=google`,
                EnableProof: true,
                scope: ['profile', 'email'],
            },
            callback,
        ),
    );
    passport.use(
        new FacebookStrategy(
            {
                clientID: FACEBOOK_APP_ID,
                clientSecret: FACEBOOK_APP_SECRET,
                callbackURL: `${CLIENT_URL}/auth/oauth?p=facebook`,
                enableProof: true,
                profileFields: ['id', 'displayName', 'photos', 'email', 'name'],
                scope: ['email'],
            },
            callback,
        ),
    );
};

module.exports = LoadStrategyOAuth;

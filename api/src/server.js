const { ApolloServer, PubSub } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const passport = require('passport');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const pubsub = new PubSub();

const { facebookAuth, googleAuth, providerCallback } = require('./controllers');
const { loadStrategyOAuth, formatError } = require('./helpers/middlewares');

const {
    SERVER_HOST,
    SERVER_PORT,
    CLIENT_URL,
    NODE_ENV,
    CLIENT_DOMAIN,
} = process.env;

const env = NODE_ENV || 'development';
const app = express();

// CORS configurations

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        const whitelist = [`${SERVER_HOST}:${SERVER_PORT}`, CLIENT_URL];

        if (
            !origin
            || whitelist.indexOf(origin) !== -1
            || origin.includes(CLIENT_DOMAIN)
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

// ApolloServer configurations

const server = new ApolloServer({
    playground: env === 'development',
    context: ({ req, res, connection }) => ({
        req, res, pubsub, connection,
    }),
    tracing: false,
    formatError,
    resolvers,
    typeDefs,
});

app.use(cookieParser());

// Routes to OAuth and initialization of passportjs and these strategies
app.use(cors(corsOptions));

app.use(passport.initialize());
loadStrategyOAuth();

app.get('/auth/facebook', facebookAuth);
app.get('/auth/facebook/callback', facebookAuth, providerCallback);

app.get('/auth/google', googleAuth);
app.get('/auth/google/callback', googleAuth, providerCallback);

// //////////////////////////////////////////////////////////////////////

// Generate logs files about the user’s requests
app.use(morgan('dev'));

// Security middleware that handles several kinds of attacks in the HTTP/HTTPS
app.use(helmet());

app.use('/static', express.static(`${__dirname}/public`));

server.applyMiddleware({ app, path: '/api', cors: corsOptions });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: SERVER_PORT }, () => {
    console.log(
        'Mode :',
        env.toUpperCase(),
        env === 'development' ? '🚧' : '🌐',
    );
    console.log(`🚀 Server ready at ${SERVER_HOST}:${SERVER_PORT}`);
    console.log(
        `🚀 Subscriptions ready at ws://${SERVER_HOST}:${SERVER_PORT}${server.subscriptionsPath}`,
    );
});

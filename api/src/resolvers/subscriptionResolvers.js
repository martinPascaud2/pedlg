const { withFilter } = require('apollo-server-express');

const MESSAGE_CREATED = 'MESSAGE_CREATED';

const { isAuthSubcription } = require('../helpers/middlewares/authorization');

const Subscription = {
    messageAdded: {
        async subscribe(_, params, ctx) {
            return isAuthSubcription(ctx.connection, (userId) => withFilter(
                () => ctx.pubsub.asyncIterator([MESSAGE_CREATED]),
                (payload) => {
                    console.log({ payload: payload.messageAdded });
                    return (
                        payload.messageAdded.receiverId === userId
                            || !!payload.messageAdded.receiverId
                    );
                },
            )(_, params, ctx));
        },
    },
};

module.exports = Subscription;

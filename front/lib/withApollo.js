import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';

import { ApolloClient } from 'apollo-client';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { getInMemoryToken } from 'lib/utils/auth/token';

const wsLink = () => {
    if (process.browser)
        return new WebSocketLink({
            uri: process.env.API_WSS,
            options: {
                reconnect: true,
            },
        });
    return null;
};
const httpLink = createHttpLink({
    fetch,
    uri: `${process.env.API_URL}/api`,
    credentials: 'include',
});

const splitLink = () => {
    if (process.browser)
        return split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
                );
            },
            wsLink(),
            httpLink
        );
    return httpLink;
};

const authLink = setContext((_, context) => {
    const token = context.token || getInMemoryToken().token;

    return {
        headers: {
            ...context.headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
    },
    mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
    },
};

export default withApollo(() => {
    return new ApolloClient({
        link: authLink.concat(splitLink()),
        cache: new InMemoryCache(),
        defaultOptions,
    });
});

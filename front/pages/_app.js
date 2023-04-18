import App from 'next/app';
import PropTypes from 'prop-types';

import { Provider as ReduxProvider } from 'react-redux';
import withRedux from 'lib/withRedux';

import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from 'lib/withApollo';

import withAuth from 'lib/withAuth';

import { ModalProvider } from 'components/Modal/ModalContext';
import ToastContainer from 'components/Toast/ToastContainer';

import 'styles/app.scss';
import 'react-chat-elements/dist/main.css';

const Main = ({ Component, pageProps, apollo, store }) => (
    <ApolloProvider client={apollo}>
        <ReduxProvider store={store}>
            <ModalProvider>
                <Component {...pageProps} />
                <ToastContainer />
            </ModalProvider>
        </ReduxProvider>
    </ApolloProvider>
);

Main.getInitialProps = app => App.getInitialProps(app);

Main.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.instanceOf(Object),
    apollo: PropTypes.instanceOf(Object).isRequired,
    store: PropTypes.instanceOf(Object).isRequired,
};

Main.defaultProps = {
    pageProps: {},
};

export default withApollo(withRedux(withAuth(Main)));

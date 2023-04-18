import withRedux from 'next-redux-wrapper';
import createStore from 'store/createStore';

export default withRedux(createStore, {
    debug: true,
});

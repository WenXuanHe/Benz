export default {

    namespace: 'home',

    state: {
        text: 'home'
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            history.listen((location) => {
                console.log(1, location);
            });
        },
    },

    effects: {
        *queryCount({ payload }, { call, put }) {  // eslint-disable-line
            alert('home');
            yield put({ type: 'save' });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
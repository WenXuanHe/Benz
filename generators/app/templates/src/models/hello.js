export default {

    namespace: 'hello',

    state: {
        text: 'hello'
    },

    effects: {
        *queryCount({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'hello' });
            return;
        },
    },

    reducers: {
        hello(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
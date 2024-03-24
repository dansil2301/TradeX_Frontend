import { createStore } from 'redux';

const initialState = {
    candleInterval: 'CANDLE_INTERVAL_1_MIN',
    graphType: 'candle',
    strategy: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CANDLE_INTERVAL':
            return { ...state, candleInterval: action.payload };
        case 'SET_GRAPH_TYPE':
            return { ...state, graphType: action.payload };
        case 'SET_STRATEGY':
            return { ...state, strategy: action.payload };
        default:
            return state;
    }
};

const store = createStore(rootReducer);

export default store;
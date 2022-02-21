import { createStore, applyMiddleware, combineReducers } from 'redux';

import main from './main/reducer';

const rootReducer = combineReducers({
    main
});

export default createStore(rootReducer);

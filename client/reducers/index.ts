import { combineReducers } from 'redux-immer';
import { produce, setAutoFreeze } from 'immer';

setAutoFreeze(false);

import search from "./search.reducer";
const searchApp = combineReducers(produce, {
  search
});
export default searchApp;

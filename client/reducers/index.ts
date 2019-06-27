import { combineReducers } from "redux";

import search from "./search.reducer";
const searchApp = combineReducers({
  search
});
export default searchApp;

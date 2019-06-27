import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
// import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchReducer from "../components/search/search.reducer";

const persistConfig = {
  key: "root",
  storage
};

const searchAppReducer = combineReducers({
  search: searchReducer
});

const persistedReducer = persistReducer(persistConfig, searchAppReducer);

export function initializeStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
}

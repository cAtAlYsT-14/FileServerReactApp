import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

// Create Redux store with initial state
const store = createStore(rootReducer, composeWithDevTools());

export default store;
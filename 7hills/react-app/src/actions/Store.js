import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { reducers } from "../reducers";
import logger from 'redux-logger'

export const store = createStore(
  /*firstparameter is for reducers */
  reducers,
  /* second parameter is for middleware*/
  composeWithDevTools(
    applyMiddleware(thunk,logger)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

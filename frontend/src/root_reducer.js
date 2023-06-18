import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default (history) => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
  });

  return (state = {}, action) => {
    if (!action) return state;
    return rootReducer(state, action);
  };
};
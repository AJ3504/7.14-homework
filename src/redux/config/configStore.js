import React from "react";
import { combineReducers, createStore } from "redux";
import content from "redux/modules/content";

const rootReducer = combineReducers({
  content: content,
});

const store = createStore(rootReducer);

export default store;

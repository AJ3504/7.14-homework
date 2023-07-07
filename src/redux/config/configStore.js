import { configureStore } from "@reduxjs/toolkit";
import contentsSlice from "redux/modules/contentsSlice";

//ASIS
// const rootReducer = combineReducers({
//   content: content,
// });
// const store = configureStore(rootReducer);

//TODO
const store = configureStore({
  reducer: {
    contentsSlice: contentsSlice,
  },
});

export default store;

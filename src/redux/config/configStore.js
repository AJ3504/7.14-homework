import { configureStore } from "@reduxjs/toolkit";
import contentsSlice from "redux/modules/contentsSlice";
import userSlice from "redux/modules/userSlice";

//ASIS
// const rootReducer = combineReducers({
//   content: content,
// });
// const store = configureStore(rootReducer);

//TODO
const store = configureStore({
  reducer: {
    contentsSlice: contentsSlice,
    userSlice: userSlice,
  },
});

export default store;

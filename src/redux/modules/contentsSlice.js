import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const contentsSlice = createSlice({
  name: "contents",
  initialState: [],
  reducers: {
    addContent: (state, action) => {
      // return [...state, action.payload];  =>기존에는 이렇게 했었는데,
      state.push(action.payload);
    },

    deleteContent: (state, action) => {
      return state.filter((item) => item.id !== action.payload); //삭제시의 action.payload는 클릭한 그 id
    },

    editContent: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          //수정시의 action.payload는 내용수정한 그 게시물
          console.log(action.payload);
          return action.payload;
        } else {
          console.log(item);
          return item;
        }
      });
      // const index = state.findIndex((item) => item.id === action.payload.id);
      // state[index] = action.payload;
    },
  },
});

export default contentsSlice.reducer;
export const { addContent, deleteContent, editContent } = contentsSlice.actions;

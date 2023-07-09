import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const contentsSlice = createSlice({
  name: "contents",
  initialState: [
    {
      title: "여름휴가에 읽기 좋은 책 추천",
      body: "이제 7월 말이 되면 본격적인 여름휴가 시즌이 시작됩니다. 여름휴가라는 단어만 들어도 설레고 기분이 좋아지는데요. 오늘은 검정고양이가 여름휴가에 읽으면 좋을만한 책을 소개하려고 해요.",
      id: shortid.generate(),
    },
  ],
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

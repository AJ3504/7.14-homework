import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

// //action value
// const ADD_CONTENT = "ADD_CONTENT";

// //action creator
// export const addContent = (payload) => {
//   return { type: ADD_CONTENT, payload };
// };

//initialState
//

// //reducer
// const contents = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_CONTENT:
//       return [...state, action.payload];

//     default:
//       return state;
//   }
// };

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
      return [...state, action.payload];
    },
  },
});

export default contentsSlice.reducer;
export const { addContent } = contentsSlice.actions; //const 키워드 안써주면 오류 발생

//ASIS
// export default contents;

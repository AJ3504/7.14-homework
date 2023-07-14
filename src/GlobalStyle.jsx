import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: #fbd95db1;
    font-family: 'NeoDunggeunmoPro-Regular', sans-serif;
    font-weight: bold;
    /* color: #6a3e03df; */
    color: black;
    line-height: 1.5;
  }

  @font-face {
    font-family: 'NeoDunggeunmoPro-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/NeoDunggeunmoPro-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  
 
`;

export default GlobalStyle;

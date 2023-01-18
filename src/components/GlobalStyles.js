import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {

  /* color */
    --color-main-blue: #646FD4;
    --color-main-white: #FFFFFF;
    --color-main-brown:#ded7b1;
    --color-main-gray: #dddddd; 
    --color-point-pink:  #f54748;
    --color-font-darkgray: #393e46;
    --color-filter-background: #BDE6F1;
  
/* font family */
   --font-poppins: 'Poppins', sans-serif;
   --font-crimson: 'Crimson Text' ;
   --font-opensans: "Open Sans";

  /* font size */
  --font-large: 48px;
  --font-medium: 28px;
  --font-regular: 16px;
  --font-small: 14px;
  --font-micro: 12px;

  /* font weight */
  --weight-bold: 700;
  --weight-semi-bold: 600;
  --weight-regular: 400;
  --weight-thin: 300;

}

html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
   
  }

ol, ul, li{
      list-style: none;
      
  }

body {
   width: 100vw;
      background-color: #222222;
     
}

`;

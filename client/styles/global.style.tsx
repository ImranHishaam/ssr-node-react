import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Playfair+Display|Source+Sans+Pro:200,400');

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
}

p, a {
  font-family: 'Source Sans Pro', sans-serif;
}

/* Generic styles */
html {
  scroll-behavior: smooth;
}
`;

export default GlobalStyle;
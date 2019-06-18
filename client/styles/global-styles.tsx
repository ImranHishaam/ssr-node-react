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

.wrapper {
  text-align: center;
}

/* breweries styles */
.breweries {
  padding: 2rem;
}

.infinite-scroll-component  > ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
}

.infinite-scroll-component  > ul > li {
  border: 1px solid #E2E2E2;
  border-radius: .5rem;
  list-style: none;
}

.infinite-scroll-component  > ul > li > figure {
  max-height: 220px;
  overflow: hidden;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
  position: relative;
}

.infinite-scroll-component  > ul > li > figure > img {
  width: 100%;
}

.infinite-scroll-component  > ul > li > figure > figcaption {
  position: absolute;
  bottom: 0;
  background-color: rgba(0,0,0,.7);
  width: 100%;
}

.infinite-scroll-component  > ul > li > p {
  font-size: 1rem;
  line-height: 1.5;
  padding: 1rem .75rem;
  color: #666666;
}

.infinite-scroll-component  > ul > li > a {
  padding: .5rem 1rem;
  margin: .5rem;
}

input {
	margin:15px 0;
	padding:15px 10px;
	width:100%;
	outline:none;
	border:1px solid #bbb;
	border-radius:20px;
  display:inline-block;
  text-align: center;
  width: 50%;
}

`;

export default GlobalStyle;
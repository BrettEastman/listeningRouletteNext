import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  --text-color: #1F1F1F;
  --text-color-light: #3D3D3D;
  --text-color-tuscan-red: #B33A3A;
}

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

p {
  font-size: 1.25rem;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  background-image: linear-gradient(215deg, hsl(204, 53%, 62%) 0%, hsl(60, 43%, 92%) 74%);
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
  color: var(--text-color-light);
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}
`;

export default GlobalStyles;

import { css } from '@emotion/react';

export const rootStyle = css`
  :root {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    --avatar: #fcc934;
    --background: #2a2b2e;
    --incoming-bg-color: #31343a;
    --outgoing-bg-color: #0b57d0
      linear-gradient(130deg, #0842a0 30%, #07347e 95%);
    --incoming-color: #e8eaed;
    --outgoing-color: #fff;
    --input-color: #e8eaed;
    --input-bg-color: #3c4043;
    --input-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15),
      0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 -0.1px 3px 0 rgba(0, 0, 0, 0.08);
    --button-shadow: 0 0 2px rgb(0 0 0 / 18%), 0 2px 8px rgb(0 0 0 / 18%);
    --button-inactive-color: #9aa0a6;
    --button-active-color: #1a73e8;
    --icon-color: #dadce0;
    --icon-disabled-color: rgba(232, 234, 237, 0.38);
  }
`;
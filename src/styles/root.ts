import { css } from '@emotion/react';

export const rootStyle = css`
  :root {
    --font-base: 'Roboto', sans-serif;
    --base-size: 16px;
    --avatar: #fcc934;
    --background: #202124;
    --incoming-bg-color: #31343a;
    --outgoing-bg-color: #0b57d0
      linear-gradient(130deg, #0842a0 30%, #07347e 95%);
    --incoming-color: #e8eaed;
    --outgoing-color: #fff;
    --input-color: #e8eaed;
    --input-bg-color: #3c4043;
    --input-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15),
      0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 -0.1px 3px 0 rgba(0, 0, 0, 0.08);
    --button-shadow: 0 2px 4px rgb(0 0 0 / 14%), 0 3px 4px rgb(0 0 0 / 12%);
    --button-inactive-color: #9aa0a6;
    --button-active-color: #1a73e8;
    --icon-color: #dadce0;
    --icon-disabled-color: rgba(232, 234, 237, 0.38);
    --modal-bg-color: #2a2b2e;
    --modal-color: #e8eaed;
    --modal-shadow: 0 -2px 8px rgba(0, 0, 0, 0.09),
      0 4px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.3),
      0 2px 6px rgba(0, 0, 0, 0.15);

    font-family: var(--font-base);
    font-size: var(--base-size);
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
  }
`;

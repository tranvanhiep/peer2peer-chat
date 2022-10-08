import { Global } from '@emotion/react';
import resetStyle from '@styles/reset';
import rootStyle from '@styles/root';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const GlobalStyle = () => (
  <>
    <Global styles={resetStyle} />
    <Global styles={rootStyle} />
  </>
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

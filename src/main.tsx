import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { rootStyle, resetStyle } from './styles';

const GlobalStyle = () => (
  <>
    <Global styles={resetStyle} />
    <Global styles={rootStyle} />
  </>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

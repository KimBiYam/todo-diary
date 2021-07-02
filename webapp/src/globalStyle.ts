import emotionReset from 'emotion-reset';
import { css } from '@emotion/react';

const globalStyle = css`
  ${emotionReset}

  html {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 16px;

    body,
    #root {
      width: inherit;
      height: inherit;
    }

    * {
      box-sizing: inherit;
      font-size: inherit;
    }
  }
`;

export default globalStyle;

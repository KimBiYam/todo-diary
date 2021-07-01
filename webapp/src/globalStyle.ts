import emotionReset from 'emotion-reset';
import { css } from '@emotion/react';

const globalStyle = css`
  ${emotionReset}

  html {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    body,
    #root {
      width: inherit;
      height: inherit;
    }

    * {
      box-sizing: inherit;
    }
  }
`;

export default globalStyle;

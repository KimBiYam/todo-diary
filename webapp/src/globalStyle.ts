import emotionReset from 'emotion-reset';
import { css } from '@emotion/react';

const globalStyle = css`
  ${emotionReset}

  html {
    box-sizing: border-box;

    * {
      box-sizing: inherit;
    }
  }
`;

export default globalStyle;

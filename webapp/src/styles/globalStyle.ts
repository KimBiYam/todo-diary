import emotionReset from 'emotion-reset';
import { css } from '@emotion/react';
import { COLORS } from '../styles';

const globalStyle = css`
  ${emotionReset}

  html {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Noto Sans CJK KR';

    body {
      background-color: ${COLORS.pageBase};
    }

    body,
    #root {
      width: inherit;
      height: inherit;
    }

    * {
      box-sizing: inherit;
      font-size: inherit;
      font-family: inherit;
    }
  }
`;

export default globalStyle;

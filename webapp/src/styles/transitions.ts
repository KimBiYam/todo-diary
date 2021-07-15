import { keyframes } from '@emotion/react';

export const shining = keyframes`
    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
`;

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const fadeOut = keyframes`
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
`;

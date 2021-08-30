import { useEffect, useState } from 'react';

export type Dimensions = { width: number; height: number };

const useWindowDimensions = () => {
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    const { innerWidth: width, innerHeight: height } = window;

    setWindowSize({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowDimensions;

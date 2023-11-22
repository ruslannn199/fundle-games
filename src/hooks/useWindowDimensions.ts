import { useEffect, useState } from 'react';

interface windowDimensions {
  width: number;
  height: number;
}

const getWindowDimensions = (): windowDimensions => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<windowDimensions>(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;

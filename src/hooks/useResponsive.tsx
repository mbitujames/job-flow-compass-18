import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width ? windowSize.width <= 768 : false;
  const isTablet = windowSize.width ? windowSize.width > 768 && windowSize.width <= 1024 : false;
  const isDesktop = windowSize.width ? windowSize.width > 1024 : false;

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
  };
};
import { useState, useEffect } from 'react';

const useIsMobileViewport = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      const nextIsMobile = window.innerWidth <= 768;
      setIsMobile(prev => (prev !== nextIsMobile ? nextIsMobile : prev));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useIsMobileViewport;
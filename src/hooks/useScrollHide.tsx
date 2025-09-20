import { useState, useEffect } from 'react';

export const useScrollHide = (threshold: number = 100) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // إظهار الشريطين عند الصعود أو عندما نكون في أعلى الصفحة
      if (currentScrollY < lastScrollY || currentScrollY < threshold) {
        setIsVisible(true);
      } 
      // إخفاء الشريطين عند النزول
      else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, threshold]);

  return isVisible;
};
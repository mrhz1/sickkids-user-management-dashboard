import { useState, useEffect } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: Breakpoint;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: 'desktop',
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setState({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          breakpoint: 'mobile',
        });
      } else if (width < 1024) {
        setState({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          breakpoint: 'tablet',
        });
      } else {
        setState({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          breakpoint: 'desktop',
        });
      }
    };

    updateState();
    window.addEventListener('resize', updateState);
    return () => window.removeEventListener('resize', updateState);
  }, []);

  return state;
};

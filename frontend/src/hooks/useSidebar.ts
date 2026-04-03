import { useContext } from 'react';
import { LayoutContext } from '../components/organisms/LayoutContext';

export const useSidebar = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useSidebar must be used within LayoutProvider');
  }

  return context;
};

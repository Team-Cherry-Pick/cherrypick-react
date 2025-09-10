import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GA4Events } from '@/utils/ga4';

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    GA4Events.pageView(location.pathname);
  }, [location.pathname]);

  return null;
};

export default PageTracker;

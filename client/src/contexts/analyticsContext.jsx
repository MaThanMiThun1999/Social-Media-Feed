import React, { createContext, useContext, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { googleTrackingId } from '../config/envConfig';

const AnalyticsContext = createContext();

const TRACKING_ID = googleTrackingId;

const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        ReactGA.initialize(TRACKING_ID);
      } catch (error) {
        console.error('Error initializing Google Analytics:', error);
      }
    }
  }, []);

  const logPageView = location => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  };

  const logEvent = (category, action, label) => {
    ReactGA.send({
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    });
  };

  return (
    <AnalyticsContext.Provider value={{ logPageView, logEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export { AnalyticsProvider, useAnalytics };

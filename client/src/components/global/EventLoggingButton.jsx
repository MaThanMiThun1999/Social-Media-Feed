import React from 'react';
import { useAnalytics } from '../../contexts/analyticsContext';

const EventLoggingButton = ({
  children,
  category,
  action,
  label,
  ...props
}) => {
  const { logEvent } = useAnalytics();

  const handleClick = event => {
    if (logEvent) {
      logEvent(category, action, label);
    } else {
      console.warn(
        'logEvent function not available.  Ensure AnalyticsProvider is correctly set up.'
      );
    }

  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default EventLoggingButton;

import moment from 'moment';

export const formatDate = dateString => {
  const date = moment(dateString);

  if (!date.isValid()) {
    return 'Invalid Date';
  }

  return date.format('MMM D, YYYY h:mm A');
};

export const formatRelativeTime = dateString => {
  const date = moment(dateString);

  if (!date.isValid()) {
    return 'Invalid Date';
  }

  return date.fromNow();
};

export const formatCustomDate = (
  dateString,
  formatString = 'MMM D, YYYY h:mm A'
) => {
  const date = moment(dateString);

  if (!date.isValid()) {
    return 'Invalid Date';
  }

  return date.format(formatString);
};

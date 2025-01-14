import toast from 'react-hot-toast';

export const handleError = (error, setError) => {
  const errorMessage =
    error?.response?.data?.message || 'An unexpected error occurred';
  console.error(errorMessage);

  toast.error(errorMessage);

  if (setError) {
    setError(errorMessage);
  }
};

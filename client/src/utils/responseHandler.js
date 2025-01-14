export const handleResponse = (response, setData, setLoading = () => {}) => {
  if (response?.data) {
    setData(response.data.data || response.data);
  }
  if (typeof setLoading === 'function') {
    setLoading(false); 
  }
};

export const errorHandler = (error, set) => {
  const errorMessage =
    error.response?.data?.message || 'An unexpected error occurred';
  set({ error: errorMessage });
  console.error('Error:', error);
};

export const responseHandler = (response, set, stateKey) => {
  const { data, status } = response;
  if (status >= 200 && status < 300) {
    set({
      message: data.message,
      [stateKey]: data.data,
      error: null,
    });
  } else {
    set({ error: data.message || 'An unexpected error occurred' });
  }
};
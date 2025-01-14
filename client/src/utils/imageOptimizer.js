export const getOptimizedImageUrl = (url, transformations = {}) => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  const baseCloudinaryUrl = 'https://res.cloudinary.com/dpkqselpi/image/upload';

  const [_, path] = url.split('/upload/');
  if (!path) {
    console.warn('Unable to extract path from Cloudinary URL:', url);
    return url;
  }

  const transformationString = Object.entries(transformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  return `${baseCloudinaryUrl}/${transformationString}/${path}`;
};

import axiosInstance from '../services/axiosInstance';

const uploadFile = async (
  file,
  onUploadProgress,
  folder = 'general',
  resourceType = 'auto'
) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('folder', folder);
    formData.append('resource_type', resourceType);

    const response = await axiosInstance.post('/user/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return response.data.data.secure_url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default uploadFile;

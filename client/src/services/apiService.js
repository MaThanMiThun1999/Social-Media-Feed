import axiosInstance from './axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import uploadFile from '../utils/fileUploadHandler';

export const postData = async (url, data, successMessage = null) => {
  try {
    const response = await axiosInstance.post(url, data);

    return handleResponse(response, successMessage);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const getData = async url => {
  try {
    const response = await axiosInstance.get(url);
    return handleResponse(response.data.data);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const deleteData = async url => {
  try {
    const response = await axiosInstance.delete(url);
    return handleResponse(response);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const uploadFileToCloudinary = async (
  file,
  onUploadProgress,
  folder,
  resourceType,
  setError
) => {
  try {
    const uploadedImageUrl = await uploadFile(
      file,
      onUploadProgress,
      folder,
      resourceType
    );

    return uploadedImageUrl;
  } catch (error) {
    handleError(error, setError);
    throw error;
  }
};

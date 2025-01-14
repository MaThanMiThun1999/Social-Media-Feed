import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const useUserProfileStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  uploadProgress: 0,

  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/user/profile');
      handleResponse(response, data => set({ user: data, isLoading: false }));
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  updateUserProfile: async (name, bio, phoneNumber) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put('/user/profile', {
        name,
        bio,
        phoneNumber,
      });

      handleResponse(response, data => {
        set({ user: data, isLoading: false });
        toast.success('Profile updated successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
  uploadProfileImage: async imageData => {
    set({ isLoading: true, error: null, uploadProgress: 0 });
    try {
      const formData = new FormData();
      formData.append('profileImage', imageData);

      const response = await axiosInstance.post(
        '/user/profile/image',
        formData,
        {
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            set({ uploadProgress: progress });
          },
        }
      );


      handleResponse(response, data => {
        set({ user: data, isLoading: false, uploadProgress: 100 });
        toast.success('Profile image updated!');
      });
    } catch (error) {
      handleError(error, message =>
        set({ error: message, isLoading: false, uploadProgress: 0 })
      );
      throw error;
    }
  },
  changePassword: async (oldPassword, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put('/user/profile/password', {
        oldPassword,
        newPassword,
      });
      handleResponse(response, () => {
        set({ isLoading: false });
        toast.success('Password changed successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
      throw error;
    }
  },
  deleteUserProfile: async password => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete('/user/profile', {
        data: {
          password,
        },
      });
      handleResponse(response, () => {
        set({ isLoading: false, user: null });
        toast.success('Account deleted successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
}));

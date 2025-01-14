import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  currentPost: null,

  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/post', postData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      handleResponse(response, (data) => {
        set({ isLoading: false,  });
        toast.success('Post created successfully!');
        get().fetchPosts();
      });
    } catch (error) {
      handleError(error, (message) =>
        set({ error: message, isLoading: false })
      );
    }
  },

  updatePost: async (postId, postData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/post/${postId}`, postData);
      handleResponse(response, (data) => {
        set({ isLoading: false });
        toast.success('Post updated successfully!');
          set((state) => ({
            posts: state.posts.map((post) =>
                post._id === postId ? data : post
            ),
          }));
          get().fetchPostById(postId);
      });
    } catch (error) {
      handleError(error, (message) =>
        set({ error: message, isLoading: false })
      );
    }
  },

  deletePost: async (postId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/post/${postId}`);
      handleResponse(response, () => {
        set((state) => ({
          posts: state.posts.filter((post) => post._id !== postId),
          isLoading: false,
        }));
        toast.success('Post deleted successfully!');
      });
    } catch (error) {
      handleError(error, (message) =>
        set({ error: message, isLoading: false })
      );
    }
  },

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/post');
      handleResponse(response, (data) =>
        set({ posts: data.posts, isLoading: false })
      );
    } catch (error) {
      handleError(error, (message) =>
        set({ error: message, isLoading: false })
      );
    }
  },
  fetchPostById: async (postId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/post/${postId}`);
      handleResponse(response, (data) => {
          set({ currentPost: data.post, isLoading: false });
      });
    } catch (error) {
      handleError(error, (message) =>
        set({ error: message, isLoading: false })
      );
    }
  },
    likePost: async (postId) => {
        try {
            const response = await axiosInstance.post(`/post/${postId}/like`);
            handleResponse(response, (data) => {
               set((state) => ({
                    posts: state.posts.map((post) =>
                        post._id === postId ? data.post : post
                    ),
                   currentPost: data.post
                }));
            });
        } catch (error) {
            handleError(error, (message) => {
                toast.error(message)
            });
            throw error
        }
    },
    addComment: async (postId, commentText) => {
        try {
            const response = await axiosInstance.post(`/post/${postId}/comment`, {
                text: commentText
            });
            handleResponse(response, (data) => {
                set((state) => ({
                    posts: state.posts.map((post) =>
                        post._id === postId ? data.post : post
                    ),
                     currentPost: data.post,
                }));
            });
             toast.success('Comment added successfully!');
        } catch (error) {
            handleError(error, (message) => {
                toast.error(message)
            });
             throw error
        }
    },

    deleteComment: async (postId, commentId) => {
        try {
            const response = await axiosInstance.delete(`/post/${postId}/comment/${commentId}`);
            handleResponse(response, (data) => {
                 set((state) => ({
                    posts: state.posts.map((post) =>
                        post._id === postId ? data.post : post
                    ),
                      currentPost: data.post
                }));
            });
            toast.success('Comment deleted successfully!');
        } catch (error) {
           handleError(error, (message) => {
                toast.error(message)
            });
             throw error
        }
    },
}));
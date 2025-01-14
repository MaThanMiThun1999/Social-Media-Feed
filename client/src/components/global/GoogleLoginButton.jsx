import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../services/axiosInstance';
import toast from 'react-hot-toast';

const GoogleButtons = ({ chooseBtn = 'login' }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (response) => {
    setLoading(true); 
    try {
      const token = response.credential;
      const res = await axios.post('/auth/google', { token, action: 'login' });
      toast.success(res.data.message || 'Logged in successfully');
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Internal server error:', error);
        toast.error(
          'An error occurred while authenticating with Google. Please try again later.'
        );
      } else {
        console.debug('Error authenticating with Google:', error);
        toast.error(error.response.data.message || 'Login failed');
      }
      console.error('Google login failed:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleSignup = async (response) => {
    setLoading(true); // Start loading
    try {
      const token = response.credential;
      const res = await axios.post('/auth/google', { token, action: 'signup' });
      toast.success(res.data.message || 'Signed up successfully');
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Internal server error:', error);
        toast.error(
          'An error occurred while authenticating with Google. Please try again later.'
        );
      } else {
        console.debug('Error authenticating with Google:', error);
        toast.error(error.response.data.message || 'Signup failed');
      }
      console.error('Google signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative w-full'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-[#5194EE] rounded-md z-10'>
          <div className='w-8 h-8 border-4 border-blue-200 border-t-transparent rounded-full animate-spin'></div>
          <span className='ml-2 font-bold text-plain-white-background'>
            Please wait
            <span className='animate-ping'>.</span>
            <span className='animate-ping'>.</span>
            <span className='animate-ping'>.</span>
          </span>
        </div>
      )}

      {/* Google Button */}
      <div className={`${loading ? 'opacity-50 pointer-events-none' : ''}`}>
        {chooseBtn === 'login' ? (
          <GoogleLogin
            auto_select
            shape='rectangular'
            type='standard'
            useOneTap
            width='100%'
            text='signin_with'
            theme='filled_blue'
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLogin}
          />
        ) : (
          <GoogleLogin
            auto_select
            shape='rectangular'
            type='standard'
            width='100%'
            useOneTap
            text='signup_with'
            theme='filled_blue'
            onSuccess={handleGoogleSignup}
            onError={handleGoogleSignup}
          />
        )}
      </div>
    </div>
  );
};

export default GoogleButtons;

import React, { useState, useRef, useEffect, memo } from 'react';
import { useUserProfileStore } from '../../store/userProfileStore';
import { uploadFileToCloudinary } from '../../services/apiService';
import axiosInstance from '../../services/axiosInstance';
import toast from 'react-hot-toast';
import LoadingSpinner from '../animations/loader/LoadingSpinner';
import ProgressBar from '../../components/global/ProgressBar';
import FileInputButton from '../../components/global/FileInputButton';
import ErrorThrower from '../base/ErrorThrower';
import OptimizedImage from '../base/OptimizedImage';

const UploadProfileImage = () => {
  const { user, fetchUserProfile, uploadProgress, error } =
    useUserProfileStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(user.profileImage); // Initialize with current image
  const fileInputRef = useRef(null);

  // File change handler
  const handleImageChange = e => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (isUploading && uploadProgress !== null) {
      const progressInterval = setInterval(() => {
        setDisplayProgress(prev => {
          if (prev < uploadProgress) return prev + 1;
          if (uploadProgress === 100) clearInterval(progressInterval);
          return prev;
        });
      }, 30);

      return () => clearInterval(progressInterval);
    }
  }, [uploadProgress, isUploading]);

  const handleUpload = async () => {
    if (selectedImage) {
      setIsUploading(true);
      setIsSuccess(false);

      try {
        const uploadedImageUrl = await uploadFileToCloudinary(
          selectedImage,
          progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            useUserProfileStore.setState({ uploadProgress: progress });
          },
          `profile_images/${user.username}`,
          'image',
          errorMessage => useUserProfileStore.setState({ error: errorMessage })
        );

        setProfileImageUrl(uploadedImageUrl);

        setIsFetchingProfile(true);
        await axiosInstance.put('/user/profile', {
          profileImage: uploadedImageUrl,
        });

        await fetchUserProfile();

        setIsFetchingProfile(false);
        setDisplayProgress(100);
        setIsSuccess(true);
        toast.success('Profile picture updated!');
      } catch (error) {
        console.error('Error updating profile image:', error);
      } finally {
        setIsUploading(false);
        setTimeout(() => setDisplayProgress(0), 1500);
      }
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  return (
    <>
      <div className="flex flex-col items-center space-y-6 overflow-hidden">
        {profileImageUrl && (
          <div className="flex flex-col items-center space-y-4 mt-4">
        
            <OptimizedImage
              src={profileImageUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-md"
              transformations={{
                w: 200,
                h: 200,
                c: 'fill',
                f: 'auto',
                g: 'auto',
                q: 'auto',
                r: 'max',
              }}
            />
            <p className="text-sm text-gray-100 font-medium">
              Updated Profile Picture
            </p>
          </div>
        )}
        <div className="w-full flex flex-col items-center space-y-4">
          {isFetchingProfile ? (
            <div className="flex flex-col items-center space-y-6 overflow-hidden">
              {/* Skeleton for Profile Image */}
              <div className="flex flex-col items-center space-y-4 mt-4">
                <div className="w-40 h-40 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-300 animate-pulse rounded"></div>
              </div>

              <div className="w-full flex flex-col items-center space-y-4">
                <div className="h-12 w-full max-w-xs bg-gray-300 animate-pulse rounded"></div>
                <div className="w-40 h-40 bg-gray-300 animate-pulse rounded"></div>
              </div>

              <div className="w-full">
                <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
              </div>

              <div className="h-12 w-full max-w-xs bg-gray-300 animate-pulse rounded"></div>

              <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <FileInputButton
                fileInputRef={fileInputRef}
                onFileInputClick={handleImageClick}
                onFileChange={handleImageChange}
                isUploading={isUploading}
                acceptFileType="image/*"
                isFetchingProfile={isFetchingProfile}
              />
              {selectedImage && (
                <div className="text-sm text-gray-200 font-medium">
                  <span className="font-semibold">{selectedImage.name}</span>
                  <br />
                  Size: {selectedImage.size /
                    1024} KB
                  <br />
                  {/* Image Preview */}
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-40 h-40 mx-auto rounded aspect-square object-cover shadow-md"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="w-full">
            <ProgressBar progress={displayProgress} />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`flex items-center justify-center w-full max-w-xs py-3 px-6 rounded-md shadow-sm transition-all ${
            isUploading
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
          disabled={isUploading || !selectedImage}
        >
          {isUploading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 border-t-2 border-white border-solid rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Uploading...
            </span>
          ) : (
            'Upload Image'
          )}
        </button>

        {isSuccess && (
          <p className="text-green-600 text-sm font-semibold transition-all duration-300">
            🎉 Profile picture updated successfully!
          </p>
        )}
        {error && <ErrorThrower error={error} />}
      </div>
    </>
  );
};

export default memo(UploadProfileImage);
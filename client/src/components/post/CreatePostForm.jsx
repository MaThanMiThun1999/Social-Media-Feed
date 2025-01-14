import React, { useState, useRef } from 'react';
import { usePostStore } from '../../store/postStore';
import ErrorThrower from '../base/ErrorThrower';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Film } from 'lucide-react';

const CreatePostForm = () => {
  const { createPost, isLoading, error } = usePostStore();
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleFileChange = (e, type) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    switch (type) {
      case 'images':
        if (files.length > 5) {
          toast.error('You can only upload a maximum of 5 images.');
          return;
        }
        setImages(files);
        break;
      case 'videos':
        if (files.length > 2) {
          toast.error('You can only upload a maximum of 2 videos.');
          return;
        }
        setVideos(files);
        break;
      default:
        break;
    }
  };
  const handleRemoveMedia = (index, type) => {
    if (type === 'images') {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else if (type === 'videos') {
      setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || content.trim() === '' || content === ' ') {
      toast.error('Please enter some content.');
      return;
    }

    if (images.length === 0 && videos.length === 0) {
      toast.error('Please upload at least one image or video.');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);

    images.forEach((image) => formData.append('images', image));
    videos.forEach((video) => formData.append('videos', video));

    try {
      await createPost(formData);
      setContent('');
      setImages([]);
      setVideos([]);
      imageInputRef.current.value = null;
      videoInputRef.current.value = null;
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };
  const handleVideoUploadClick = () => {
    videoInputRef.current.click();
  };
  const filePreviewVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className='bg-white p-6 rounded-xl max-w-2xl mx-auto shadow-lg border border-gray-100 glassEffect'
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeInOut' },
      }}
    >
      <h2 className='text-2xl font-semibold mb-5 text-gray-100 tracking-tight'>
        Create New Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='content'
            className='block text-gray-100 font-semibold mb-2'
          >
            Content:
          </label>
          <textarea
            id='content'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
          />
        </div>
        <div className='mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <label className='block text-gray-100 font-semibold mb-2'>
              Images (max 5)
            </label>
            <span className='text-gray-100 text-sm'>{images.length}/5</span>
          </div>
          <input
            type='file'
            ref={imageInputRef}
            accept='image/*'
            multiple
            className='hidden'
            onChange={(e) => handleFileChange(e, 'images')}
          />
          <motion.button
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
            onClick={handleImageUploadClick}
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded inline-flex items-center focus:outline-none'
            disabled={isLoading}
            type='button'
          >
            <Image className='h-4 w-4 mr-2' /> <span>Choose Images</span>
          </motion.button>
          <AnimatePresence>
            <div className='mt-3 flex flex-wrap gap-2'>
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className='relative group'
                  variants={filePreviewVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className='h-20 w-20 object-cover rounded-md shadow-sm'
                  />
                  <motion.button
                    variants={buttonVariants}
                    whileHover='hover'
                    whileTap='tap'
                    onClick={() => handleRemoveMedia(index, 'images')}
                    className='absolute top-0 right-0 bg-gray-100 bg-opacity-75 rounded-full p-1 text-gray-500 hover:text-red-500 focus:outline-none group-hover:block hidden'
                  >
                    <X className='h-4 w-4' />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
        <div className='mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <label className='block text-gray-100 font-semibold mb-2'>
              Videos (max 2)
            </label>
            <span className='text-gray-100 text-sm'>{videos.length}/2</span>
          </div>
          <input
            type='file'
            ref={videoInputRef}
            accept='video/*'
            multiple
            className='hidden'
            onChange={(e) => handleFileChange(e, 'videos')}
          />
          <motion.button
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
            onClick={handleVideoUploadClick}
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded inline-flex items-center focus:outline-none'
            disabled={isLoading}
            type='button'
          >
            <Film className='h-4 w-4 mr-2' />
            <span>Choose Videos</span>
          </motion.button>
          <AnimatePresence>
            <div className='mt-3 flex flex-wrap gap-2'>
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  className='relative group'
                  variants={filePreviewVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                >
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    className='h-20 w-20 object-cover rounded-md shadow-sm'
                  />
                  <motion.button
                    variants={buttonVariants}
                    whileHover='hover'
                    whileTap='tap'
                    onClick={() => handleRemoveMedia(index, 'videos')}
                    className='absolute top-0 right-0 bg-gray-100 bg-opacity-75 rounded-full p-1 text-gray-500 hover:text-red-500 focus:outline-none group-hover:block hidden'
                  >
                    <X className='h-4 w-4' />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
        {error && <ErrorThrower error={error} />}
        <motion.button
          variants={buttonVariants}
          whileHover='hover'
          whileTap='tap'
          type='submit'
          className='bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreatePostForm;

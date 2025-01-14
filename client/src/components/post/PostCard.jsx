import React, { useState, useRef } from 'react';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';
import ErrorThrower from '../base/ErrorThrower';
import { toast } from 'react-hot-toast';
import {
  Heart,
  HeartOff,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2Icon,
} from 'lucide-react';
import moment from 'moment';
import {
  motion,
  AnimatePresence,
  useMotionValue,
} from 'framer-motion';

const PostCard = ({ post }) => {
  const { likePost, addComment, deleteComment, isLoading, error, deletePost } =
    usePostStore();
  const { user } = useAuthStore();
  const [commentText, setCommentText] = useState('');
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const mediaLength =
    (post.media?.images?.length || 0) + (post.media?.videos?.length || 0);

  const x = useMotionValue(0);
  const sliderRef = useRef(null);

  const handleLike = async () => {
    try {
      await likePost(post._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText || commentText.trim() === '' || commentText === ' ') {
      toast.error('Comment text is required');
      return;
    }
    try {
      await addComment(post._id, commentText);
      setCommentText('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(post._id, commentId);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleComment = () => {
    setIsCommentExpanded(!isCommentExpanded);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  const commentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const handleNext = () => {
    if (currentMediaIndex < mediaLength - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
      x.set(x.get() - sliderRef.current.offsetWidth);
    }
  };

  const handlePrev = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
      x.set(x.get() + sliderRef.current.offsetWidth);
    }
  };

  const mediaContainerVariants = {
    initial: { x: 0 },
    animate: {
      x: -(sliderRef.current?.offsetWidth * currentMediaIndex || 0),
      transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
    },
  };
  const mediaItemVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  const allMedia = [
    ...(post.media?.images || []),
    ...(post.media?.videos || []),
  ];

  return (
    <motion.div
      className='bg-white shadow-lg rounded-xl overflow-hidden mb-5 border border-gray-100'
      variants={cardVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='py-4 border-b border-gray-100'>
        <div className='flex px-6 border-b items-center justify-between mb-3'>
          <h2 className='font-semibold text-lg text-gray-800 tracking-tight lowercase'>
            @{post.user?.name}
          </h2>
          <p className='text-gray-500 text-sm'>
            {moment(post.createdAt).format('MMMM D, YYYY')}
          </p>
        </div>
        <p className='text-gray-700 px-6 leading-relaxed text-md italic'>
          {post.content}
        </p>
      </div>
      {mediaLength > 0 && (
        <div className='relative overflow-hidden'>
          <motion.div
            className='flex relative'
            ref={sliderRef}
            style={{ x }}
            variants={mediaContainerVariants}
            animate='animate'
          >
            {allMedia.map((media, index) => (
              <motion.div
                key={index}
                className='flex-shrink-0 w-full'
                style={{ width: sliderRef.current?.offsetWidth }}
                variants={mediaItemVariants}
                initial='initial'
                animate='animate'
              >
                {post.media?.images?.includes(media) && (
                  <img
                    src={media}
                    alt={`Post Image ${index}`}
                    className='w-full aspect-square object-cover shadow-sm'
                  />
                )}
                {post.media?.videos?.includes(media) && (
                  <video
                    src={media}
                    controls
                    className='aspect-square object-cover shadow-sm'
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
          {mediaLength > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-gray-700 hover:bg-gray-100 focus:outline-none z-10 ${currentMediaIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ChevronLeft className='h-6 w-6' />
              </button>
              <button
                onClick={handleNext}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-gray-700 hover:bg-gray-100 focus:outline-none z-10 ${currentMediaIndex === mediaLength - 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ChevronRight className='h-6 w-6' />
              </button>
            </>
          )}
        </div>
      )}
      <div className='px-6 py-3 flex justify-between items-center border-t border-gray-100'>
        <motion.button
          onClick={handleLike}
          className='flex items-center space-x-2 text-gray-600 hover:text-red-500 focus:outline-none'
          variants={buttonVariants}
          whileHover='hover'
          whileTap='tap'
        >
          {post.likes.includes(user?._id) ? (
            <Heart className='h-4 w-4 text-red-500' fill='currentColor' />
          ) : (
            <HeartOff className='h-4 w-4' />
          )}
          <span className='text-sm font-medium'>{post.likes.length} Likes</span>
        </motion.button>
        <motion.button
          onClick={toggleComment}
          className='flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none'
          variants={buttonVariants}
          whileHover='hover'
          whileTap='tap'
        >
          <MessageCircle className='h-4 w-4' />
          <span className='text-sm font-medium'>
            {isCommentExpanded
              ? 'Hide Comments'
              : `${post.comments.length} Comments`}
          </span>
        </motion.button>
        <motion.button
          onClick={handleDeletePost}
          className='flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none'
          variants={buttonVariants}
          whileHover='hover'
          whileTap='tap'
        >
          <Trash2Icon className='h-4 w-4' />
          <span className='text-sm font-medium'>Delete</span>
        </motion.button>
      </div>
      <AnimatePresence>
        {isCommentExpanded && (
          <motion.div
            variants={commentVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='px-6 py-3'
          >
            <form
              onSubmit={handleAddComment}
              className='mb-4 flex items-center space-x-2'
            >
              <input
                type='text'
                placeholder='Add a comment...'
                className='flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              />
              <motion.button
                variants={buttonVariants}
                whileHover='hover'
                whileTap='tap'
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                disabled={isLoading}
              >
                Add
              </motion.button>
            </form>
            {error && <ErrorThrower error={error} />}
            {post.comments.map((comment) => (
              <div key={comment._id} className='mb-3 border-b pb-2'>
                <div className='flex justify-between items-center mb-1'>
                  <p className='font-medium text-gray-800 tracking-tight'>
                    {comment.user?.name}
                  </p>
                  {user?._id === comment.user._id && (
                    <motion.button
                      variants={buttonVariants}
                      whileHover='hover'
                      whileTap='tap'
                      onClick={() => handleDeleteComment(comment._id)}
                      className='text-red-500 hover:text-red-700 focus:outline-none'
                      disabled={isLoading}
                    >
                      <X className='h-4 w-4' />
                    </motion.button>
                  )}
                </div>
                <p className='text-gray-600 leading-relaxed text-sm'>
                  {comment.text}
                </p>
                <p className='text-gray-500 text-xs mt-1'>
                  {moment(comment.createdAt).format('MMMM D, YYYY, h:mm a')}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;

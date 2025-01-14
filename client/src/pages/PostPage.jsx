import React, { useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import CreatePostForm from '../components/post/CreatePostForm';
import PostCard from '../components/post/PostCard';

const PostPage = () => {
  const { posts, fetchPosts } = usePostStore();

  console.log('posts: ', posts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='h3 text-center font-bold mb-4'>Social Media Feed</h1>
      <CreatePostForm />
      {posts.length === 0 ? (
        <p className='text-gray-100 mt-5 text-center h5 uppercase'>No posts available</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
export default PostPage;

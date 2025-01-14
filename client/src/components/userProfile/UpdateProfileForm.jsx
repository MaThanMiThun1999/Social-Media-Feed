import React, { useState, memo } from 'react';
import { useUserProfileStore } from '../../store/userProfileStore';
import ErrorThrower from '../base/ErrorThrower';

const UpdateProfileForm = () => {
  const { user, updateUserProfile, isLoading, error } = useUserProfileStore();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

  const handleSubmit = async e => {
    e.preventDefault();
    await updateUserProfile(name, bio, phoneNumber);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-100 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-100 font-bold mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-100 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mt-6">{error && <ErrorThrower error={error} />}</div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </>
  );
};

export default memo(UpdateProfileForm);
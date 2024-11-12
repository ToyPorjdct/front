import React from 'react';
import { authState } from '../state/authState';
import { useRecoilState } from 'recoil';

import EditProfileForm from '../components/form/EditProfileForm';

const EditProfilePage: React.FC = () => {

  const [isLoggedIn] = useRecoilState(authState);
  if (!isLoggedIn) {
    window.location.href = '/';
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <EditProfileForm />
    </div>
  );
};

export default EditProfilePage;
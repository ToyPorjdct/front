import React from 'react';
import { memberInfo } from '../state/authState';
import { useRecoilState } from 'recoil';

import EditProfileForm from '../components/form/EditProfileForm';

const EditProfilePage: React.FC = () => {

  const [isLoggedIn] = useRecoilState(memberInfo);
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
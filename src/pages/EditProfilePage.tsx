import React from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { memberInfo } from '../state/authState';
import EditProfileForm from '../components/form/EditProfileForm';

const EditProfilePage: React.FC = () => {
  const currentUser = useRecoilValue(memberInfo);
  
  useEffect(() => {
    if (!currentUser?.accessToken) {
      window.location.href = '/';
    }
  }, [currentUser]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <EditProfileForm />
    </div>
  );
};

export default EditProfilePage;
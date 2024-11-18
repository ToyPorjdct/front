import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberInfo } from '../state/authState';

interface PrivateRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useRecoilValue(memberInfo);

  if (!auth || !auth.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

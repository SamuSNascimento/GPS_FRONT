/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  redirect: string;
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props | any> = ({ redirect, children }) => {
  const token = localStorage.getItem('page');

  if (!token) {
    toast.info('Favor efetuar login');
    return <Navigate to={redirect} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoutes;

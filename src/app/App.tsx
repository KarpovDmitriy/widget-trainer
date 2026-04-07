import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from '@features/notifications/ToastContainer';
import { Loader } from '@shared/Loader/Loader';
import '@src/app/auth.manager';
import { router } from '@src/app/router/router';

const App: React.FC = () => {
  return (
    <>
      <Loader />
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;

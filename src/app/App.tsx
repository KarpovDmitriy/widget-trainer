import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, ToastProvider } from '@features/notifications';
import '@src/app/auth.manager';
import { router } from '@src/app/router/router';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ToastProvider>
  );
};

export default App;

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import '@src/app/auth.manager';
import { router } from '@src/app/router/router';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

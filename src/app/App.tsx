import React from 'react';
import { RouterProvider } from 'react-router-dom';
import '@src/app/auth.manager';
import { router } from '@src/app/router/router';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

// TODO для проверки лоадера

// import React from 'react';
// import { RouterProvider } from 'react-router-dom';
// import { Loader } from '@shared/Loader/Loader';
// import { useLoaderStore } from '@s/loader.store';
// import '@src/app/auth.manager';
// import { router } from '@src/app/router/router';

// const App: React.FC = () => {
//   const isLoading = useLoaderStore((s) => s.isLoading);
//   const { showLoader, hideLoader } = useLoaderStore();
//   return (
//     <>
//       <button
//         onClick={() => {
//           showLoader();
//           setTimeout(hideLoader, 3000);
//         }}
//       >
//         Test Loader
//       </button>

//       <RouterProvider router={router} />
//       {isLoading && <Loader />}
//     </>
//   );
// };

// export default App;

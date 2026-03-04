import type React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@src/pages/LoginPage';
import ProfilePage from '@src/pages/ProfilePage';
import RegisterPage from '@src/pages/RegisterPage';
import Dashboard from '@p/Dashboard';
import Landing from '@p/Landing';
import Library from '@p/Library';
import NotFound from '@p/NotFound';
import Practice from '@p/Practice';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/practice/:topicId" element={<Practice />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

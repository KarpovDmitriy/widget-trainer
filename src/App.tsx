import type React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@src/pages/Login/Login';
import Profile from '@src/pages/Profile/Profile';
import Register from '@src/pages/Register/Register';
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/practice/:topicId" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
